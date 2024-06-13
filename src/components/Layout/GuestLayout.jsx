import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import PrivateRoute from './PrivateRoute';

export default function GuestLayout() {
  // const user = useSelector((state) => state.user)

  return (
    <div>
      Guest
      {/* <Navbar user={user}/> */}
      <Outlet />
    </div>
  );
}