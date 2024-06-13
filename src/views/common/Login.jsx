import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { setUser } from '../../redux/slices/userSlice';
import backgroundImage from '../../assets/login-background.png';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      loginUser({ email, password })
    );
    if (result.type === 'auth/loginUser/fulfilled') {
      dispatch(setUser(result.payload.user));
      navigate('/'+result?.payload?.user?.userRole+'/dashboard');
    }
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
        className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mt-8"
        style={{ borderRadius: '10px' }}
      >
        <div className="px-8 py-12 flex">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div className="bg-gray-200 h-64 w-64 flex items-center justify-center border border-dashed border-gray-400">
              Image Placeholder
            </div>
            <div className="mt-4 text-center">
              <Link to="/register" className="italic" style={{ color: '#002e4d' }}>
                Not a member yet
              </Link>
            </div>
          </div>
          <div className="w-1/2 pl-8">
            <h2 className="text-4xl font-bold italic" style={{ color: '#002e4d' }}>Sign In</h2>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block italic" style={{ color: '#1693a5' }}>Your Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  placeholder="Your Email"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block italic" style={{ color: '#1693a5' }}>Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 bg-white border-b focus:outline-none focus:ring-teal focus:border-teal"
                  placeholder="Password"
                  style={{ borderBottomColor: '#1693a5' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {auth.status === 'failed' && (
                <div className="text-red-500 mb-4">
                  {renderError(auth.error)}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-md shadow hover:bg-orange-700 focus:outline-none"
              >
                {auth.status === 'loading' ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
