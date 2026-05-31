const Student = require('../models/Student');
const Category = require('../models/Category');
const Program = require('../models/Program');
const Course = require('../models/Course');

// @desc    Get dashboard summary statistics
// @route   GET /api/analytics/summary
// @access  Private (Admin)
const getDashboardSummary = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalPrograms = await Program.countDocuments();
    const totalCourses = await Course.countDocuments();

    // Aggregate student count by program
    const programDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$program',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'programs',
          localField: '_id',
          foreignField: '_id',
          as: 'programInfo',
        },
      },
      {
        $unwind: '$programInfo',
      },
      {
        $project: {
          name: '$programInfo.name',
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
      .populate('category', 'name')
      .populate('program', 'name')
      .populate('course', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      metrics: {
        totalStudents,
        totalCategories,
        totalPrograms,
        totalCourses,
      },
      programDistribution,
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
