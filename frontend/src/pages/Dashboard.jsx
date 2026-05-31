import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import StudentTable from '../components/StudentTable';
import StudentFormModal from '../components/StudentFormModal';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async (keyword = '') => {
    try {
      setLoading(true);
      const { data } = await api.get(`/students${keyword ? `?keyword=${keyword}` : ''}`);
      setStudents(data);
    } catch (error) {
      toast.error('Failed to fetch students. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly
    const delayDebounceFn = setTimeout(() => {
      fetchStudents(searchTerm);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleOpenModal = (student = null) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await api.put(`/students/${editingStudent._id}`, formData);
        toast.success('Student updated successfully!');
      } else {
        await api.post('/students', formData);
        toast.success('Student added successfully!');
      }
      handleCloseModal();
      fetchStudents(searchTerm); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save student.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      toast.success('Student deleted.');
      fetchStudents(searchTerm); // Refresh list
    } catch (error) {
      toast.error('Failed to delete student.');
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Student Roster
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            A list of all the students in your institution including their name, department, and contact info.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 rounded bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-all"
          >
            <Plus size={18} />
            Add Student
          </button>
        </div>
      </div>

      <div className="mb-6 relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm transition-all"
          placeholder="Search by ID or Name..."
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-blue-600">
          <Loader2 size={32} className="animate-spin" />
        </div>
      ) : (
        <StudentTable 
          students={students} 
          onEdit={handleOpenModal} 
          onDelete={handleDelete} 
        />
      )}

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingStudent}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Dashboard;
