import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-slate-200">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <span className="text-lg font-semibold text-black tracking-tight">AdminPortal</span>
        </div>
        
        <div className="mt-2 flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-1 bg-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 text-sm font-medium rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-100 text-black'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `block px-3 py-2 text-sm font-medium rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-100 text-black'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                }`
              }
            >
              Students
            </NavLink>
            <NavLink
              to="/academic-structure"
              className={({ isActive }) =>
                `block px-3 py-2 text-sm font-medium rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-100 text-black'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                }`
              }
            >
              Academic Structure
            </NavLink>
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-slate-200 p-4">
          <button
            onClick={logout}
            className="flex-shrink-0 w-full text-left block text-slate-600 hover:text-red-600 transition-colors duration-200"
          >
            <div className="px-3 py-2 text-sm font-medium">
              Sign Out
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
