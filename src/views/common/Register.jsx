import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';
import registerImg from '../../assets/register-img.png';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const validateForm = () => {
    if (password !== passwordConfirmation) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Passwords do not match.',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid email address.',
      });
      return false;
    }

    const contactRegex = /^012\s\d{3}\s\d{4}$/;
    if (!contactRegex.test(contact)) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid contact number in the format 012 345 6789.',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      name: fullName,
      email,
      password,
      password_confirmation: passwordConfirmation,
      contact,
      address,
      userRole: 'customer',
    };
    
    const result = await dispatch(registerUser(userData));
    
    if (result.type === 'auth/registerUser/fulfilled') {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
      }).then(() => {
        navigate('/login'); 
      });
    } else if (result.type === 'auth/registerUser/rejected') {
      const errorMessages = result.payload.errors;
      if (errorMessages) {
        for (const key in errorMessages) {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: errorMessages[key].join(', '),
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: result.error.message || 'An unknown error occurred',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url(/src/assets/register-background.png)' }}>
      <div className="w-full max-w-lg lg:max-w-5xl mx-auto glass-container overflow-hidden border border-gray-200 mt-8">
        <div className="px-8 py-12 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
            <div className="w-full h-full flex items-center justify-center">
              <img src={registerImg} alt="registerImg" className="w-full max-w-xs md:max-w-none"/>
            </div>
            <div className="mt-4 text-center">
              <Link to="/login" className="italic font-bold underline" style={{ color: '#35393D' }}>
                Already have an account? Sign in
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic" style={{ color: '#002e4d' }}>Registration</h2>
            <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              <div className="col-span-1">
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Full Name</label>
                <input
                  type="text"
                  className="glass-input mt-1 block w-full"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Email</label>
                <input
                  type="email"
                  className="glass-input mt-1 block w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Password</label>
                <input
                  type="password"
                  className="glass-input mt-1 block w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Confirm Password</label>
                <input
                  type="password"
                  className="glass-input mt-1 block w-full"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Contact</label>
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
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Address</label>
                <input
                  type="text"
                  className="glass-input mt-1 block w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
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
