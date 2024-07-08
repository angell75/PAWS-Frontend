import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/slices/userSlice';
import { fetchUsersData } from '../../redux/slices/adminSlice';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

const AdminManageUser = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId)).then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            dispatch(fetchUsersData());
          } else {
            Swal.fire('Error!', 'There was an error deleting the user.', 'error');
          }
        });
      }
    });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users && users.length ? users.slice(indexOfFirstUser, indexOfLastUser) : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-500">{typeof error === 'string' ? error : JSON.stringify(error)}</p>}
        {status === 'succeeded' && currentUsers.length > 0 && (
          <>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">User ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Contact</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => user && (
                  <tr key={user.userId} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{user.userId}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.contact}</td>
                    <td className="py-2 px-4 border-b">{user.address}</td>
                    <td className="py-2 px-4 border-b">{user.userRole}</td>
                    <td className="py-2 px-4 border-b">{user.status}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteClick(user.userId)}
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
              {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
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
        {status === 'succeeded' && (!users || users.length === 0) && <p>No users available.</p>}
      </div>
    </div>
  );
};

export default AdminManageUser;
