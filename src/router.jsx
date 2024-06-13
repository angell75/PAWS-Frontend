import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Layouts
import GuestLayout from "./components/Layout/GuestLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import CustomerLayout from "./components/Layout/CustomerLayout";
import SellerLayout from "./components/Layout/SellerLayout";
import VetLayout from "./components/Layout/VetLayout";

// Common Views
import Login from "./views/common/Login";
import Landing from "./views/common/Landing";
import NotFound from "./views/common/NotFound";
import Register from "./views/common/Register";
import ViewPetList from "./views/common/ViewPetList";
import ViewPetDetail from "./views/common/ViewPetDetail";
import UserDonate from "./views/common/UserDonate";

// Admin Views
import AdminDashboard from "./views/admin/AdminDashboard";
// import OrganizationList from "./views/admin/OrganizationList";

// User Views
import CustomerDashboard from "./views/customer/CustomerDashboard";
import AdoptionApplication from "./views/common/AdoptionApplication";
// import OrganizationList from "./views/admin/OrganizationList";

// Seller Views
import SellerDashboard from "./views/seller/SellerDashboard";
// import OrganizationList from "./views/admin/OrganizationList";

// Vet Views
import VetDashboard from "./views/vet/VetDashboard";
// import OrganizationList from "./views/admin/OrganizationList";

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }, 
      { path: 'viewpetlist', element: <ViewPetList /> }, //For all user to view pet list
      { path: 'viewpetdetail', element: <ViewPetDetail /> }, //For all user to view pet detail
      { path: 'adoptionapplication', element: <AdoptionApplication /> }, //For all user to view pet detail
      { path: 'userdonate', element: <UserDonate /> }, //For user to donate
    ]
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
          { path: 'viewpetlist', element: <ViewPetList /> }, //For all user to view pet list
          { path: 'viewpetdetail', element: <ViewPetDetail /> }, //For all user to view pet detail
          { path: 'dashboard', element: <AdminDashboard /> },
        ]
      },
    ]
  },
  {
    path: 'customer',
    element: <PrivateRoute allowedRoles={['user']} />,
    children: [
      {
        path: '',
        element: <CustomerLayout />,
        children: [
          { path: '', element: <Navigate to='dashboard' /> },
          { path: 'viewpetlist', element: <ViewPetList /> }, //For all user to view pet list
          { path: 'viewpetdetail', element: <ViewPetDetail /> }, //For all user to view pet detail
          { path: 'dashboard', element: <CustomerDashboard /> },
        ]
      }
    ]
  },
  {
    path: 'seller',
    element: <PrivateRoute allowedRoles={['user']} />,
    children: [
      {
        path: '',
        element: <SellerLayout />,
        children: [
          { path: '', element: <Navigate to='dashboard' /> },
          { path: 'viewpetlist', element: <ViewPetList /> }, //For all user to view pet list
          { path: 'viewpetdetail', element: <ViewPetDetail /> }, //For all user to view pet detail
          { path: 'dashboard', element: <SellerDashboard /> },
        ]
      }
    ]
  },
  {
    path: 'vet',
    element: <PrivateRoute allowedRoles={['user']} />,
    children: [
      {
        path: '',
        element: <VetLayout />,
        children: [
          { path: '', element: <Navigate to='dashboard' /> },
          { path: 'viewpetlist', element: <ViewPetList /> }, //For all user to view pet list
          { path: 'viewpetdetail', element: <ViewPetDetail /> }, //For all user to view pet detail
          { path: 'dashboard', element: <VetDashboard /> },
        ]
      }
    ]
  },
  { path: '*', element: <NotFound /> }
]);

export default router;