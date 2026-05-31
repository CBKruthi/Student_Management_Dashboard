const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Course = require('../models/Course');
const { protect } = require('../middleware/authMiddleware');

router.get('/departments', protect, async (req, res) => {
  const depts = await Department.find().sort({ name: 1 });
  res.json(depts);
});

router.get('/courses', protect, async (req, res) => {
  const courses = await Course.find().sort({ name: 1 });
  res.json(courses);
});

module.exports = router;
