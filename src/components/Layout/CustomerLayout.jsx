import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import PrivateRoute from './PrivateRoute';

export default function CustomerLayout() {
  // const user = useSelector((state) => state.user);

  return (
    <div>
      {/* <Navbar user={user}/> */}
      CustomerLayout
      <Outlet />
    </div>
  );
}