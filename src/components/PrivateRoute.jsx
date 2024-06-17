import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const user = useSelector(state => state.user);
  const { user_info } = user || {};
  const { userRole } = user_info || {};

  if (!user_info || !userRole) {
    return <Navigate to='/login' />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to='/unauthorized' />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.array.isRequired,
};

export default PrivateRoute;
