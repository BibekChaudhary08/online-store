import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h4 className="text-xl font-bold">MyApp</h4>
          <p className="text-gray-400">© 2024 MyApp. All rights reserved.</p>
        </div>
        <ul className="flex space-x-4 mb-4 md:mb-0">
          <li>
            <Link to="/" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400">About</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-400">Services</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-400">Contact</Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
