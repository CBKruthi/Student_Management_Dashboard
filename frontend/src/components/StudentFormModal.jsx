import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../api/axios';

const StudentFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    phoneNumber: '',
    category: '',
    program: '',
    course: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [hierarchy, setHierarchy] = useState({ categories: [], programs: [], courses: [] });

  useEffect(() => {
    api.get('/academic').then((res) => {
      setHierarchy(res.data);
    });
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        category: initialData.category?._id || initialData.category || '',
        program: initialData.program?._id || initialData.program || '',
        course: initialData.course?._id || initialData.course || '',
      });
    } else {
      setFormData({
        fullName: '',
        emailId: '',
        phoneNumber: '',
        category: '',
        program: '',
        course: '',
        address: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Cascade resets
      if (name === 'category') {
        updated.program = '';
        updated.course = '';
      }
      if (name === 'program') {
        updated.course = '';
      }
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Phone Number must contain at least 10 digits';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.program) newErrors.program = 'Program is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.address?.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Filter dropdowns based on selections
  const availablePrograms = hierarchy.programs.filter(p => p.category?._id === formData.category || p.category === formData.category);
  const availableCourses = hierarchy.courses.filter(c => c.program?._id === formData.program || c.program === formData.program);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800">
            {initialData ? 'Edit Student' : 'Add New Student'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.fullName ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-300 focus:ring-blue-500'} sm:text-sm`} />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.emailId ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-300 focus:ring-blue-500'} sm:text-sm`} />
              {errors.emailId && <p className="mt-1 text-xs text-red-600">{errors.emailId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.phoneNumber ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-300 focus:ring-blue-500'} sm:text-sm`} />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
            </div>

            <div className="sm:col-span-2 border-t border-slate-100 pt-4 mt-2">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Academic Path</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className={`block w-full rounded border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ${errors.category ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-300 focus:ring-blue-500'} sm:text-sm`}>
                    <option value="">Select...</option>
                    {hierarchy.categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                  {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Program</label>
                  <select name="program" value={formData.program} onChange={handleChange} disabled={!formData.category} className={`block w-full rounded border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ${errors.program ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-300 focus:ring-blue-500'} sm:text-sm disabled:bg-slate-50 disabled:text-slate-400`}>
                    <option value="">Select...</option>
                    {availablePrograms.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                  {errors.program && <p className="mt-1 text-xs text-red-600">{errors.program}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Course / Branch</label>
                  <select name="course" value={formData.course} onChange={handleChange} disabled={!formData.program} className={`block w-full rounded border-0 py-2 px-3 text-slate-900 ring-1 ring-inset ${errors.course ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-300 focus:ring-blue-500'} sm:text-sm disabled:bg-slate-50 disabled:text-slate-400`}>
                    <option value="">Select...</option>
                    {availableCourses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                  {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course}</p>}
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 pt-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea name="address" rows={2} value={formData.address} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.address ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-300 focus:ring-blue-500'} sm:text-sm`} />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="rounded px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="rounded bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
              {initialData ? 'Save Changes' : 'Create Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
