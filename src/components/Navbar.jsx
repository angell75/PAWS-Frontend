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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <Icon icon="ic:baseline-menu" className="text-2xl" />
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-lg">
          {user ? (
            <>
              {user.userRole === 'customer' && (
                <>
                  <Link to="/customer/viewpetlist" className="px-4">Pet</Link>
                  <Link to="/customer/userdonate" className="px-4">Donate</Link>
                  <Link to="/customer/shopnow" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-store" className="mr-1" /> Shop
                  </Link>
                  <Link to="/customer/cart" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-shopping-cart" className="mr-1" /> Cart
                  </Link>
                  <Link to="/customer/contactus" className="px-4">Contact Us</Link>
                  <Link to="/customer/vetservices" className="px-4">Vet Services</Link>
                  <Link to="/customer/viewblog" className="px-4">Blog</Link>
                  <div className="relative" ref={dropdownRef}>
                    <button className="px-4 flex items-center" onClick={toggleDropdown}>
                      <Icon icon="ic:baseline-account-circle" className="mr-1" /> Profile
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                        <Link to="/customer/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                        <Link to="/customer/mypet" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Pet</Link>
                        <Link to="/customer/myapplication" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Applications</Link>
                        <Link to="/customer/myorder" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Orders</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {user.userRole === 'seller' && (
                <>
                  <Link to="/seller/manageproducts" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-store" className="mr-1" /> Products
                  </Link>
                  <Link to="/seller/manageorders" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-receipt-long" className="mr-1" /> Orders
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button className="px-4 flex items-center" onClick={toggleDropdown}>
                      <Icon icon="ic:baseline-account-circle" className="mr-1" /> Profile
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                        <Link to="/seller/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {user.userRole === 'vet' && (
                <>
                  <Link to="/vet/viewpetlist" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-pets" className="mr-1" /> Pets
                  </Link>
                  <Link to="/vet/appointments" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-event-note" className="mr-1" /> Appointments
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button className="px-4 flex items-center" onClick={toggleDropdown}>
                      <Icon icon="ic:baseline-account-circle" className="mr-1" /> Profile
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                        <Link to="/vet/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {user.userRole === 'admin' && (
                <>
                  <Link to="/admin/manageuser" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-people" className="mr-1" /> Customer
                  </Link>
                  <Link to="/admin/managevet" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-people" className="mr-1" /> Vet
                  </Link>
                  <Link to="/admin/viewpetlist" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-pets" className="mr-1" />Pet
                  </Link>
                  <Link to="/admin/view-adoption-applications" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-assignment" className="mr-1" /> Adoption Applications
                  </Link>
                  <Link to="/admin/viewdonations" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-volunteer-activism" className="mr-1" /> Donation
                  </Link>
                  <Link to="/admin/manageenquiries" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-question-answer" className="mr-1" /> Enquiries
                  </Link>
                  <Link to="/admin/manageblog" className="px-4 flex items-center">
                    <Icon icon="ic:baseline-assignment" className="mr-1" /> Blogs
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button className="px-4 flex items-center" onClick={toggleDropdown}>
                      <Icon icon="ic:baseline-account-circle" className="mr-1" /> Profile
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                        <Link to="/admin/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <Link to="/login" className="inline-block px-6 py-2 bg-blue-700 text-white font-semibold rounded-md shadow hover:bg-orange-600">Login</Link>
          )}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-2 text-lg">
            {user ? (
              <>
                {user.userRole === 'customer' && (
                  <>
                    <Link to="/customer/viewpetlist" className="block px-4 py-2">Pet</Link>
                    <Link to="/customer/userdonate" className="block px-4 py-2">Donate</Link>
                    <Link to="/customer/contactus" className="block px-4 py-2">Contact Us</Link>
                    <Link to="/customer/cart" className="block px-4 py-2">Cart</Link>
                    <Link to="/customer/shopnow" className="block px-4 py-2">Shop</Link>
                    <Link to="/customer/vetservices" className="block px-4 py-2">Vet Services</Link>
                    <div className="relative" ref={dropdownRef}>
                      <button className="block px-4 py-2" onClick={toggleDropdown}>Profile</button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                          <Link to="/customer/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                          <Link to="/customer/mypet" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Pet</Link>
                          <Link to="/customer/myapplication" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Applications</Link>
                          <Link to="/customer/myorder" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Orders</Link>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {user.userRole === 'seller' && (
                  <>
                    <Link to="/seller/manageproducts" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-store" className="mr-1" /> Products
                    </Link>
                    <Link to="/seller/manageorders" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-receipt-long" className="mr-1" /> Orders
                    </Link>
                    <Link to="/seller/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                  </>
                )}
                {user.userRole === 'vet' && (
                  <>
                    <Link to="/vet/viewpetlist" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-pets" className="mr-1" /> Pets
                    </Link>
                    <Link to="/vet/appointments" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-event-note" className="mr-1" /> Appointments
                    </Link>
                    <div className="relative" ref={dropdownRef}>
                      <button className="block px-4 py-2 flex items-center" onClick={toggleDropdown}>
                        <Icon icon="ic:baseline-account-circle" className="mr-1" /> Profile
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                          <Link to="/vet/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {user.userRole === 'admin' && (
                  <>
                    <Link to="/admin/manageuser" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-people" className="mr-1" /> Customer
                    </Link>
                    <Link to="/admin/managevet" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-people" className="mr-1" /> Vet
                    </Link>
                    <Link to="/admin/viewpetlist" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-pets" className="mr-1" /> Pet
                    </Link>
                    <Link to="/admin/view-adoption-applications" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-assignment" className="mr-1" /> Adoption Applications
                    </Link>
                    <Link to="/admin/viewblogs" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-assignment" className="mr-1" /> Blogs
                    </Link>
                    <Link to="/admin/donations" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-volunteer-activism" className="mr-1" /> Donation
                    </Link>
                    <Link to="/admin/manageenquiries" className="block px-4 py-2 flex items-center">
                      <Icon icon="ic:baseline-question-answer" className="mr-1" /> Enquiries
                    </Link>
                    <div className="relative" ref={dropdownRef}>
                      <button className="block px-4 py-2 flex items-center" onClick={toggleDropdown}>
                        <Icon icon="ic:baseline-account-circle" className="mr-1" /> Profile
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                          <Link to="/admin/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</Link>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <Link to="/login" className="block px-4 py-2 bg-blue-700 text-white font-semibold rounded-md shadow hover:bg-orange-600">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
