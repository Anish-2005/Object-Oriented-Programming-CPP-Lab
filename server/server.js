require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Schemas
const problemSchema = new mongoose.Schema({
  question: String,
  code: String,
  output: String
});

const architectureProblemSchema = new mongoose.Schema({
  question: String,
  moduleCode: String,
  rtlImage: String, // Base64 encoded image or URL
  testBenchCode: String,
  waveformImage: String // Base64 encoded image or URL
});

const assignmentSchema = new mongoose.Schema({
  title: String,
  icon: String,
  problems: [problemSchema],
  createdAt: { type: Date, default: Date.now }
});

const architectureAssignmentSchema = new mongoose.Schema({
  title: String,
  icon: String,
  programs: [architectureProblemSchema],
  createdAt: { type: Date, default: Date.now }
});

// Create models for different assignment types
const Assignment = mongoose.model('Assignment', assignmentSchema);
const CAssignment = mongoose.model('CAssignment', assignmentSchema);
const ArchitectureAssignment = mongoose.model('ArchitectureAssignment', architectureAssignmentSchema);

// Routes for OOP Assignments
app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/assignments', async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json({ success: true, data: savedAssignment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/assignments/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Routes for C Programming Assignments
app.get('/api/c-assignments', async (req, res) => {
  try {
    const assignments = await CAssignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/c-assignments', async (req, res) => {
  try {
    const newAssignment = new CAssignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json({ success: true, data: savedAssignment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/c-assignments/:id', async (req, res) => {
  try {
    await CAssignment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'C Assignment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Routes for Computer Architecture Assignments
app.get('/api/architecture-assignments', async (req, res) => {
  try {
    const assignments = await ArchitectureAssignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/architecture-assignments/:id', async (req, res) => {
  try {
    const assignment = await ArchitectureAssignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }
    res.json({ success: true, data: assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/architecture-assignments', async (req, res) => {
  try {
    const newAssignment = new ArchitectureAssignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json({ success: true, data: savedAssignment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/architecture-assignments/:id', async (req, res) => {
  try {
    const updatedAssignment = await ArchitectureAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAssignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }
    res.json({ success: true, data: updatedAssignment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/architecture-assignments/:id', async (req, res) => {
  try {
    await ArchitectureAssignment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Architecture Assignment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));