import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyApplications, approveApplication, confirmAdoption } from '../../redux/slices/applicationSlice';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

export default function ViewMyApplication() {
  const dispatch = useDispatch();
  const { myApplications, status, error } = useSelector((state) => state.applications);
  const { user_info: user } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const result = await dispatch(fetchMyApplications(user.userId)).unwrap();
      setApplications(result);
    };
    fetchApplications();
  }, [dispatch, user.userId]);

  const handleApprove = async (applicationId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to approve this application?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(approveApplication(applicationId)).unwrap();
        Swal.fire('Approved!', 'The application has been approved.', 'success');
        setApplications(applications.map(app => app.applicationId === applicationId ? { ...app, status: 'approved' } : app));
      } catch (error) {
        Swal.fire('Error!', 'There was an issue approving the application. Please try again.', 'error');
      }
    }
  };

  const handleConfirmAdoption = async (applicationId, petId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to confirm this pet as adopted?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(confirmAdoption({ applicationId, petId })).unwrap();
        Swal.fire('Confirmed!', 'The pet has been marked as adopted.', 'success');
        setApplications(applications.filter(app => app.applicationId !== applicationId));
      } catch (error) {
        Swal.fire('Error!', 'There was an issue confirming the adoption. Please try again.', 'error');
      }
    }
  };

  if (status === 'loading') {
    return <p>Loading applications...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error?.message || "Unknown error"}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <section className="bg-gray-900 text-gray-300 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-title">My Pet Applications</h1>
          <h2 className="text-2xl text-white mt-4">Manage your pet's adoption requests</h2>
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
                {app.status === 'pending' && (
                  <button onClick={() => handleApprove(app.applicationId)} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4">
                    Approve
                  </button>
                )}
                {app.status === 'approved' && (
                  <>
                    <button disabled className="bg-green-500 text-white px-4 py-2 rounded-md w-full mt-4">
                      Approved
                    </button>
                    {new Date() > new Date(app.scheduleDate) && (
                      <>
                        <button onClick={() => handleConfirmAdoption(app.applicationId, app.petId)} className="bg-orange-500 text-white px-4 py-2 rounded-md w-full mt-4">
                          Confirm Adoption
                        </button>
                        <p className="text-gray-500 text-sm mt-2">Note: You can confirm adoption status after the schedule date has passed. If not confirmed within one day, the application will no longer appear here.</p>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img src="/not-found.png" alt="Not found" className="mx-auto mb-4" />
            <p className="text-gray-500">No applications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
