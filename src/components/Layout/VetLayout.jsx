import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import PrivateRoute from './PrivateRoute';

export default function VetLayout() {
  // const user = useSelector((state) => state.user);

  return (
    <div>
      {/* <Navbar user={user}/> */}
      VetLayout
      <Outlet />
    </div>
  );
}