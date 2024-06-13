import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    const result = await dispatch(
      loginUser({ email, password })
    );
    if (result.type === 'auth/loginUser/fulfilled') {
      dispatch(setUser(result.payload.user));
      navigate('/' + result?.payload?.user?.userRole + '/dashboard');
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
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: 'url(/src/assets/login-background.png)' }}>
      <div className="w-full max-w-5xl mx-auto glass-container overflow-hidden border border-gray-200 mt-8">
        <div className="px-8 py-8 flex">
          <div className="w-1/2 flex flex-col justify-center items-center">
          < div className="w-100 h-100 flex items-center justify-center">
              <img src={loginImg} alt="loginImg"/>
            </div>
            <div className="mt-4 text-center">
              <Link to="/register" className="italic font-bold underline" style={{ color: '#35393D' }}>
                Not a member yet
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl font-bold italic" style={{ color: '#002e4d' }}>Sign In</h2>
            <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div className="col-span-2">
                <label className="text-lg block italic font-bold" style={{ color: '#513C2C' }}>Your Email</label>
                <input
                  type="email"
                  className="glass-input mt-1 block w-full"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="text-lg block italic font-bold" style={{ color: '#513C2C' }}>Password</label>
                <input
                  type="password"
                  className="glass-input mt-1 block w-full"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
