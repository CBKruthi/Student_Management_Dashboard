const express = require('express');
const router = express.Router();
const {
  getHierarchy,
  createCategory,
  deleteCategory,
  createProgram,
  deleteProgram,
  createCourse,
  deleteCourse
} = require('../controllers/academicController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getHierarchy);

router.route('/categories')
  .post(protect, createCategory);
router.route('/categories/:id')
  .delete(protect, deleteCategory);

router.route('/programs')
  .post(protect, createProgram);
router.route('/programs/:id')
  .delete(protect, deleteProgram);

router.route('/courses')
  .post(protect, createCourse);
router.route('/courses/:id')
  .delete(protect, deleteCourse);

module.exports = router;
