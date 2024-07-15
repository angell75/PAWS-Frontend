import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersData } from '../../redux/slices/adminSlice';
import { createUser, updateUser, deleteUser } from '../../redux/slices/userSlice';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

const AdminManageVet = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admin);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [vetData, setVetData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    userRole: 'vet',
    password: '',
    confirmPassword: '',
    status: 1,
  });
  const [selectedVetId, setSelectedVetId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@vetcare\.com$/;
    return regex.test(email);
  };

  const validateContact = (contact) => {
    const regex = /^012\s\d{3}\s\d{4}$/;
    return regex.test(contact);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVetData({
      ...vetData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!vetData.name || !vetData.contact || !vetData.address) {
      Swal.fire('Error', 'Name, Contact, and Address fields are required.', 'error');
      return;
    }

    if (!validateEmail(vetData.email)) {
      Swal.fire('Error', 'Email must be in the format "@vetcare.com".', 'error');
      return;
    }

    if (!validateContact(vetData.contact)) {
      Swal.fire('Error', 'Contact must be in the format "012 345 6789".', 'error');
      return;
    }

    if (modalType === 'create' && vetData.password !== vetData.confirmPassword) {
      Swal.fire('Error', 'Password and Confirm Password do not match.', 'error');
      return;
    }

    const submissionData = {
      ...vetData,
      password_confirmation: vetData.confirmPassword, 
    };

    if (modalType === 'create') {
      dispatch(createUser(submissionData)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          Swal.fire('Success', 'Vet created successfully!', 'success');
          dispatch(fetchUsersData());
          closeModal();
        } else {
          const errorMessage = action.payload?.errors ? Object.values(action.payload.errors).flat().join(', ') : 'There was an error creating the vet.';
          Swal.fire('Error', errorMessage, 'error');
        }
      });
    } else if (modalType === 'edit') {
      const { password, confirmPassword, ...dataToUpdate } = submissionData;
      dispatch(updateUser({ id: selectedVetId, data: dataToUpdate })).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          Swal.fire('Success', 'Vet updated successfully!', 'success');
          dispatch(fetchUsersData());
          closeModal();
        } else {
          const errorMessage = action.payload?.errors ? Object.values(action.payload.errors).flat().join(', ') : 'There was an error updating the vet.';
          Swal.fire('Error', errorMessage, 'error');
        }
      });
    }
  };

  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this vet!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId)).then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            Swal.fire('Deleted!', 'The vet has been deleted.', 'success');
            dispatch(fetchUsersData());
          } else {
            Swal.fire('Error!', 'There was an error deleting the vet.', 'error');
          }
        });
      }
    });
  };

  const handleEditClick = (vet) => {
    setSelectedVetId(vet.userId); 
    setVetData({
      name: vet.name,
      email: vet.email,
      contact: vet.contact,
      address: vet.address,
      userRole: 'vet',
      password: '',
      confirmPassword: '',
      status: vet.status, 
    });
    setModalType('edit');
    setModalIsOpen(true);
  };

  const handleCreateClick = () => {
    setVetData({
      name: '',
      email: '',
      contact: '',
      address: '',
      userRole: 'vet',
      password: '',
      confirmPassword: '',
      status: 1, 
    });
    setModalType('create');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVets = users.filter(user => user.userRole === 'vet' && (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())));
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredVets.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="min-h-screen bg-petBg p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Vets</h1>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-500">{typeof error === 'string' ? error : JSON.stringify(error)}</p>}
        {status === 'succeeded' && (
          <>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 border rounded w-1/2"
              />
              <button
                onClick={handleCreateClick}
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
              >Add Vet
              </button>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Vet ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Contact</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((vet) => vet && (
                  <tr key={vet?.userId} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{vet?.userId}</td>
                    <td className="py-2 px-4 border-b">{vet?.name}</td>
                    <td className="py-2 px-4 border-b">{vet?.email}</td>
                    <td className="py-2 px-4 border-b">{vet?.contact}</td>
                    <td className="py-2 px-4 border-b">{vet?.address}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(vet)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          <Icon icon="mdi:pencil" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(vet.userId)}
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
              {[...Array(Math.ceil(filteredVets.length / usersPerPage)).keys()].map((number) => (
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
        {status === 'succeeded' && (!users || filteredVets.length === 0) && <p>No vets available.</p>}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Vet"
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            maxHeight: '600px',
            overflow: 'auto',
          },
        }}
      >
        <h2 className="font-mono text-3xl font-bold mb-4">{modalType === 'create' ? 'Add Vet' : 'Edit Vet'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={vetData.name}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={vetData.email}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Contact</label>
            <input
              type="text"
              name="contact"
              value={vetData.contact}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={vetData.address}
              className="w-full p-2 border rounded"
              onChange={handleInputChange}
              required
            />
          </div>
          {modalType === 'create' && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={vetData.password}
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={vetData.confirmPassword}
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}
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

export default AdminManageVet;
