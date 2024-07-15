import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllApplications } from '../../redux/slices/applicationSlice';
import { Icon } from '@iconify/react';

const AdminViewAdoptionApplication = () => {
  const dispatch = useDispatch();
  const { allApplications, status, error } = useSelector((state) => state.applications);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const result = await dispatch(fetchAllApplications()).unwrap();
      setApplications(result);
    };
    fetchApplications();
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading applications...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error?.message || "Unknown error"}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-petBg">
      <section className="bg-gray-900 text-gray-300 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-title">All Adoption Applications</h1>
        </div>
      </section>
      <div className="container mx-auto py-10 px-4 md:px-8 lg:px-12">
        {applications && applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div key={app.applicationId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{app.pet.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-sm ${app.status === 'approved' ? 'bg-green-100 text-green-700' : app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {app.status}
                  </span>
                </div>
                <div className="my-4">
                  <div className="flex items-center">
                    <Icon icon="mdi:clock-outline" className="text-gray-500 mr-2" />
                    <span>Application Date: {new Date(app.applicationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="mdi:clock-outline" className="text-gray-500 mr-2" />
                    <span>Schedule Date: {new Date(app.scheduleDate).toLocaleDateString()} at {app.scheduleTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon="mdi:map-marker-outline" className="text-blue-500 mr-2" />
                    <span>Location: {app.scheduleLocation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">No applications found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewAdoptionApplication;
