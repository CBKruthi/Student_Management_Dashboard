import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Overview from './pages/Overview';
import AcademicStructure from './pages/AcademicStructure';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Overview />} />
          <Route path="/students" element={<Dashboard />} />
          <Route path="/academic-structure" element={<AcademicStructure />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
