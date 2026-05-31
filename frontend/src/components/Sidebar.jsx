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
          <div className="p-2 bg-blue-100 rounded-xl mr-3 text-blue-600">
            <ShieldCheck size={24} strokeWidth={2} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Admin<span className="text-blue-600">Portal</span></span>
        </div>
        
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-2 bg-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Users className="mr-3 h-5 w-5 flex-shrink-0" />
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
