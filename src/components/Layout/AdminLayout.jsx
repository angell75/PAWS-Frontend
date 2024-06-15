import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
