import React from 'react';
import MeanSide from './MenuSide';
import { LuPanelLeftClose } from "react-icons/lu";
import Logo from '../assets/Logo';

const Sidebar = ({ closeSidebar }) => {
  return (
    <aside className="bg-mainColor text-secondColor h-full p-6 z-50">
      {/* Close Icon for Small Screens */}
      <button 
        className="md:hidden mb-4 flex w-full flex-row-reverse"
        onClick={closeSidebar}
      >
        <LuPanelLeftClose className="text-2xl text-white" />
      </button>

      {/* Logo Section */}
      <div className="text-center mb-8 mt-8 p-4">
        <Logo />
      </div>

      {/* MeanSide Component */}
      <MeanSide closeSidebar={closeSidebar} />
    </aside>
  );
};

export default Sidebar;
