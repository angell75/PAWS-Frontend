import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export default function GuestLayout() {
  return (
    <div>
      <Navbar />
      <div className="guest-content">
        <Outlet />
      </div>
    </div>
  );
}

