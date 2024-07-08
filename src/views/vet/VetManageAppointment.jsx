import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointmentsByVet } from '../../redux/slices/appointmentSlice';
import { format } from 'date-fns';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VetManageAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.appointments);

  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (user && user.userRole === 'vet') {
      dispatch(fetchAppointmentsByVet(user.userId));
    }
  }, [dispatch, user]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleRowClick = (petId, appointmentId) => {
    navigate(`/vet/pet/${petId}/appointment/${appointmentId}`);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDatetime);
    const today = new Date();
    const isToday = appointmentDate.toDateString() === today.toDateString();
    const isUpcoming = appointmentDate > today;

    const matchesDateFilter =
      dateFilter === 'all' ||
      (dateFilter === 'today' && isToday) ||
      (dateFilter === 'upcoming' && isUpcoming);

    const matchesStatusFilter =
      statusFilter === 'all' || appointment.status === statusFilter;

    return matchesDateFilter && matchesStatusFilter;
  });

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <div className="mb-2">
            <span className="text-lg font-semibold">Date Filter:</span>
          </div>
          <div className="flex flex-wrap">
            <button
              onClick={() => setDateFilter('all')}
              className={`px-4 py-2 rounded-md mr-2 mb-2 ${dateFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setDateFilter('today')}
              className={`px-4 py-2 rounded-md mr-2 mb-2 ${dateFilter === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Today
            </button>
            <button
              onClick={() => setDateFilter('upcoming')}
              className={`px-4 py-2 rounded-md mb-2 ${dateFilter === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Upcoming
            </button>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <span className="text-lg font-semibold">Status Filter:</span>
          </div>
          <div className="flex flex-wrap">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-md mr-2 mb-2 ${statusFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-md mr-2 mb-2 ${statusFilter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-md mr-2 mb-2 ${statusFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatusFilter('cancelled')}
              className={`px-4 py-2 rounded-md mb-2 ${statusFilter === 'cancelled' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-orange-100 text-black uppercase text-sm md:text-lg leading-normal">
              <th className="py-3 px-4 md:px-6 text-left">Date</th>
              <th className="py-3 px-4 md:px-6 text-left">Time</th>
              <th className="py-3 px-4 md:px-6 text-left">Pet Name</th>
              <th className="py-3 px-4 md:px-6 text-left">Owner</th>
              <th className="py-3 px-4 md:px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm md:text-lg">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr
                  key={appointment.appointmentId}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(appointment.petId, appointment.appointmentId)}
                >
                  <td className="py-3 px-4 md:px-6 text-left">
                    {format(new Date(appointment.appointmentDatetime), 'yyyy-MM-dd')}
                  </td>
                  <td className="py-3 px-4 md:px-6 text-left">
                    {format(new Date(appointment.appointmentDatetime), 'hh:mm:ss a')}
                  </td>
                  <td className="py-3 px-4 md:px-6 text-left flex items-center">
                    <Avatar src={appointment.pet.petImage} className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-full mr-2" />
                    {appointment.pet.name}
                  </td>
                  <td className="py-3 px-4 md:px-6 text-left">{appointment.pet.owner}</td>
                  <td className="py-3 px-4 md:px-6 text-left">
                    <span className={`px-3 py-1 rounded-full ${getStatusClass(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VetManageAppointment;
