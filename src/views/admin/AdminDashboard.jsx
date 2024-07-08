import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../redux/slices/adminSlice';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { totalUsers, totalVets, totalPets, totalAdoptedPets, totalDonations, totalEnquiries, userRoleCounts, monthlyDonations, error } = useSelector(state => state.admin);
  const [currentYearData, setCurrentYearData] = useState([]);
  const [previousYearData, setPreviousYearData] = useState([]);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(monthlyDonations)) {
      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;
      const currentYearDonations = calculateMonthlyData(monthlyDonations, currentYear);
      const previousYearDonations = calculateMonthlyData(monthlyDonations, previousYear);
      setCurrentYearData(currentYearDonations);
      setPreviousYearData(previousYearDonations);
    }
  }, [monthlyDonations]);

  const calculateMonthlyData = (data, year) => {
    const monthlyData = new Array(12).fill(0);
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item.year === year) {
          monthlyData[item.month - 1] = item.total;
        }
      });
    }
    return monthlyData;
  };

  const donationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Current Year',
        data: currentYearData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Previous Year',
        data: previousYearData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const userRoleData = {
    labels: ['Customers', 'Vets'],
    datasets: [
      {
        label: 'User Roles',
        data: [userRoleCounts?.customer || 0, userRoleCounts?.vet || 0],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="p-6 bg-petBg">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-3xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Total Vets</h2>
          <p className="text-3xl">{totalVets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Total Pets</h2>
          <p className="text-3xl">{totalPets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Total Adopted Pets</h2>
          <p className="text-3xl">{totalAdoptedPets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Total Donations</h2>
          <p className="text-3xl">${Number(totalDonations).toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Total Enquiries</h2>
          <p className="text-3xl">{totalEnquiries}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Donation Statistics</h2>
          <div className="w-full h-64">
            <Line data={donationData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">User Statistic</h2>
          <div className="w-full h-64">
            <Pie data={userRoleData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default AdminDashboard;
