import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, createAppointment, cancelAppointment } from '../../redux/slices/appointmentSlice';
import { fetchPets, addNewPet } from '../../redux/slices/petSlice';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import vetClinicImage from '../../assets/vet-clinic.jpg'; 
import { Link } from 'react-router-dom';

const BookVetService = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { appointments, status, error } = useSelector((state) => state.appointments);
  const { pets } = useSelector((state) => state.pets);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: 'PAWS KL', 
    petId: '',
  });

  const [newPetModalOpen, setNewPetModalOpen] = useState(false);
  const [newPetData, setNewPetData] = useState({
    name: '',
    breed: '',
    gender: '',
    age: '',
    description: '',
    vaccineStatus: false,
    vaccineDate: '',
    petImage: null,
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchAppointments(user.userId));
      dispatch(fetchPets(user.userId));
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      userId: user.userId,
      ...formData,
      appointmentDatetime: `${formData.date}T${formData.time}`,
    };
    dispatch(createAppointment(appointmentData))
      .unwrap()
      .then(() => {
        Swal.fire('Success', 'Appointment booked successfully!', 'success');
        dispatch(fetchAppointments(user.userId));
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  };

  const handleNewPetChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setNewPetData({
      ...newPetData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleNewPetSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newPetData).forEach((key) => {
      formData.append(key, newPetData[key]);
    });
    formData.append('userId', user.userId);
    formData.append('adoptionStatus', 'vet'); 

    dispatch(addNewPet(formData))
      .unwrap()
      .then(() => {
        Swal.fire('Success', 'New pet added successfully!', 'success');
        dispatch(fetchPets(user.userId));
        setNewPetModalOpen(false);
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  };

  const openNewPetModal = () => {
    setNewPetModalOpen(true);
  };

  const closeNewPetModal = () => {
    setNewPetModalOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '500px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  return (
    <div className="min-h-screen bg-petBg py-10 flex flex-col items-center">
    <div className="flex flex-col w-full max-w-6xl bg-white rounded-lg shadow-md">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Fees</h2>
          <p>The service is free as we get funds from donations.</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            <Link to="/customer/userdonate">Donate</Link>
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Working Time</h2>
          <p>Monday to Friday: 05:00am to 10:00pm</p>
          <p>Weekends: 09:00am to 12:00pm</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Medical Services</h2>
          <p>If you need a doctor urgently outside of medicenter opening hours, call emergency appointment number for emergency service.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Doubts?</h2>
          <p>PAWS KL, dummy address</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6">
          <img src={vetClinicImage} alt="Vet Clinic" className="w-full h-64 object-cover mb-4 rounded-md" />
          <h1 className="text-2xl font-bold mb-4">Book Vet Service</h1>
          <p className="mb-6">Book an appointment for your pet at PAWS KL. Please ensure all information is accurate.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <select
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Time</option>
                <option value="10:00:00">10:00-11:00</option>
                <option value="11:00:00">11:00-12:00</option>
                <option value="14:00:00">14:00-15:00</option>
                <option value="15:00:00">15:00-16:00</option>
                <option value="16:00:00">16:00-17:00</option>
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <div className="w-full">
                <label htmlFor="petId" className="block text-sm font-medium text-gray-700">Pet</label>
                <select
                  name="petId"
                  id="petId"
                  value={formData.petId}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Pet</option>
                  {pets.filter(pet => pet.userId === user.userId).map((pet) => (
                    <option key={pet.petId} value={pet.petId}>{pet.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={openNewPetModal}
              >
                Add New Pet
              </button>
            </div>
            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Book Appointment</button>
            </div>
          </form>
        </div>
        <div className="md:w-1/2 p-6 bg-white">
          <MyAppointments />
        </div>
      </div>
    </div>

      <Modal
        isOpen={newPetModalOpen}
        onRequestClose={closeNewPetModal}
        style={customStyles}
        contentLabel="Add New Pet"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Pet</h2>
        <form onSubmit={handleNewPetSubmit}>
          <div className="mb-4">
            <label htmlFor="petImage" className="block text-sm font-medium text-gray-700">Pet Image</label>
            <input
              type="file"
              name="petImage"
              id="petImage"
              onChange={handleNewPetChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={newPetData.name}
              onChange={handleNewPetChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
            <input
              type="text"
              name="breed"
              id="breed"
              value={newPetData.breed}
              onChange={handleNewPetChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex items-center mt-1">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={newPetData.gender === "Male"}
                  onChange={handleNewPetChange}
                  className="mr-2"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={newPetData.gender === "Female"}
                  onChange={handleNewPetChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={newPetData.age}
              onChange={handleNewPetChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              value={newPetData.description}
              onChange={handleNewPetChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="vaccineStatus" className="block text-sm font-medium text-gray-700">Vaccine Status</label>
            <input
              type="checkbox"
              name="vaccineStatus"
              id="vaccineStatus"
              checked={newPetData.vaccineStatus}
              onChange={handleNewPetChange}
              className="mr-2"
            />
            <label htmlFor="vaccineStatus">Vaccinated</label>
          </div>
          {newPetData.vaccineStatus && (
            <div className="mb-4">
              <label htmlFor="vaccineDate" className="block text-sm font-medium text-gray-700">Vaccine Date</label>
              <input
                type="date"
                name="vaccineDate"
                id="vaccineDate"
                value={newPetData.vaccineDate}
                onChange={handleNewPetChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Pet</button>
          <button
            type="button"
            onClick={closeNewPetModal}
            className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);

  const handleCancel = (appointmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cancelAppointment(appointmentId))
          .unwrap()
          .then(() => {
            Swal.fire('Success', 'Appointment cancelled successfully!', 'success');
            dispatch(fetchAppointments(user.userId));
          })
          .catch((err) => {
            Swal.fire('Error', err.message, 'error');
          });
      }
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment.appointmentId} className="border rounded-lg shadow-md p-4 mb-4 bg-white">
            <div className="flex flex-col justify-between items-start mb-2">
              <div
                className={`p-2 rounded-md text-center w-full text-white ${getStatusClass(appointment.status)} mb-4`}
              >
                Your appointment is {appointment.status}.
              </div>
              <div className="w-full">
                <p className="font-semibold">Date: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleDateString()}</span></p>
                <p className="font-semibold">Time: <span className="font-normal">{new Date(appointment.appointmentDatetime).toLocaleTimeString()}</span></p>
                <p className="font-semibold">Pet Name: <span className="font-normal">{appointment.pet?.name || 'Unknown'}</span></p>
                <p className="font-semibold">Location: <span className="font-normal">PAWS KL</span></p>
                <p className="font-semibold">Vet Doctor Name: <span className="font-normal">{appointment.vet?.name || 'Unknown'}</span></p>
                <p className="font-semibold">Prognosis: <span className="font-normal">{appointment.status === 'completed' ? appointment.prognosis : '-'}</span></p>
              </div>
              <div className="flex justify-end w-full">
                <button
                  onClick={() => handleCancel(appointment.appointmentId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};


export default BookVetService;
