import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

// Layouts
import GuestLayout from './components/Layout/GuestLayout';
import AdminLayout from './components/Layout/AdminLayout';
import CustomerLayout from './components/Layout/CustomerLayout';
import SellerLayout from './components/Layout/SellerLayout';
import VetLayout from './components/Layout/VetLayout';

// Common Views
import Login from './views/common/Login';
import Landing from './views/common/Landing';
import Register from './views/common/Register';
import ViewPetList from './views/common/ViewPetList';
import ViewProfile from './views/common/ViewProfile';
import ViewPetDetail from './views/common/ViewPetDetail';

// Admin Views
import AdminDashboard from './views/admin/AdminDashboard';

// User Views
import CustomerDashboard from './views/customer/CustomerDashboard';
import AdoptionApplication from './views/customer/AdoptionApplication';
import UserDonate from './views/customer/UserDonate';
import ContactUs from './views/customer/ContactUs';
import ViewBlog from './views/customer/ViewBlog';
import ViewMyPet from './views/customer/ViewMyPet';
import ViewMyApplication from './views/customer/ViewMyApplication';
import CartModal from './views/customer/CartModal';
import Shopping from './views/customer/Shopping';
import ViewMyOrder from './views/customer/ViewMyOrder';

// Seller Views
import SellerDashboard from './views/seller/SellerDashboard';

// Vet Views
import VetDashboard from './views/vet/VetDashboard';

// Redirect to dashboard based on user role
const RedirectToDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user || !user.userRole) {
    return <Navigate to='/login' />;
  }

  switch (user.userRole) {
    case 'admin':
      return <Navigate to='/admin/dashboard' />;
    case 'customer':
      return <Navigate to='/customer/dashboard' />;
    case 'seller':
      return <Navigate to='/seller/dashboard' />;
    case 'vet':
      return <Navigate to='/vet/dashboard' />;
    default:
      return <Navigate to='/' />;
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'viewpetlist', element: <ViewPetList /> }, // For all users to view pet list
    ],
  },
  {
    path: 'admin',
    element: <PrivateRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { path: '', element: <Navigate to='dashboard' /> },
          { path: 'viewpetlist', element: <ViewPetList /> }, // For all users to view pet list
          { path: 'pet/:petId', element: <ViewPetDetail /> }, // For all users to view pet detail
          { path: 'dashboard', element: <AdminDashboard /> },
        ],
      },
    ],
  },
  {
    path: 'customer',
    element: <PrivateRoute allowedRoles={['customer']} />,
    children: [
      {
        path: '',
        element: <CustomerLayout />,
        children: [
          { path: '', element: <Navigate to='dashboard' /> },
          { path: 'dashboard', element: <CustomerDashboard /> },
          { path: 'viewpetlist', element: <ViewPetList /> }, // For all users to view pet list
          { path: 'pet/:petId', element: <ViewPetDetail /> }, // For all users to view pet detail
          { path: 'adoptionapplication/:petId', element: <AdoptionApplication /> },
          { path: 'viewblog', element: <ViewBlog /> },
          { path: 'userdonate', element: <UserDonate /> }, // For user to donate
          { path: 'contactus', element: <ContactUs /> },
          { path: 'profile', element: <ViewProfile  /> },
          { path: 'mypet', element: <ViewMyPet  /> },
          { path: 'myapplication', element: <ViewMyApplication  /> },
          { path: 'shopnow', element: <Shopping  /> },
          { path: 'cart', element: <CartModal  /> },
          { path: 'myorder', element: <ViewMyOrder  /> },
        ],
      },
    ],
  },
  {
    path: 'seller',
    element: <PrivateRoute allowedRoles={['seller']} />,
    children: [
      {
        path: '',
        element: <SellerLayout />,
        children: [
          { path: '', element: <Navigate to='dashboard' /> },
          { path: 'dashboard', element: <SellerDashboard /> },
          { path: 'profile', element: <ViewProfile  /> },
        ],
      },
    ],
  },
  {
    path: 'vet',
    element: <PrivateRoute allowedRoles={['vet']} />,
    children: [
      {
        path: '',
        element: <VetLayout />,
        children: [
          { path: '', element: <Navigate to='dashboard' /> },
          { path: 'dashboard', element: <VetDashboard /> },
          { path: 'viewpetlist', element: <ViewPetList /> }, // For all users to view pet list
          { path: 'pet/:petId', element: <ViewPetDetail /> }, // For all users to view pet detail
        ],
      },
    ],
  },
  { path: '*', element: <RedirectToDashboard /> },
]);

export default router;

