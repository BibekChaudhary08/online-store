import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userDetail = JSON.parse(localStorage.getItem('users'));
  const cartItems = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('users');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">SysQube Store</Link>
        </div>

        {/* Hamburger Menu Icon for mobile and tablet screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:space-x-6 space-y-4 md:space-y-0 md:static absolute bg-gray-800 md:bg-transparent w-full md:w-auto left-0 md:translate-x-0 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform md:top-auto top-16 md:p-0 p-4 z-10`}
        >
          <li>
            <Link to="/" className="block py-2 px-4 hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pages/cartitem" className="block py-2 px-4 hover:text-blue-400">
              Cart ({cartItems.length})
            </Link>
          </li>
          {userDetail?.role === 'user' && (
            <li>
              <Link to="/pages/dashboard/userdashboard" className="block py-2 px-4 hover:text-blue-400">
                User Dashboard
              </Link>
            </li>
          )}
          {userDetail?.role === 'admin' && (
            <li>
              <Link to="/pages/dashboard/admindashboard" className="block py-2 px-4 hover:text-blue-400">
                Admin Dashboard
              </Link>
            </li>
          )}
          {!userDetail && (
            <li>
              <Link to="/signup" className="block py-2 px-4 hover:text-blue-400">
                Login/Signup
              </Link>
            </li>
          )}
          <li>
            <Link to="/login" className="block py-2 px-4 hover:text-blue-400" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
