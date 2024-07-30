import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPetsWithOwners, deletePet, updatePet } from '../../redux/slices/petSlice';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

const AdminViewPetList = () => {
  const dispatch = useDispatch();
  const { pets, status, error } = useSelector((state) => state.pets);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [petData, setPetData] = useState({
    petImage: '',
    name: '',
    breed: '',
    gender: '',
    age: '',
    description: '',
    diagnosis: '',
    vaccineDate: '',
    adoptionStatus: '',
  });
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [adoptionStatusFilter, setAdoptionStatusFilter] = useState('');
  const petsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPetsWithOwners());
  }, [dispatch]);

  const handleEditClick = (pet) => {
    if (!pet) return;
    setSelectedPetId(pet.petId);
    setPetData({
      petImage: '',
      name: pet.name || '',
      breed: pet.breed || '',
      gender: pet.gender || '',
      age: pet.age || '',
      description: pet.description || '',
      diagnosis: pet.diagnosis || '',
      vaccineDate: pet.vaccineDate || '',
      adoptionStatus: pet.adoptionStatus || '',
    });
    setModalIsOpen(true);
  };

  const handleDeleteClick = (petId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this pet!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePet(petId)).then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            Swal.fire('Deleted!', 'The pet has been deleted.', 'success');
          } else {
            Swal.fire('Error!', 'There was an error deleting the pet.', 'error');
          }
        });
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (petData.petImage) {
      formData.append('petImage', petData.petImage);
    }
    formData.append('name', petData.name);
    formData.append('breed', petData.breed);
    formData.append('gender', petData.gender);
    formData.append('age', petData.age);
    formData.append('description', petData.description);
    formData.append('diagnosis', petData.diagnosis);
    formData.append('vaccineDate', petData.vaccineDate);
    formData.append('adoptionStatus', petData.adoptionStatus);

    dispatch(updatePet({ id: selectedPetId, formData })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        Swal.fire('Success', 'Pet updated successfully!', 'success');
        dispatch(fetchPetsWithOwners());
        closeModal();
      } else {
        const errorMessage = action.payload?.errors
          ? Object.values(action.payload.errors).flat().join(', ')
          : action.payload || 'Unknown error';
        Swal.fire('Error', `Error updating pet: ${errorMessage}`, 'error');
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setPetData({
      ...petData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const filteredPets = pets.filter((pet) =>
    (pet?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) &&
    (adoptionStatusFilter === '' || pet?.adoptionStatus === adoptionStatusFilter)
  );
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Pets</h1>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-500">{typeof error === 'string' ? error : JSON.stringify(error)}</p>}
        {status === 'succeeded' && (
          <>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search Pets"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded w-1/3"
              />
              <select
                value={adoptionStatusFilter}
                onChange={(e) => setAdoptionStatusFilter(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
                <option value="pending">Pending</option>
                <option value="vet">Vet</option>
              </select>
            </div>
            {currentPets.length > 0 ? (
              <>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Pet ID</th>
                      <th className="py-2 px-4 border-b">Pet Image</th>
                      <th className="py-2 px-4 border-b">Pet Name</th>
                      <th className="py-2 px-4 border-b">Breed</th>
                      <th className="py-2 px-4 border-b">Gender</th>
                      <th className="py-2 px-4 border-b">Age</th>
                      <th className="py-2 px-4 border-b">Description</th>
                      <th className="py-2 px-4 border-b">Diagnosis</th>
                      <th className="py-2 px-4 border-b">Vaccine Date</th>
                      <th className="py-2 px-4 border-b">Adoption Status</th>
                      <th className="py-2 px-4 border-b">Owner Name</th>
                      <th className="py-2 px-4 border-b">Owner Contact</th>
                      <th className="py-2 px-4 border-b">Owner Email</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPets.map((pet) => pet && (
                      <tr key={pet?.petId} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{pet?.petId || ''}</td>
                        <td className="py-2 px-4 border-b">
                          <img src={pet?.petImage || ''} alt={pet?.name || 'Pet Image'} className="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td className="py-2 px-4 border-b">{pet?.name || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.breed || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.gender || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.age || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.description || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.diagnosis || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.vaccineDate || ''}</td>
                        <td className={`py-2 px-4 border-b ${getAdoptionStatusClass(pet?.adoptionStatus)}`}>
                          {pet?.adoptionStatus || ''}
                        </td>
                        <td className="py-2 px-4 border-b">{pet?.owner?.name || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.owner?.contact || ''}</td>
                        <td className="py-2 px-4 border-b">{pet?.owner?.email || ''}</td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditClick(pet)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              <Icon icon="mdi:pencil" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(pet?.petId)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                              <Icon icon="mdi:delete" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4 space-x-2">
                  {[...Array(Math.ceil(filteredPets.length / petsPerPage)).keys()].map((number) => (
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
            ) : (
              <p>No pets found.</p>
            )}
          </>
        )}
        {status === 'succeeded' && (!pets || pets.length === 0) && <p>No pets available.</p>}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Pet"
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            maxHeight: '600px',
            overflow: 'auto',
          },
        }}
      >
        <h2 className="font-mono text-3xl font-bold mb-4">Edit Pet</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Image</label>
            <input
              type="file"
              name="petImage"
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={petData.name}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Breed</label>
            <input
              type="text"
              name="breed"
              value={petData.breed}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Gender</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={petData.gender === 'Male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={petData.gender === 'Female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={petData.age}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
              pattern="\d*"
              min="0"
              step="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={petData.description}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              value={petData.diagnosis}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Vaccine Date</label>
            <input
              type="date"
              name="vaccineDate"
              value={petData.vaccineDate}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Adoption Status</label>
            <select
              name="adoptionStatus"
              value={petData.adoptionStatus}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            >
              <option value="available">Available</option>
              <option value="adopted">Adopted</option>
              <option value="pending">Pending</option>
              <option value="vet">Vet</option>
            </select>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-md shadow hover:bg-orange-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const getAdoptionStatusClass = (status) => {
  switch (status) {
    case 'available':
      return 'text-green-500 font-bold';
    case 'adopted':
      return 'text-blue-500 font-bold';
    case 'pending':
      return 'text-yellow-500 font-bold';
    case 'vet':
      return 'text-red-500 font-bold';
    default:
      return 'text-gray-500 font-bold';
  }
};

export default AdminViewPetList;
