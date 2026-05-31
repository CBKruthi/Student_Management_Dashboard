require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Counter = require('./models/Counter');
const Category = require('./models/Category');
const Program = require('./models/Program');
const Course = require('./models/Course');
const Student = require('./models/Student');
const connectDB = require('./config/db');

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany();
    await Counter.deleteMany();
    await Category.deleteMany();
    await Program.deleteMany();
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

    // 3. Seed Hierarchy
    const catTech = await Category.create({ name: 'Technical' });
    const catMgmt = await Category.create({ name: 'Management' });

    const progBTech = await Program.create({ name: 'B.Tech', category: catTech._id });
    const progBE = await Program.create({ name: 'B.E.', category: catTech._id });
    const progMBA = await Program.create({ name: 'MBA', category: catMgmt._id });

    await Course.insertMany([
      { name: 'CSE', program: progBTech._id },
      { name: 'ECE', program: progBTech._id },
      { name: 'Mechanical', program: progBE._id },
      { name: 'Finance', program: progMBA._id },
      { name: 'Marketing', program: progMBA._id },
    ]);

    console.log('Data Imported successfully (3-Tier Hierarchy Seeded)');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
