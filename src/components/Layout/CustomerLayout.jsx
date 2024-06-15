import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Landing from "../../views/common/Landing"; // Corrected path

export default function CustomerLayout() {
  return (
    <div>
      <Navbar />
      <Landing />
      <div className="container mx-auto py-6">
        <Outlet />
      </div>
    </div>
  );
}
