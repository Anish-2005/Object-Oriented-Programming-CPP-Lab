require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Database Connection (existing)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs?retryWrites=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// CORS Configuration (existing)
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Schemas (existing)
const problemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  code: { type: String, required: true },
  output: { type: String, required: true }
}, { _id: false });

const architectureProblemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  moduleCode: { type: String, required: true },
  testBenchCode: { type: String, required: true }
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  problems: { type: [problemSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

// Models (updated with Python assignments)
const Assignment = mongoose.model('Assignment', assignmentSchema);
const CAssignment = mongoose.model('CAssignment', assignmentSchema);
const PythonAssignment = mongoose.model('PythonAssignment', assignmentSchema); // New model
const ArchitectureAssignment = mongoose.model('ArchitectureAssignment', architectureAssignmentSchema);

// Response Helpers (existing)
const respond = {
  success: (res, data, status = 200) => {
    res.status(status).json({ success: true, data });
  },
  error: (res, message, status = 400, details = null) => {
    const response = { success: false, message };
    if (details && process.env.NODE_ENV !== 'production') {
      response.details = details;
    }
    res.status(status).json(response);
  }
};

// API Routes (updated with Python endpoints)
const router = express.Router();

// ====== Python Assignments Endpoints ======
router.route('/python-assignments')
  .get(async (req, res) => {
    try {
      const assignments = await PythonAssignment.find().sort({ createdAt: -1 });
      respond.success(res, assignments);
    } catch (err) {
      respond.error(res, 'Failed to fetch Python assignments', 500, err);
    }
  })
  .post(async (req, res) => {
    try {
      if (!req.body.title || !req.body.problems?.length) {
        return respond.error(res, 'Title and at least one problem are required', 400);
      }

      const validatedProblems = req.body.problems.map(problem => {
        if (!problem.question || !problem.code || !problem.output) {
          throw new Error('All problems must have question, code, and output');
        }
        return {
          question: problem.question,
          code: problem.code,
          output: problem.output
        };
      });

      const newAssignment = new PythonAssignment({
        title: req.body.title,
        icon: req.body.icon || 'FaPython',
        problems: validatedProblems
      });

      const savedAssignment = await newAssignment.save();
      respond.success(res, savedAssignment, 201);
    } catch (err) {
      respond.error(res, err.message || 'Failed to create Python assignment', 500, err);
    }
  });

router.route('/python-assignments/:id')
  .get(async (req, res) => {
    try {
      const assignment = await PythonAssignment.findById(req.params.id);
      if (!assignment) {
        return respond.error(res, 'Python assignment not found', 404);
      }
      respond.success(res, assignment);
    } catch (err) {
      respond.error(res, 'Failed to fetch Python assignment', 500, err);
    }
  })
  .put(async (req, res) => {
    try {
      const updatedAssignment = await PythonAssignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAssignment) {
        return respond.error(res, 'Python assignment not found', 404);
      }
      respond.success(res, updatedAssignment);
    } catch (err) {
      respond.error(res, 'Failed to update Python assignment', 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const assignment = await PythonAssignment.findByIdAndDelete(req.params.id);
      if (!assignment) {
        return respond.error(res, 'Python assignment not found', 404);
      }
      respond.success(res, { message: 'Python assignment deleted successfully' });
    } catch (err) {
      respond.error(res, 'Failed to delete Python assignment', 500, err);
    }
  });

// ====== Existing Routes ======
// Architecture Assignments (existing)
// OOP Assignments (existing)
// C++ Assignments (existing)

app.use('/api', router);

// Health Check (existing)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 Handler (existing)
app.use((req, res) => {
  respond.error(res, 'Endpoint not found', 404);
});

// Error Handler (existing)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  respond.error(res, 'Internal server error', 500, 
    process.env.NODE_ENV !== 'production' ? err.stack : null);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = server;