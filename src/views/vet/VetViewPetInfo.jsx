import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchPetById, updatePet } from '../../redux/slices/petSlice';
import { fetchAppointmentsByPet, updateAppointment } from '../../redux/slices/appointmentSlice';

const VetViewPetInfo = () => {
  const { petId, appointmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedPet: pet } = useSelector((state) => state.pets);
  const { appointments = [] } = useSelector((state) => state.appointments);

  const [petData, setPetData] = useState({
    vaccineStatus: false,
    vaccineDate: '',
    prognosis: '',
  });

  const [selectedStatus, setSelectedStatus] = useState('Today');

  useEffect(() => {
    dispatch(fetchPetById(petId));
    dispatch(fetchAppointmentsByPet(petId));
  }, [dispatch, petId]);

  useEffect(() => {
    if (pet && Array.isArray(appointments) && appointmentId) {
      const selectedAppointment = appointments?.find(appointment => appointment.appointmentId === parseInt(appointmentId));
      setPetData({
        vaccineStatus: !!pet.vaccineStatus,
        vaccineDate: pet.vaccineDate || '',
        prognosis: selectedAppointment ? selectedAppointment.prognosis || '' : '',
      });
    } else {
      setPetData({
        vaccineStatus: !!pet.vaccineStatus,
        vaccineDate: pet.vaccineDate || '',
        prognosis: '',
      });
    }
  }, [pet, appointments, appointmentId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetData({
      ...petData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveClick = () => {
    const updatedPetData = {
      vaccineStatus: petData.vaccineStatus,
      vaccineDate: petData.vaccineStatus ? petData.vaccineDate : null,
      diagnosis: petData.prognosis,
    };

    const updatedAppointmentData = {
      prognosis: petData.prognosis,
      status: 'completed',
    };

    dispatch(updatePet({ id: petId, formData: updatedPetData })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        if (appointmentId) {
          dispatch(updateAppointment({ petId: petId, appointmentId: appointmentId, formData: updatedAppointmentData })).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
              Swal.fire('Success', 'Appointment updated successfully!', 'success');
              dispatch(fetchPetById(petId));
              dispatch(fetchAppointmentsByPet(petId));
            } else {
              Swal.fire('Error', 'Error updating appointment: ' + (action.payload?.message || 'Unknown error'), 'error');
            }
          });
        } else {
          Swal.fire('Success', 'Pet profile updated successfully!', 'success');
          dispatch(fetchPetById(petId));
          dispatch(fetchAppointmentsByPet(petId));
        }
      } else {
        Swal.fire('Error', 'Error updating pet profile: ' + (action.payload?.message || 'Unknown error'), 'error');
      }
    });
  };

  const handleAppointmentClick = (id) => {
    navigate(`/vet/pet/${petId}/appointment/${id}`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const isToday = (date) => {
    const today = new Date();
    const appointmentDate = new Date(date);
    return today.toDateString() === appointmentDate.toDateString();
  };

  const filteredAppointments = selectedStatus === 'Today'
    ? appointments.filter(appointment => isToday(appointment.appointmentDatetime))
    : appointments.filter(appointment => !isToday(appointment.appointmentDatetime) && new Date(appointment.appointmentDatetime) > new Date());

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Pet Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="md:w-1/3">
            <img src={pet?.petImage} alt={pet?.name} className="w-full h-auto rounded-lg" />
          </div>
          <div className="md:w-2/3 md:ml-6">
            <h2 className="text-2xl font-bold mb-4">{pet?.name}</h2>
            <p className="text-lg mb-4"><strong>Gender:</strong> {pet?.gender}</p>
            <p className="text-lg mb-4"><strong>Age:</strong> {pet?.age}</p>
            <p className="text-lg mb-4"><strong>Breed:</strong> {pet?.breed}</p>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Vaccine Status</label>
              <input
                type="checkbox"
                name="vaccineStatus"
                checked={petData.vaccineStatus}
                onChange={handleInputChange}
              />
              <label className="ml-2">Vaccinated</label>
            </div>
            {petData.vaccineStatus && (
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Vaccine Date</label>
                <input
                  type="date"
                  name="vaccineDate"
                  value={petData.vaccineDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Diagnosis</label>
              <p className="w-full py-2 rounded">
                {pet?.diagnosis}
              </p>
            </div>
            {appointmentId && (
              <>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Prognosis</label>
                  <textarea
                    name="prognosis"
                    value={petData.prognosis || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    disabled={!isToday(appointments.find(appointment => appointment.appointmentId === parseInt(appointmentId))?.appointmentDatetime)}
                  />
                </div>
                {appointments?.find(appointment => appointment.appointmentId === parseInt(appointmentId))?.status === 'pending' && isToday(appointments.find(appointment => appointment.appointmentId === parseInt(appointmentId))?.appointmentDatetime) && (
                  <button
                    onClick={handleSaveClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <div className="flex justify-center space-x-4 mb-4">
          {['Today', 'Upcoming'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`p-2 rounded-md ${selectedStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {status}
            </button>
          ))}
        </div>
        {Array.isArray(filteredAppointments) && filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.appointmentId}
              className="border rounded-lg shadow-md p-4 mb-4 bg-white cursor-pointer"
              onClick={() => handleAppointmentClick(appointment.appointmentId)}
            >
              <p className="font-semibold pb-3">Date: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleDateString('en-CA')}</span></p>
              <p className="font-semibold pb-3">Time: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleTimeString()}</span></p>
              <div className={`p-2 rounded-md text-center w-full text-white ${getStatusClass(appointment.status)} mb-4`}>
                The appointment is {appointment.status}.
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            There are no {selectedStatus.toLowerCase()} appointments currently!
          </div>
        )}
      </div>
    </div>
  );
};

export default VetViewPetInfo;
