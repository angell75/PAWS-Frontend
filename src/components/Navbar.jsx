import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import pawsLogo from '../assets/paws.png';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-white shadow-md drop-shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={user && user.userRole ? `/${user.userRole}/dashboard` : "/"}>
          <img src={pawsLogo} alt="PAWS Logo" className="h-12" />
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.userRole === 'customer' && (
                <>
                  <Link to="/viewpetlist" className="px-4">Pet</Link>
                  <Link to="/viewblog" className="px-4">Blog</Link>
                  <Link to="/userdonate" className="px-4">Donate</Link>
                  <Link to="/contactus" className="px-4">Contact Us</Link>
                  <Link to="/cart" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-shopping-cart" className="mr-1" /> Cart
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button className="px-4 flex items-center" onClick={toggleDropdown}>
                      <Icon icon="ic:baseline-account-circle" className="mr-1" /> Profile
                    </button>
                    {dropdownOpen && (
                      <div className="fixed right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                        <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                        <Link to="/my-pet" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Pet</Link>
                        <Link to="/applications" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Applications</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {user.userRole === 'seller' && (
                <>
                  <Link to="/products" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-store" className="mr-1" /> Products
                  </Link>
                  <Link to="/orders" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-receipt-long" className="mr-1" /> Orders
                  </Link>
                  <button onClick={handleLogout} className="px-4 flex items-center">
                    <Icon icon="ic:baseline-logout" className="mr-1" /> Logout
                  </button>
                </>
              )}
              {user.userRole === 'vet' && (
                <>
                  <Link to="/pets" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-pets" className="mr-1" /> Pets
                  </Link>
                  <Link to="/appointments" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-event-note" className="mr-1" /> Appointments
                  </Link>
                  <button onClick={handleLogout} className="px-4 flex items-center">
                    <Icon icon="ic:baseline-logout" className="mr-1" /> Logout
                  </button>
                </>
              )}
              {user.userRole === 'admin' && (
                <>
                  <Link to="/admin-dashboard" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-dashboard" className="mr-1" /> Dashboard
                  </Link>
                  <Link to="/admin/users" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-people" className="mr-1" /> Users
                  </Link>
                  <Link to="/admin/settings" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-settings" className="mr-1" /> Settings
                  </Link>
                  <button onClick={handleLogout} className="px-4 flex items-center">
                    <Icon icon="ic:baseline-logout" className="mr-1" /> Logout
                  </button>
                </>
              )}
            </>
          ) : (
            <Link to="/login" className="inline-block px-6 py-2 bg-blue-700 text-white font-semibold rounded-md shadow hover:bg-orange-600">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
