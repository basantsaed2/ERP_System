import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';  // Importing the menu icon
import { EmailIcon, NotificationIcon } from '../assets/Icons/AllIcons';
import Image from '../assets/Image.png';

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-secoundColor text-mainColor p-2 md:p-6 flex justify-between items-center">

       {/* Menu Icon (for small screens only) */}
       <div className="md:hidden">
        <button onClick={toggleSidebar}>
          <GiHamburgerMenu className="text-mainColor text-2xl" />
        </button>
      </div>
      
      {/* Left Section */}
      <div className="text-lg font-bold">
        Employees
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Email Icon */}
        <div className="bg-fouthColor p-2 rounded-full cursor-pointer">
          <EmailIcon className="text-white text-xl" />
        </div>

        <div className="bg-fouthColor p-2 rounded-full cursor-pointer">
          <NotificationIcon className="text-white text-xl" />
        </div>

        {/* User Profile */}
        <div className="relative hidden md:flex gap-4 justify-center items-center ">
          <div 
            className="flex justify-center items-center space-x-3 cursor-pointer rounded-lg transition-all duration-300" 
            onClick={toggleDropdown}
          >
            <img 
              src={Image}
              alt="User Avatar" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900">Mohamed Kamal</span>
                <span className="text-sm text-gray-600">&#9660;</span>
              </div>
              <span className="text-xs text-gray-500">admin</span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="z-20 absolute right-0 top-10 mt-2 bg-white text-black rounded shadow-lg w-32">
              <button className="block w-full px-4 py-2 bg-mainColor text-secoundColor text-left hover:bg-secoundColor hover:text-mainColor " onClick={() => alert('Logging out...')}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

