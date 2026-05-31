require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Counter = require('./models/Counter');
const Department = require('./models/Department');
const Course = require('./models/Course');
const Student = require('./models/Student');
const connectDB = require('./config/db');

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data to prevent duplicates
    await Admin.deleteMany();
    await Counter.deleteMany();
    await Department.deleteMany();
    await Course.deleteMany();
    await Student.deleteMany();

    // 1. Seed Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    await Admin.create({
      fullName: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    });

    // 2. Initialize Counter
    await Counter.create({ _id: 'studentId', seq: 1000 });

    // 3. Seed Departments
    const deptEngineering = await Department.create({ name: 'Engineering' });
    const deptScience = await Department.create({ name: 'Science' });
    const deptBusiness = await Department.create({ name: 'Business' });

    // 4. Seed Courses
    await Course.insertMany([
      { name: 'B.Tech CSE', department: deptEngineering._id },
      { name: 'B.Tech ECE', department: deptEngineering._id },
      { name: 'B.Sc Physics', department: deptScience._id },
      { name: 'BBA', department: deptBusiness._id },
      { name: 'MBA', department: deptBusiness._id },
    ]);

    console.log('Data Imported successfully (Admin, Departments, Courses)');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
