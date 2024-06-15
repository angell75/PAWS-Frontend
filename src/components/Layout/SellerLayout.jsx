import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export default function SellerLayout() {
  return (
    <div>
      <Navbar />
      <div className="seller-content">
        <Outlet />
      </div>
    </div>
  );
}
