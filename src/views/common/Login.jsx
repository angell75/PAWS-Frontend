import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { loginUser } from '../../redux/slices/authSlice';
import { setUser } from '../../redux/slices/userSlice';
import loginImg from '../../assets/login-img.png';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ 
      // email: "ps@gmail.com", 
      // email: "a@gmail.com", 
      // email: "john@gmail.com",
      // email: "sarah.johnson@vetcare.com",
      // email: "michael.lee@vetcare.com",
      email: "pa@gmail.com",
      password: "Abc@12345"
    }));
    if (result.type === 'auth/loginUser/fulfilled') {
      dispatch(setUser(result.payload.user));
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
      }).then(() => {
        navigate('/' + result?.payload?.user?.userRole + '/dashboard');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: renderError(result.payload || 'Unknown error'),
      });
    }
  };

  const renderError = (error) => {
    if (typeof error === 'string') {
      try {
        const parsedError = JSON.parse(error);
        if (parsedError.error) {
          return parsedError.error;
        }
      } catch (e) {
        return error;
      }
    } else if (typeof error === 'object' && error !== null && error.error) {
      return error.error;
    }
    return 'Unknown error';
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url(/src/assets/login-background.png)' }}>
      <div className="w-full max-w-lg lg:max-w-5xl mx-auto glass-container overflow-hidden border border-gray-200 mt-8">
        <div className="px-8 py-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
            <div className="w-full h-full flex items-center justify-center">
              <img src={loginImg} alt="loginImg" className="w-full max-w-xs md:max-w-none"/>
            </div>
            <div className="mt-4 text-center">
              <Link to="/register" className="italic font-bold underline" style={{ color: '#35393D' }}>
                Not a member yet
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic" style={{ color: '#002e4d' }}>Sign In</h2>
            <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              <div className="col-span-1">
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Your Email</label>
                <input
                  type="email"
                  className="glass-input mt-1 block w-full"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                />
              </div>
              <div className="col-span-1">
                <label className="text-lg sm:text-xl md:text-2xl block italic font-bold" style={{ color: '#513C2C' }}>Password</label>
                <input
                  type="password"
                  className="glass-input mt-1 block w-full"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                />
              </div>
              <div className="col-span-1">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-md shadow hover:bg-orange-700 focus:outline-none"
                >
                  {auth.status === 'loading' ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
