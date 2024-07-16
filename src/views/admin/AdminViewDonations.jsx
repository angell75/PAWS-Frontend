import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDonations } from '../../redux/slices/donationSlice';
import { format } from 'date-fns';

const AdminViewDonations = () => {
  const dispatch = useDispatch();
  const { donations, status, error } = useSelector((state) => state.donations);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filter, setFilter] = useState({ month: '', year: '', amount: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 5;

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  useEffect(() => {
    setFilteredDonations(donations);
  }, [donations]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = donations;

    if (filter.month) {
      filtered = filtered.filter((donation) => new Date(donation.donationDate).getMonth() + 1 === parseInt(filter.month));
    }

    if (filter.year) {
      filtered = filtered.filter((donation) => new Date(donation.donationDate).getFullYear() === parseInt(filter.year));
    }

    if (filter.amount) {
      filtered = filtered.filter((donation) => donation.amount >= parseFloat(filter.amount));
    }

    setFilteredDonations(filtered);
    setCurrentPage(1); 
  };

  useEffect(() => {
    applyFilters();
  }, [filter]);

  const calculateTotalDonations = (donations) => {
    return donations.reduce((total, donation) => total + parseFloat(donation.amount), 0).toFixed(2);
  };

  // Pagination logic
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(filteredDonations.length / donationsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">View Donations</h1>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        {status === 'loading' ? (
          <p>Loading donations...</p>
        ) : status === 'failed' ? (
          <p className="text-red-500">Error: {error?.message || 'Unknown error'}</p>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="month"
                  placeholder="Month"
                  value={filter.month}
                  onChange={handleFilterChange}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={filter.year}
                  onChange={handleFilterChange}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Min Amount"
                  value={filter.amount}
                  onChange={handleFilterChange}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Donation ID</th>
                  <th className="py-2 px-4 border-b text-left">Donor Name</th>
                  <th className="py-2 px-4 border-b text-left">Amount</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentDonations.map((donation) => (
                  <tr key={donation?.donationId} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{donation?.donationId}</td>
                    <td className="py-2 px-4 border-b">{donation.donorName || 'Unknown'}</td>
                    <td className="py-2 px-4 border-b">${typeof donation?.amount === 'number' ? donation.amount.toFixed(2) : donation.amount}</td>
                    <td className="py-2 px-4 border-b">{donation?.donationDate ? format(new Date(donation.donationDate), 'MM/dd/yyyy') : 'Invalid Date'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6">
              <h2 className="text-2xl text-blue-500 font-bold">Total Received Donations: ${calculateTotalDonations(filteredDonations)}</h2>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevPage}
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-lg">{currentPage} / {totalPages}</span>
              <button
                onClick={nextPage}
                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminViewDonations;
