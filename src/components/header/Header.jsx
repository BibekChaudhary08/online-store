import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-bold">MyApp</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-blue-400">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/user-dashboard" className="hover:text-blue-400">
              User Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard" className="hover:text-blue-400">
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-blue-400">
              Login/Signup
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-blue-400">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
