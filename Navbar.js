import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg p-4 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        {/* <img
          className="h-20 w-auto object-contain"
          src="../image/logo77.png"
          alt="no"
        /> */}

        {/* Menu Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
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
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu Items - Responsive */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex items-center space-x-6`}
        >
          <ul className="flex space-x-6">
            <li>
              <a href="/Home" className="text-black hover:text-red-600 font-semibold transition">
                Home
              </a>
            </li>
            <li>
              <a href="/About" className="text-black hover:text-red-600 font-semibold transition">
                About
              </a>
            </li>
            <li>
              <a href="/Contact" className="text-black hover:text-red-600 font-semibold transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/NewArrivalsPage" className="text-black hover:text-red-600 font-semibold transition">
                what is new!
              </a>
            </li>
          </ul>
        </div>

        {/* Login and Sign Up Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/Login"
            className="bg-red text-black border border-red-600 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/RegistrationForm"
            className="bg-red-500 text-white hover:bg-white hover:text-black border border-red-600 font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white mt-4 p-4 shadow-lg">
          <ul className="space-y-4">
            <li>
              <a href="/Home" className="block text-black hover:text-blue-600 font-semibold transition">
                Home
              </a>
            </li>
            <li>
              <a href="/About" className="block text-black hover:text-blue-600 font-semibold transition">
                About
              </a>
            </li>
            <li>
              <a href="/Contact" className="block text-black hover:text-blue-600 font-semibold transition">
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/Login"
                className=" bg-red text-black border border-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
            <Link
           to="/RegistrationForm"
           className="bg-red-500 text-white hover:bg-red-600 hover:text-black border border-red-600 font-bold py-2 px-4 rounded transition duration-300 no-underline"
           >
           Sign Up
           </Link>
        


            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
