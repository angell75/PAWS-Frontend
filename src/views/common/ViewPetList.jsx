import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { fetchPets, uploadPet } from '../../redux/slices/petSlice';
import petListBanner from '../../assets/pet-list-banner.png';
import noImage from '../../assets/no-image.png';

Modal.setAppElement('#root');

export default function ViewPetList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pets, status } = useSelector((state) => state.pets);
  const user = useSelector((state) => state.auth.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [petData, setPetData] = useState({
    petImage: null,
    name: '',
    breed: '',
    gender: 'Male',
    age: '',
    description: '',
    vaccineStatus: false,
    vaccineDate: '',
  });

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  useEffect(() => {
    console.log('Fetched Pets:', pets);
  }, [pets]);

  const handleButtonClick = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Please log in',
        text: 'You need to log in to see more details.',
      }).then(() => {
        navigate('/login');
      });
    } else {
      // Add functionality for logged-in users here
    }
  };

  const openModal = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Please log in',
        text: 'You need to log in to upload a pet.',
      }).then(() => {
        navigate('/login');
      });
    } else {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setPetData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setPetData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setPetData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(petData);
      await dispatch(uploadPet(petData));
      Swal.fire({
        icon: 'success',
        title: 'Upload Successful',
        text: 'Your pet has been uploaded successfully.',
      });
      closeModal();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'There was an issue uploading your pet. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Banner */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${petListBanner})`, height: '300px' }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-black">Pet List</h1>
          <h2 className="text-2xl text-black mt-4">Find your perfect pet companion</h2>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto flex px-12 py-12">
        {/* Pet Cards */}
        <div className="w-full">
          {/* Search Bar */}
          <div className="mb-10 flex justify-between">
            <input
              type="text"
              className="w-5/6 p-4 rounded-lg shadow-md"
              placeholder="Search..."
            />
            <button
              onClick={openModal}
              className="w-1/6 ml-4 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md shadow hover:bg-orange-700"
            >
              Upload Pet
            </button>
          </div>

          {/* Pet List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pets.map((pet) => (
              <div key={pet.petId} className="bg-white rounded-lg shadow-md flex overflow-hidden">
                <img
                  src={pet.petImage}
                  alt="Pet"
                  className="w-24 sm:w-64 h-64 pt-5 aspect-square object-fill"
                  onError={(e) => {
                    e.target.src = noImage; 
                  }}
                />
                <div className="w-2/4 p-7">
                  <h2 className="text-2xl font-bold py-2">{pet.name}</h2>
                  <p><strong>Gender:</strong> {pet.gender}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <div className="mt-4 text-center">
                    <span className="text-blue-500">Special Needs</span>
                    <span className="ml-1 text-blue-500">Friendly to other pets</span>
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      className={`bg-orange-500 text-white px-4 py-2 rounded-full ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
                      onClick={handleButtonClick}
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for uploading pet */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Upload Pet"
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            maxHeight: '600px',
            overflow: 'auto',
          },
        }}
      >
        <h2 className="font-mono text-3xl font-bold mb-4">Upload Pet</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Image</label>
            <input type="file" name="petImage" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input type="text" name="name" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Breed</label>
            <input type="text" name="breed" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Gender</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input type="radio" name="gender" value="Male" checked={petData.gender === 'Male'} onChange={handleInputChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={petData.gender === 'Female'} onChange={handleInputChange} />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Age</label>
              <input type="text" name="age" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea name="description" className="w-full p-2 border rounded" onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Vaccine Status</label>
            <input type="checkbox" name="vaccineStatus" checked={petData.vaccineStatus} onChange={handleInputChange} />
            <label className="ml-2">Vaccinated</label>
          </div>
          {petData.vaccineStatus && (
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Vaccine Date</label>
              <input type="date" name="vaccineDate" className="w-full p-2 border rounded" onChange={handleInputChange} />
            </div>
          )}
          <div className="text-right">
            <button type="submit" className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-md shadow hover:bg-orange-700">Submit</button>
            <button type="button" onClick={closeModal} className="ml-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-700">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
