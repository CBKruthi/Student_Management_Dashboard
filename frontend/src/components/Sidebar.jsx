import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, LogOut, ShieldCheck } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-slate-200">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="p-2 bg-black rounded mr-3 text-white">
            <ShieldCheck size={20} strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold text-black tracking-tight">AdminPortal</span>
        </div>
        
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-1 bg-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-100 text-black'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                }`
              }
            >
              <ShieldCheck className="mr-3 h-4 w-4 flex-shrink-0" />
              Overview
            </NavLink>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-100 text-black'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                }`
              }
            >
              <Users className="mr-3 h-4 w-4 flex-shrink-0" />
              Students
            </NavLink>
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-slate-200 p-4">
          <button
            onClick={logout}
            className="flex-shrink-0 w-full group block text-slate-600 hover:text-red-600 transition-colors duration-200"
          >
            <div className="flex items-center px-3 py-2 text-sm font-medium">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
