import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnquiries, updateEnquiryStatus } from '../../redux/slices/enquiriesSlice';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const AdminManageEnquiries = () => {
  const dispatch = useDispatch();
  const { enquiries = [], status, error } = useSelector((state) => state.enquiries);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 10;

  useEffect(() => {
    dispatch(fetchEnquiries());
  }, [dispatch]);

  const sendEmail = (toEmail, toName, message) => {
    const serviceId = 'service_aa0xu5a';
    const templateId = 'template_fiovdqp';
    const userId = '-5Z2LwP31J4R6clYX';

    const templateParams = {
      email: toEmail,
      to_name: toName,
      from_name: 'PAWS Team',
      message: `Thank you for reaching out to us at PAWs. We have received your enquiry and are eager to assist you. Here is a summary of your message:\n\n"${message}"\n\nWe understand that your concerns are important and we're here to help. Please let us know how we can further assist you or if there's any additional information you would like to provide.\n\nBest wishes,\nThe PAWs Team`
    };

    return emailjs.send(serviceId, templateId, templateParams, userId);
  };

  const handleSendEmail = async (enquiry) => {
    try {
      const emailResponse = await sendEmail(enquiry.user.email, enquiry.user.name, enquiry.message);
      if (emailResponse.status === 200) {
        Swal.fire('Success', 'Email sent successfully!', 'success');
        dispatch(updateEnquiryStatus({ id: enquiry.enquiryId, status: 'completed' }));
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      Swal.fire('Error', 'There was an error sending the email.', 'error');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterMonthChange = (e) => {
    setFilterMonth(e.target.value);
  };

  const handleFilterYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  const filterEnquiries = enquiries.filter(enquiry => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = (
      enquiry.user.name.toLowerCase().includes(lowerSearchQuery) ||
      enquiry.user.email.toLowerCase().includes(lowerSearchQuery) ||
      enquiry.message.toLowerCase().includes(lowerSearchQuery)
    );

    const matchesMonth = filterMonth ? new Date(enquiry.date).getMonth() + 1 === parseInt(filterMonth) : true;
    const matchesYear = filterYear ? new Date(enquiry.date).getFullYear() === parseInt(filterYear) : true;

    return matchesSearch && matchesMonth && matchesYear;
  });

  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = filterEnquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Enquiries</h1>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-500">{typeof error === 'string' ? error : JSON.stringify(error)}</p>}
        {status === 'succeeded' && (
          <>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search by User Name, User Email, or Message"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 border rounded w-1/2"
              />
              <div className="flex space-x-4">
                <select
                  value={filterYear}
                  onChange={handleFilterYearChange}
                  className="p-2 border rounded"
                >
                  <option value="">Year</option>
                  {[2024, 2023, 2022, 2021].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  value={filterMonth}
                  onChange={handleFilterMonthChange}
                  className="p-2 border rounded"
                >
                  <option value="">Month</option>
                  {[...Array(12).keys()].map(month => (
                    <option key={month + 1} value={month + 1}>{new Date(0, month).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
              </div>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Enquiry ID</th>
                  <th className="py-2 px-4 border-b">User Name</th>
                  <th className="py-2 px-4 border-b">User Email</th>
                  <th className="py-2 px-4 border-b">Message</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEnquiries.map((enquiry) => (
                  <tr key={enquiry.enquiryId} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{enquiry.enquiryId}</td>
                    <td className="py-2 px-4 border-b">{enquiry.user.name}</td>
                    <td className="py-2 px-4 border-b">{enquiry.user.email}</td>
                    <td className="py-2 px-4 border-b">{enquiry.message}</td>
                    <td className="py-2 px-4 border-b">{enquiry.date}</td>
                    <td className={`py-2 px-4 border-b ${enquiry.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {enquiry.status}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {enquiry.status === 'pending' && (
                        <button
                          onClick={() => handleSendEmail(enquiry)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Send Email
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4 space-x-2">
              {[...Array(Math.ceil(filterEnquiries.length / enquiriesPerPage)).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => setCurrentPage(number + 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </>
        )}
        {status === 'succeeded' && (!enquiries || filterEnquiries.length === 0) && <p>No enquiries available.</p>}
      </div>
    </div>
  );
};

export default AdminManageEnquiries;
