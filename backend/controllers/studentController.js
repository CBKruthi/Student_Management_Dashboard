const Student = require('../models/Student');

// @desc    Get all students (with optional keyword search)
// @route   GET /api/students
// @access  Private (Admin)
const getStudents = async (req, res) => {
  const keyword = req.query.keyword;
  
  let query = {};
  if (keyword) {
    query = {
      $or: [
        { fullName: { $regex: keyword, $options: 'i' } },
        { emailId: { $regex: keyword, $options: 'i' } },
        { studentId: { $regex: keyword, $options: 'i' } }
      ]
    };
  }

  try {
    const students = await Student.find(query)
      .populate('category', 'name')
      .populate('program', 'name')
      .populate('course', 'name')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching students' });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private (Admin)
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('category', 'name')
      .populate('program', 'name')
      .populate('course', 'name');
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching student' });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Private (Admin)
const addStudent = async (req, res) => {
  const { fullName, emailId, phoneNumber, course, program, category, address } = req.body;

  try {
    const student = new Student({
      fullName,
      emailId,
      phoneNumber,
      course,
      program,
      category,
      address,
    });

    const createdStudent = await student.save();
    res.status(201).json(createdStudent);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Invalid student data' });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private (Admin)
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      student.fullName = req.body.fullName || student.fullName;
      student.emailId = req.body.emailId || student.emailId;
      student.phoneNumber = req.body.phoneNumber || student.phoneNumber;
      student.course = req.body.course || student.course;
      student.program = req.body.program || student.program;
      student.category = req.body.category || student.category;
      student.address = req.body.address || student.address;

      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error updating student' });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      await student.deleteOne();
      res.json({ message: 'Student removed' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student' });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
