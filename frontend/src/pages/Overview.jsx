import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Users, BookOpen, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const COLORS = ['#000000', '#334155', '#64748b', '#94a3b8', '#cbd5e1'];

const Overview = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get('/analytics/summary');
        setAnalytics(data);
      } catch (error) {
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Key metrics and distribution for your organization.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white px-6 py-5 border border-slate-200 rounded flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Students</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{analytics?.metrics.totalStudents}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded">
            <Users className="text-slate-600" size={24} />
          </div>
        </div>
        <div className="bg-white px-6 py-5 border border-slate-200 rounded flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Departments</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{analytics?.metrics.totalDepartments}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded">
            <Building2 className="text-slate-600" size={24} />
          </div>
        </div>
        <div className="bg-white px-6 py-5 border border-slate-200 rounded flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Courses</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{analytics?.metrics.totalCourses}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded">
            <BookOpen className="text-slate-600" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution (Pie Chart) */}
        <div className="bg-white p-6 border border-slate-200 rounded">
          <h3 className="text-sm font-medium text-slate-900 mb-6">Student Distribution by Department</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {analytics?.departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Distribution (Bar Chart) */}
        <div className="bg-white p-6 border border-slate-200 rounded">
          <h3 className="text-sm font-medium text-slate-900 mb-6">Enrollment by Course</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.courseDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                />
                <Bar dataKey="count" fill="#000000" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-medium text-slate-900">Recent Enrollments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <tbody className="divide-y divide-slate-200">
              {analytics?.recentStudents.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-500 text-center">No students found.</td>
                </tr>
              ) : (
                analytics?.recentStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{student.fullName}</div>
                      <div className="text-xs text-slate-500">{student.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-slate-900">{student.course?.name || 'N/A'}</div>
                      <div className="text-xs text-slate-500">{student.department?.name || 'N/A'}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
