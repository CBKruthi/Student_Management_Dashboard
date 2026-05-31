const Category = require('../models/Category');
const Program = require('../models/Program');
const Course = require('../models/Course');

// @desc    Get all academic hierarchy (Categories, Programs, Courses)
// @route   GET /api/academic
// @access  Private
const getHierarchy = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const programs = await Program.find().populate('category', 'name').sort({ name: 1 });
    const courses = await Course.find().populate('program', 'name').sort({ name: 1 });
    
    res.json({ categories, programs, courses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create Category
// @route   POST /api/academic/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete Category
// @route   DELETE /api/academic/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create Program
// @route   POST /api/academic/programs
// @access  Private
const createProgram = async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) return res.status(400).json({ message: 'Name and Category are required' });
    const program = await Program.create({ name, category });
    const populated = await program.populate('category', 'name');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete Program
// @route   DELETE /api/academic/programs/:id
// @access  Private
const deleteProgram = async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create Course
// @route   POST /api/academic/courses
// @access  Private
const createCourse = async (req, res) => {
  try {
    const { name, program } = req.body;
    if (!name || !program) return res.status(400).json({ message: 'Name and Program are required' });
    const course = await Course.create({ name, program });
    const populated = await course.populate('program', 'name');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete Course
// @route   DELETE /api/academic/courses/:id
// @access  Private
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getHierarchy,
  createCategory,
  deleteCategory,
  createProgram,
  deleteProgram,
  createCourse,
  deleteCourse
};
