import React, { useState } from 'react';
import Sidebar from './Component/Sidebar';
import Navbar from './Component/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative w-full h-screen flex overflow-hidden">
      {/* Sidebar Overlay (for small screens when the sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}  // Close sidebar when clicking overlay
        />
      )}

      {/* Sidebar (Fixed for small screens, static for large screens) */}
      <div 
        className={`fixed w-3/5 inset-0 bg-mainColor text-secondColor z-50 transform transition-transform duration-300 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 md:static`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="relative z-40">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className="p-2 lg:p-6 relative w-full h-full bg-thirdColor overflow-auto hide-scrollbar scrollPage">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
