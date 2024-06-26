import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { updateUserProfile, changePassword } from '../../redux/slices/userSlice';
import profileBanner from "../../assets/profile.png";

Modal.setAppElement("#root");

export default function ViewProfile() {
  const dispatch = useDispatch();
  const { user_info: profile, status, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUserProfile(profileData)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        Swal.fire('Success', 'Profile updated successfully!', 'success');
      } else {
        Swal.fire('Error', 'Error updating profile: ' + (action.payload?.message || 'Unknown error'), 'error');
      }
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModalIsOpen(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
    } else {
      dispatch(changePassword(passwordData)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          Swal.fire('Success', 'Password changed successfully', 'success');
        } else {
          Swal.fire('Error', 'Error changing password: ' + (action.payload?.message || 'Unknown error'), 'error');
        }
        closePasswordModal();
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-petBg">
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${profileBanner})`, height: "300px" }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Profile</h1>
          <h2 className="text-xl md:text-2xl text-white mt-4">
            Update your photo and personal details.
          </h2>
        </div>
      </section>

      <div className="flex justify-center items-center flex-grow py-10 px-4">
        <div className="w-full md:w-1/2 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Account</h1>
            <div>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-2 mb-2 md:mb-0"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded mr-2 mb-2 md:mb-0"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded mr-2 mb-2 md:mb-0"
                >
                  Edit
                </button>
              )}
              <button
                onClick={openPasswordModal}
                className="bg-orange-500 text-white py-2 px-4 rounded"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="text"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Contact</label>
              <input
                type="text"
                name="contact"
                value={profileData.contact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>
          </div>

          <Modal
            isOpen={passwordModalIsOpen}
            onRequestClose={closePasswordModal}
            contentLabel="Change Password"
            className="modal"
            overlayClassName="overlay"
          >
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Change Password
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
