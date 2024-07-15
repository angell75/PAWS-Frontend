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
import ViewBlogDetails from './views/common/ViewBlogDetails';

// Admin Views
import AdminDashboard from './views/admin/AdminDashboard';
import AdminViewPetList from './views/admin/AdminViewPetList';
import AdminManageUser from './views/admin/AdminManageUser';
import AdminViewAdoptionApplication from './views/admin/AdminViewAdoptionApplication';
import AdminViewDonations from './views/admin/AdminViewDonations';
import AdminManageEnquiries from './views/admin/AdminManageEnquiries';
import AdminManageVet from './views/admin/AdminManageVet';
import AdminManageBlog from './views/admin/AdminManageBlog';

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
import BookVetService from './views/customer/BookVetService';

// Seller Views
import SellerDashboard from './views/seller/SellerDashboard';
import ManageProduct from './views/seller/ManageProduct';
import ManageOrder from './views/seller/ManageOrder';

// Vet Views
import VetDashboard from './views/vet/VetDashboard';
import VetViewPetList from './views/vet/VetViewPetList';
import VetViewPetInfo from './views/vet/VetViewPetInfo';
import VetManageAppointment from './views/vet/VetManageAppointment';

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
          { path: 'profile', element: <ViewProfile  /> }, // For user to view profile
          { path: 'viewpetlist', element: <AdminViewPetList /> }, 
          { path: 'manageuser', element: <AdminManageUser /> },
          { path: 'managevet', element: <AdminManageVet /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'view-adoption-applications', element: <AdminViewAdoptionApplication /> },
          { path: 'viewdonations', element: <AdminViewDonations /> },
          { path: 'manageenquiries', element: <AdminManageEnquiries /> },
          { path: 'manageblog', element: <AdminManageBlog  /> }, // For admin to manage blog
          { path: 'viewblogdetails/:blogId', element: <ViewBlogDetails /> }, // For user to view blog
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
          { path: 'dashboard', element: <CustomerDashboard /> }, // Customer Dashboard
          { path: 'viewpetlist', element: <ViewPetList /> }, 
          { path: 'pet/:petId', element: <ViewPetDetail /> }, 
          { path: 'adoptionapplication/:petId', element: <AdoptionApplication /> },
          { path: 'viewblog', element: <ViewBlog /> },  // For user to view blog, events, and activities
          { path: 'userdonate', element: <UserDonate /> }, // For user to donate
          { path: 'contactus', element: <ContactUs /> },  // For user to contact PAWS
          { path: 'profile', element: <ViewProfile  /> }, // For user to view profile
          { path: 'mypet', element: <ViewMyPet  /> }, // For user to view the uploaded pet
          { path: 'myapplication', element: <ViewMyApplication  /> }, // For user to view request application from other adopter
          { path: 'shopnow', element: <Shopping  /> }, // For user to shop pet product
          { path: 'cart', element: <CartModal  /> },  // For user to view cart and place order
          { path: 'myorder', element: <ViewMyOrder  /> }, // For user to track thier current order
          { path: 'vetservices', element: <BookVetService  /> }, // For user to book vet services
          { path: 'viewblog', element: <ViewBlog /> }, // For user to view blog
          { path: 'viewblogdetails/:blogId', element: <ViewBlogDetails /> }, // For user to view blog
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
          { path: 'manageproducts', element: <ManageProduct  /> },
          { path: 'manageorders', element: <ManageOrder  /> },
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
          { path: 'profile', element: <ViewProfile  /> },
          { path: 'viewpetlist', element: <VetViewPetList /> },
          { path: 'appointments', element: <VetManageAppointment  /> },
          { path: 'pet/:petId', element: <VetViewPetInfo /> },
          { path: 'pet/:petId/appointment/:appointmentId', element: <VetViewPetInfo /> },
        ],
      },
    ],
  },
  { path: '*', element: <RedirectToDashboard /> },
]);

export default router;

