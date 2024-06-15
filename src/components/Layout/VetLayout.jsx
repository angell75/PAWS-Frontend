import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export default function VetLayout() {
  return (
    <div>
      <Navbar />
      <div className="vet-content">
        <Outlet />
      </div>
    </div>
  );
}
