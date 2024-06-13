import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const user = useSelector(state => state.user);
  const { user_info: { userRole } } = user;
  // console.log('private route', user_role);
  // console.log('private routeddd', organization_id);

  // When user state is empty
  if (!user && !user.user_info) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.array.isRequired,
};

export default PrivateRoute;