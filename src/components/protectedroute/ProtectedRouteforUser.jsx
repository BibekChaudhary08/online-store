import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRouteforUser = ({ children }) => {
  const userDetail = JSON.parse(localStorage.getItem('users'));
  const navigate = useNavigate();

  if (!userDetail || userDetail.role !== 'user') {
    navigate('/login');
    return null; // Return null to avoid rendering the children
  }

  return children;
}

export default ProtectedRouteforUser;
