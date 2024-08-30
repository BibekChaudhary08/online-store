import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRouteforAdmin = ({ children }) => {
  const userDetail = JSON.parse(localStorage.getItem('users'));
  const navigate = useNavigate();

  if (!userDetail || userDetail.role !== 'admin') {
    navigate('/login');
    return null; // Return null to avoid rendering the children
  }

  return children;
}

export default ProtectedRouteforAdmin;
