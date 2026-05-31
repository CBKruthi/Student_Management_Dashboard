const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config({ path: '../.env' });
connectDB();

const importData = async () => {
  try {
    await Admin.deleteMany(); // Clear existing admins

    // Create default master admin
    const masterAdmin = new Admin({
      email: 'admin@example.com',
      password: 'password123',
    });

    await masterAdmin.save();

    console.log('Master Admin Seeded! (admin@example.com / password123)');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
