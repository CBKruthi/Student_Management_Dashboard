import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'sonner';
import { ChevronRight, Plus, Trash2, Layers, BookOpen, GraduationCap } from 'lucide-react';

const AcademicStructure = () => {
  const [data, setData] = useState({ categories: [], programs: [], courses: [] });
  const [loading, setLoading] = useState(true);

  // Selection State (Miller Columns)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Forms State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [programName, setProgramName] = useState('');

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseName, setCourseName] = useState('');

  const fetchHierarchy = async () => {
    try {
      setLoading(true);
      const res = await api.get('/academic');
      setData(res.data);
    } catch (error) {
      toast.error('Failed to load academic structure');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHierarchy();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await api.post('/academic/categories', { name: categoryName });
      toast.success('Category created');
      setCategoryName('');
      setIsAddingCategory(false);
      fetchHierarchy();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create category');
    }
  };

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    if (!selectedCategory) return;
    try {
      await api.post('/academic/programs', { name: programName, category: selectedCategory });
      toast.success('Program created');
      setProgramName('');
      setIsAddingProgram(false);
      fetchHierarchy();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create program');
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!selectedProgram) return;
    try {
      await api.post('/academic/courses', { name: courseName, program: selectedProgram });
      toast.success('Course created');
      setCourseName('');
      setIsAddingCourse(false);
      fetchHierarchy();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    }
  };

  const handleDelete = async (type, id, e) => {
    e.stopPropagation(); // Prevent selection when deleting
    if (!window.confirm(`Delete this ${type}? This may fail if it has active dependencies.`)) return;
    
    try {
      await api.delete(`/academic/${type}s/${id}`);
      toast.success(`${type} deleted`);
      
      // Clear selections if the deleted item was selected
      if (type === 'categorie' && selectedCategory === id) {
        setSelectedCategory(null);
        setSelectedProgram(null);
      }
      if (type === 'program' && selectedProgram === id) {
        setSelectedProgram(null);
      }
      
      fetchHierarchy();
    } catch (error) {
      toast.error(`Failed to delete ${type}`);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Filtered Lists for Columns
  const visiblePrograms = data.programs.filter(p => (p.category?._id || p.category) === selectedCategory);
  const visibleCourses = data.courses.filter(c => (c.program?._id || c.program) === selectedProgram);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Academic Structure</h1>
        <p className="mt-1 text-sm text-slate-500">
          Navigate and manage your institution's taxonomy. Select a Category to view Programs, and a Program to view Courses.
        </p>
      </div>

      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm flex overflow-hidden">
        
        {/* COLUMN 1: CATEGORIES */}
        <div className="w-1/3 flex flex-col border-r border-slate-200 bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <Layers className="text-blue-500" size={18} />
              <h2 className="text-sm font-semibold text-slate-800">Categories</h2>
            </div>
            <button 
              onClick={() => setIsAddingCategory(!isAddingCategory)}
              className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          
          {isAddingCategory && (
            <div className="p-3 bg-blue-50/50 border-b border-slate-200">
              <form onSubmit={handleCreateCategory} className="flex gap-2">
                <input
                  type="text"
                  required
                  autoFocus
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="block w-full rounded border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="New Category..."
                />
                <button type="submit" className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-500">
                  Save
                </button>
              </form>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2">
            {data.categories.length === 0 && !isAddingCategory && (
              <p className="text-sm text-slate-500 text-center mt-6">No categories found.</p>
            )}
            <ul className="space-y-1">
              {data.categories.map(c => (
                <li key={c._id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(c._id);
                      setSelectedProgram(null);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex justify-between items-center group transition-colors ${
                      selectedCategory === c._id ? 'bg-blue-100 text-blue-900 font-medium' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{c.name}</span>
                    <div className="flex items-center gap-2">
                      <Trash2 
                        size={14} 
                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedCategory === c._id ? 'text-blue-400 hover:text-blue-600' : 'text-slate-400 hover:text-red-500'}`}
                        onClick={(e) => handleDelete('categorie', c._id, e)}
                      />
                      <ChevronRight size={16} className={selectedCategory === c._id ? 'text-blue-600' : 'text-slate-400'} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COLUMN 2: PROGRAMS */}
        <div className="w-1/3 flex flex-col border-r border-slate-200 bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-purple-500" size={18} />
              <h2 className="text-sm font-semibold text-slate-800">Programs</h2>
            </div>
            {selectedCategory && (
              <button 
                onClick={() => setIsAddingProgram(!isAddingProgram)}
                className="p-1 rounded text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              >
                <Plus size={18} />
              </button>
            )}
          </div>

          {!selectedCategory ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <p className="text-sm text-slate-400">Select a Category to view Programs</p>
            </div>
          ) : (
            <>
              {isAddingProgram && (
                <div className="p-3 bg-purple-50/50 border-b border-slate-200">
                  <form onSubmit={handleCreateProgram} className="flex gap-2">
                    <input
                      type="text"
                      required
                      autoFocus
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value)}
                      className="block w-full rounded border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                      placeholder="New Program..."
                    />
                    <button type="submit" className="rounded bg-purple-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-purple-500">
                      Save
                    </button>
                  </form>
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-2">
                {visiblePrograms.length === 0 && !isAddingProgram && (
                  <p className="text-sm text-slate-500 text-center mt-6">No programs found.</p>
                )}
                <ul className="space-y-1">
                  {visiblePrograms.map(p => (
                    <li key={p._id}>
                      <button
                        onClick={() => setSelectedProgram(p._id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex justify-between items-center group transition-colors ${
                          selectedProgram === p._id ? 'bg-purple-100 text-purple-900 font-medium' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{p.name}</span>
                        <div className="flex items-center gap-2">
                          <Trash2 
                            size={14} 
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedProgram === p._id ? 'text-purple-400 hover:text-purple-600' : 'text-slate-400 hover:text-red-500'}`}
                            onClick={(e) => handleDelete('program', p._id, e)}
                          />
                          <ChevronRight size={16} className={selectedProgram === p._id ? 'text-purple-600' : 'text-slate-400'} />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* COLUMN 3: COURSES */}
        <div className="w-1/3 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <BookOpen className="text-teal-500" size={18} />
              <h2 className="text-sm font-semibold text-slate-800">Courses / Branches</h2>
            </div>
            {selectedProgram && (
              <button 
                onClick={() => setIsAddingCourse(!isAddingCourse)}
                className="p-1 rounded text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
              >
                <Plus size={18} />
              </button>
            )}
          </div>

          {!selectedProgram ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <p className="text-sm text-slate-400">Select a Program to view Courses</p>
            </div>
          ) : (
            <>
              {isAddingCourse && (
                <div className="p-3 bg-teal-50/50 border-b border-slate-200">
                  <form onSubmit={handleCreateCourse} className="flex gap-2">
                    <input
                      type="text"
                      required
                      autoFocus
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      className="block w-full rounded border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm"
                      placeholder="New Course..."
                    />
                    <button type="submit" className="rounded bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-500">
                      Save
                    </button>
                  </form>
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-2">
                {visibleCourses.length === 0 && !isAddingCourse && (
                  <p className="text-sm text-slate-500 text-center mt-6">No courses found.</p>
                )}
                <ul className="space-y-1">
                  {visibleCourses.map(c => (
                    <li key={c._id} className="flex justify-between items-center px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 group transition-colors">
                      <span className="font-medium text-slate-700">{c.name}</span>
                      <Trash2 
                        size={14} 
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity cursor-pointer"
                        onClick={(e) => handleDelete('course', c._id, e)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AcademicStructure;
