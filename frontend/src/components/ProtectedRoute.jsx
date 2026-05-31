import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const ProtectedRoute = () => {
  const { adminInfo } = useAuth();

  // If not logged in, boot to login page
  if (!adminInfo) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the Dashboard Shell
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
