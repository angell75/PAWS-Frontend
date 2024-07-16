import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import PawPrint from '../../assets/PawPrint.png';
import { submitApplication } from '../../redux/slices/applicationSlice'; 

export default function AdoptionApplication() {
  const { petId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) return;

    const applicationData = {
      userId: user.userId, 
      petId,
      applicationDate: new Date().toISOString().split('T')[0], 
      scheduleDate: date,
      scheduleTime: time,
      scheduleLocation: location,
      status: 'pending', 
    };

    try {
      await dispatch(submitApplication(applicationData));
      navigate('/customer/dashboard'); 
    } catch (error) {
      console.error('Failed to submit application:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D2BBA5]">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center mb-6">
          <img src={PawPrint} alt="Paw Print" className="h-10 w-10 mr-3" />
          <h1 className="text-4xl font-bold text-[#513C2C]">Apply for Adoption</h1>
          <p className="text-xl text-[#EAB464] ml-4">I’m Interested to Adopt</p>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-[#513C2C] mb-4">YOUR INFORMATION</h2>
          <div className="mb-4">
            <label className="block text-[#513C2C] font-semibold">Name</label>
            <input
              type="text"
              value={name}
              disabled
              className="w-full p-2 border border-[#7A7A7A] rounded-md"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#513C2C] font-semibold">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-2 border border-[#7A7A7A] rounded-md"
              placeholder="john@example.com"
            />
          </div>
          <h2 className="text-xl font-bold text-[#513C2C] mb-4">SCHEDULE DATE/TIME & LOCATION:</h2>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-[#513C2C] mr-2" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-[#7A7A7A] rounded-md"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <FaClock className="text-[#513C2C] mr-2" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-[#7A7A7A] rounded-md"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <FaMapMarkerAlt className="text-[#513C2C] mr-2" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-[#7A7A7A] rounded-md"
              placeholder="SS2"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            <label className="text-[#513C2C]">
              By signing up, I agree with the{' '}
              <Link to="/customer/contactus" className="text-blue-500 underline">
                Term Services
              </Link>
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#484848] text-white py-3 px-6 rounded-md shadow hover:bg-gray-700 text-lg font-bold"
              disabled={!agree}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
