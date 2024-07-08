import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointmentsByVet } from '../../redux/slices/appointmentSlice';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

const VetViewPetList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (user && user.userRole === 'vet') {
      dispatch(fetchAppointmentsByVet(user.userId));
    }
  }, [dispatch, user]);

  // Get unique pets from appointments
  const pets = Array.from(new Set(appointments.map(appointment => appointment.petId)))
    .map(petId => appointments.find(appointment => appointment.petId === petId).pet);

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Pet List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-orange-100 text-black uppercase text-sm md:text-lg leading-normal">
              <th className="py-3 px-4 md:px-6 text-left">Pet Image</th>
              <th className="py-3 px-4 md:px-6 text-left">Pet Name</th>
              <th className="py-3 px-4 md:px-6 text-left">Breed</th>
              <th className="py-3 px-4 md:px-6 text-left">Age</th>
              <th className="py-3 px-4 md:px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm md:text-lg">
            {pets.map((pet) => (
              <tr key={pet.petId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4 md:px-6 text-left">
                  <img src={pet.petImage} alt={pet.name} className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full" />
                </td>
                <td className="py-3 px-4 md:px-6 text-left">{pet.name}</td>
                <td className="py-3 px-4 md:px-6 text-left">{pet.breed}</td>
                <td className="py-3 px-4 md:px-6 text-left">{pet.age}</td>
                <td className="py-3 px-4 md:px-6 text-left">
                  <Link to={`/vet/pet/${pet.petId}`} className="bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-md text-sm md:text-base">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VetViewPetList;
