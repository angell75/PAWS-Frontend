import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';
import registerImg from '../../assets/register-img.png';

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
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: 'url(/src/assets/register-background.png)' }}>
      <div className="w-full max-w-5xl mx-auto glass-container overflow-hidden border border-gray-200 mt-8">
        <div className="px-8 py-12 flex">
          <div className="w-1/2 flex flex-col justify-center items-center">
          < div className="w-100 h-100 flex items-center justify-center">
              <img src={registerImg} alt="registerImg" />
            </div>
            <div className="mt-4 text-center">
              <Link to="/login" className="italic font-bold underline" style={{ color: '#35393D' }}>
                Already have an account? Sign in
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl font-bold italic" style={{ color: '#002e4d' }}>Registration</h2>
            <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div className="col-span-1">
                <label className="text-lg	block italic font-bold" style={{ color: '#513C2C' }}>Full Name</label>
                <input
                  type="text"
                  className="glass-input mt-1 block w-full"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg	block italic font-bold" style={{ color: '#513C2C' }}>Email</label>
                <input
                  type="email"
                  className="glass-input mt-1 block w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg	block italic font-bold" style={{ color: '#513C2C' }}>Password</label>
                <input
                  type="password"
                  className="glass-input mt-1 block w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg	block italic font-bold" style={{ color: '#513C2C' }}>Confirm Password</label>
                <input
                  type="password"
                  className="glass-input mt-1 block w-full"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg	block italic font-bold" style={{ color: '#513C2C' }}>Contact</label>
                <input
                  type="text"
                  className="glass-input mt-1 block w-full"
                  placeholder="012 345 6789"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg	block italic font-bold" style={{ color: '#513C2C' }}>Address</label>
                <input
                  type="text"
                  className="glass-input mt-1 block w-full h-32"
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
