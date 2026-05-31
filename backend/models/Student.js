const mongoose = require('mongoose');
const Counter = require('./Counter');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, 'Please add a full name'],
  },
  emailId: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required'],
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  }
}, {
  timestamps: true,
});

// Create Text Indexes for search
studentSchema.index({ studentId: 'text', fullName: 'text' });

// Auto-increment studentId
studentSchema.pre('save', async function () {
  const doc = this;
  if (doc.isNew && !doc.studentId) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'studentId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.studentId = `STU-${counter.seq}`;
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
