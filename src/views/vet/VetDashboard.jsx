import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAppointmentsByVet } from '../../redux/slices/appointmentSlice';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { subYears, getMonth } from 'date-fns';

const VetDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.appointments);

  const [todayVisits, setTodayVisits] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [currentYearData, setCurrentYearData] = useState([]);
  const [previousYearData, setPreviousYearData] = useState([]);

  useEffect(() => {
    if (user && user.userRole === 'vet') {
      dispatch(fetchAppointmentsByVet(user.userId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (appointments.length > 0) {
      const today = new Date().toDateString();
      const todayVisitsCount = appointments.filter(
        appointment => new Date(appointment.appointmentDatetime).toDateString() === today && appointment.status !== 'cancelled'
      ).length;
      setTodayVisits(todayVisitsCount);

      const patients = new Set(appointments.filter(appointment => appointment.status !== 'cancelled').map(appointment => appointment.petId));
      setTotalPatients(patients.size);

      const totalAppointmentsCount = appointments.filter(appointment => appointment.status !== 'cancelled').length;
      setTotalAppointments(totalAppointmentsCount);

      const currentYear = new Date().getFullYear();
      const previousYear = currentYear - 1;

      const currentYearVisits = calculateMonthlyVisits(appointments, currentYear);
      const previousYearVisits = calculateMonthlyVisits(appointments, previousYear);

      setCurrentYearData(currentYearVisits);
      setPreviousYearData(previousYearVisits);
    }
  }, [appointments]);

  const data = {
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

  const todayDateString = new Date().toDateString();
  const todayAppointments = appointments.filter(
    appointment => new Date(appointment.appointmentDatetime).toDateString() === todayDateString && appointment.status !== 'cancelled'
  );
  const upcomingAppointments = appointments.filter(
    appointment => new Date(appointment.appointmentDatetime).toDateString() !== todayDateString && new Date(appointment.appointmentDatetime) > new Date() && appointment.status !== 'cancelled'
  );

  const navigateToAppointment = (petId, appointmentId) => {
    navigate(`/vet/pet/${petId}/appointment/${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Vet Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Today's Visits</h2>
          <p className="text-3xl">{todayVisits}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Patients</h2>
          <p className="text-3xl">{totalPatients}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold">Total Appointments</h2>
          <p className="text-3xl">{totalAppointments}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Visit Statistics</h2>
        <Line data={data} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h3 className="text-lg font-bold">Today's Visits</h3>
          <h3 className="text-lg font-bold">Upcoming Visits</h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 md:mr-4">
            {todayAppointments.map(appointment => (
              <div 
                onClick={() => navigateToAppointment(appointment.petId, appointment.appointmentId)}
                key={appointment.appointmentId} 
                className="border rounded-lg shadow-md p-4 mb-4 bg-white cursor-pointer"
              >
                <p className="font-semibold">Pet Name: <span className="font-normal">{appointment.pet.name}</span></p>
                <p className="font-semibold">Date: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleDateString('en-CA')}</span></p>
                <p className="font-semibold">Time: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleTimeString()}</span></p>
              </div>
            ))}
          </div>
          <div className="md:w-1/2">
            {upcomingAppointments.map(appointment => (
              <div 
                onClick={() => navigateToAppointment(appointment.petId, appointment.appointmentId)}
                key={appointment.appointmentId} 
                className="border rounded-lg shadow-md p-4 mb-4 bg-white cursor-pointer"
              >
                <p className="font-semibold">Pet Name: <span className="font-normal">{appointment.pet.name}</span></p>
                <p className="font-semibold">Date: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleDateString('en-CA')}</span></p>
                <p className="font-semibold">Time: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleTimeString()}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateMonthlyVisits = (appointments, year) => {
  const visits = Array(12).fill(0);
  appointments.forEach(appointment => {
    const date = new Date(appointment.appointmentDatetime);
    if (date.getFullYear() === year && appointment.status !== 'cancelled') {
      const month = getMonth(date);
      visits[month]++;
    }
  });
  return visits;
};

export default VetDashboard;
