import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../../assets/sellerdash.png';
import { fetchSummaryData } from '../../redux/slices/sellerSlice';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const summaryData = useSelector((state) => state.seller.summaryData);
  const loading = useSelector((state) => state.seller.status) === 'loading';

  useEffect(() => {
    dispatch(fetchSummaryData());
  }, [dispatch]);

  useEffect(() => {
    console.log('Summary Data:', summaryData);
  }, [summaryData]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const orderChartData = {
    labels: ['Pending', 'Shipped', 'Completed'],
    datasets: [
      {
        label: 'Order Status',
        data: [
          summaryData?.orderStatusCounts?.['Pending'] || 0,
          summaryData?.orderStatusCounts?.['Shipped'] || 0,
          summaryData?.orderStatusCounts?.['Completed'] || 0
        ],
        backgroundColor: ['#ea6b7f', '#64b5f6', '#81c784'],
        hoverOffset: 4
      }
    ]
  };

  const categoryChartData = {
    labels: ['Food', 'Treat', 'Training Needs', 'Clothes & Accessories', 'Supplies & Others'],
    datasets: [
      {
        label: 'Product Categories',
        data: [
          summaryData?.productCategoryCounts?.['food'] || 0,
          summaryData?.productCategoryCounts?.['treat'] || 0,
          summaryData?.productCategoryCounts?.['training-needs'] || 0,
          summaryData?.productCategoryCounts?.['clothes-accessories'] || 0,
          summaryData?.productCategoryCounts?.['supplies-others'] || 0
        ],
        backgroundColor: [
          '#42a5f5',
          '#66bb6a',
          '#ffa726',
          '#ab47bc',
          '#ec407a'
        ]
      }
    ]
  };

  const orderChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Products'
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-petBg">
      {/* Banner Section */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">PAWS Seller Dashboard</h1>
        </div>
      </section>

      {/* Analysis Section */}
      <div className="container mx-auto py-10 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold">Total Customers</h3>
            <p className="text-4xl font-bold text-indigo-600">{summaryData?.totalCustomers || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold">Total Products</h3>
            <p className="text-4xl font-bold text-indigo-600">{summaryData?.totalProducts || 0}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 lg:col-span-2">
            <h3 className="text-lg font-bold">Total Orders</h3>
            <p className="text-4xl font-bold text-indigo-600 mb-4">{summaryData?.totalOrders || 0}</p>
            <div className="flex justify-center">
              <div style={{ height: '400px', width: '100%' }}>
                <Pie data={orderChartData} options={orderChartOptions} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 lg:col-span-1">
            <h3 className="text-lg font-bold">Product Categories</h3>
            <div className="flex justify-center">
              <div style={{ height: '500px', width: '100%' }}>
                <Bar data={categoryChartData} options={categoryChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
