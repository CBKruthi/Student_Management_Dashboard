import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, adminInfo } = useAuth();

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
        
        <div className="flex-shrink-0 border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {adminInfo?.fullName ? adminInfo.fullName.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">
                {adminInfo?.fullName || 'Administrator'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {adminInfo?.email || 'admin@example.com'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full text-left block text-slate-600 hover:text-red-600 transition-colors duration-200 bg-slate-50 hover:bg-red-50 rounded-lg px-3 py-2 text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
