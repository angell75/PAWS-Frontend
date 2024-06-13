import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';
import backgroundImage from '../../assets/register-background.png'; 

export default function Register() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: fullName,
      email,
      password,
      password_confirmation: passwordConfirmation,
      contact,
      address,
      userRole: 'customer',
    };
    dispatch(registerUser(userData));
  };

  const renderError = (error) => {
    if (typeof error === 'string') {
      return error;
    } else if (typeof error === 'object' && error !== null) {
      return JSON.stringify(error);
    }
    return 'Unknown error';
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#ffffff',
      }}
    >
      <div
        className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-8" // Increased max width
        style={{ borderRadius: '10px' }}
      >
        <div className="px-8 py-12 flex">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div className="bg-gray-200 h-64 w-64 flex items-center justify-center border border-dashed border-gray-400">
              Image Placeholder
            </div>
            <div className="mt-4 text-center">
              <Link to="/login" className="italic" style={{ color: '#002e4d' }}>
                Already have an account? Sign in
              </Link>
            </div>
          </div>
          <div className="w-2/2">
            <h2 className="text-4xl font-bold italic" style={{ color: '#002e4d' }}>Registration</h2>
            <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}> {/* Adjusted gap */}
              <div className="col-span-1">
                <label className="block italic" style={{ color: '#1693a5' }}>Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block italic" style={{ color: '#1693a5' }}>Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block italic" style={{ color: '#1693a5' }}>Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block italic" style={{ color: '#1693a5' }}>Confirm Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block italic" style={{ color: '#1693a5' }}>Contact</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  placeholder="0123456789"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block italic" style={{ color: '#1693a5' }}>Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              {auth.status === 'failed' && (
                <div className="col-span-2 text-red-500 mb-4">
                  {renderError(auth.error)}
                </div>
              )}
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-md shadow hover:bg-orange-700 focus:outline-none"
                >
                  {auth.status === 'loading' ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
