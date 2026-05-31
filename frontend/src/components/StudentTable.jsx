import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const StudentTable = ({ students, onEdit, onDelete }) => {
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded border border-slate-200 border-dashed">
        <h3 className="text-sm font-semibold text-slate-900">No students found</h3>
        <p className="mt-1 text-sm text-slate-500">Get started by adding a new student to the registry.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border border-slate-200 rounded">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-slate-900 sm:pl-6">Student ID</th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900">Name</th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900">Contact</th>
            <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-900">Department</th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {students.map((student) => (
            <tr key={student._id} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                <span className="inline-flex items-center rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800 border border-slate-200">
                  {student.studentId}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-700">{student.fullName}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                <div className="text-slate-900">{student.emailId}</div>
                <div className="text-xs">{student.phoneNumber}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                <div className="text-slate-900">{student.department?.name || 'N/A'}</div>
                <div className="text-xs">{student.course?.name || 'N/A'}</div>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button
                  onClick={() => onEdit(student)}
                  className="text-slate-600 hover:text-black p-1 rounded hover:bg-slate-100 transition-colors mr-2"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this student?')) {
                      onDelete(student._id);
                    }
                  }}
                  className="text-slate-600 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
