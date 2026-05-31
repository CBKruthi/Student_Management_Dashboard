const Student = require('../models/Student');
const Department = require('../models/Department');
const Course = require('../models/Course');

// @desc    Get dashboard summary statistics
// @route   GET /api/analytics/summary
// @access  Private (Admin)
const getDashboardSummary = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalCourses = await Course.countDocuments();

    // Aggregate student count by department
    const departmentDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'departments',
          localField: '_id',
          foreignField: '_id',
          as: 'departmentInfo',
        },
      },
      {
        $unwind: '$departmentInfo',
      },
      {
        $project: {
          name: '$departmentInfo.name',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Aggregate student count by course
    const courseDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'courseInfo',
        },
      },
      {
        $unwind: '$courseInfo',
      },
      {
        $project: {
          name: '$courseInfo.name',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Get 5 most recent students
    const recentStudents = await Student.find()
      .populate('department', 'name')
      .populate('course', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      metrics: {
        totalStudents,
        totalDepartments,
        totalCourses,
      },
      departmentDistribution,
      courseDistribution,
      recentStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

module.exports = {
  getDashboardSummary,
};
