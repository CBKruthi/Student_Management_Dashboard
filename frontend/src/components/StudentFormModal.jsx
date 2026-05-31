import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const StudentFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    phoneNumber: '',
    course: '',
    department: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    import('../api/axios').then((module) => {
      const api = module.default;
      api.get('/options/departments').then((res) => setDepartments(res.data));
      api.get('/options/courses').then((res) => setCourses(res.data));
    });
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        fullName: '',
        emailId: '',
        phoneNumber: '',
        course: '',
        department: '',
        address: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
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
    if (!formData.course?.trim()) newErrors.course = 'Course is required';
    if (!formData.department?.trim()) newErrors.department = 'Department is required';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded border border-slate-200 w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-black">
            {initialData ? 'Edit Student' : 'Add New Student'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-500 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.fullName ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-200 focus:ring-black'} placeholder:text-slate-400 focus:ring-1 focus:ring-inset sm:text-sm transition-all`} />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email ID</label>
            <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.emailId ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-200 focus:ring-black'} placeholder:text-slate-400 focus:ring-1 focus:ring-inset sm:text-sm transition-all`} />
            {errors.emailId && <p className="mt-1 text-xs text-red-600">{errors.emailId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.phoneNumber ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-200 focus:ring-black'} placeholder:text-slate-400 focus:ring-1 focus:ring-inset sm:text-sm transition-all`} />
            {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <select name="department" value={formData.department?._id || formData.department} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.department ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-200 focus:ring-black'} sm:text-sm transition-all`}>
                <option value="">Select Department</option>
                {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
              {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
              <select name="course" value={formData.course?._id || formData.course} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.course ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-200 focus:ring-black'} sm:text-sm transition-all`}>
                <option value="">Select Course</option>
                {courses.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <textarea name="address" rows="3" value={formData.address} onChange={handleChange} className={`block w-full rounded border-0 py-2.5 px-3 text-slate-900 ring-1 ring-inset ${errors.address ? 'ring-red-300 focus:ring-red-600' : 'ring-slate-200 focus:ring-black'} placeholder:text-slate-400 focus:ring-1 focus:ring-inset sm:text-sm transition-all`} />
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded hover:bg-slate-800 transition-all">
              {initialData ? 'Update Student' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
