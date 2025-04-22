require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs', {
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

// CORS Configuration
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simplified Schemas
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

const architectureAssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  programs: { type: [architectureProblemSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

// Models
const Assignment = mongoose.model('Assignment', assignmentSchema);
const CAssignment = mongoose.model('CAssignment', assignmentSchema);
const ArchitectureAssignment = mongoose.model('ArchitectureAssignment', architectureAssignmentSchema);

// Response Helpers
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

// API Routes
const router = express.Router();

// Architecture Assignments
router.route('/architecture-assignments')
  .get(async (req, res) => {
    try {
      const assignments = await ArchitectureAssignment.find().sort({ createdAt: -1 });
      respond.success(res, assignments);
    } catch (err) {
      respond.error(res, 'Failed to fetch architecture assignments', 500, err);
    }
  })
  .post(async (req, res) => {
    try {
      // Validate required fields
      if (!req.body.title || !req.body.programs?.length) {
        return respond.error(res, 'Title and at least one program are required', 400);
      }

      // Validate each program
      const validatedPrograms = req.body.programs.map(program => {
        if (!program.question || !program.moduleCode || !program.testBenchCode) {
          throw new Error('All programs must have question, module code, and test bench code');
        }
        return {
          question: program.question,
          moduleCode: program.moduleCode,
          testBenchCode: program.testBenchCode
        };
      });

      const newAssignment = new ArchitectureAssignment({
        title: req.body.title,
        icon: req.body.icon || 'FaMicrochip',
        programs: validatedPrograms
      });

      const savedAssignment = await newAssignment.save();
      respond.success(res, savedAssignment, 201);
    } catch (err) {
      respond.error(res, err.message || 'Failed to create architecture assignment', 500, err);
    }
  });

router.route('/architecture-assignments/:id')
  .get(async (req, res) => {
    try {
      const assignment = await ArchitectureAssignment.findById(req.params.id);
      if (!assignment) {
        return respond.error(res, 'Architecture assignment not found', 404);
      }
      respond.success(res, assignment);
    } catch (err) {
      respond.error(res, 'Failed to fetch architecture assignment', 500, err);
    }
  })
  .put(async (req, res) => {
    try {
      const updatedAssignment = await ArchitectureAssignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAssignment) {
        return respond.error(res, 'Architecture assignment not found', 404);
      }
      respond.success(res, updatedAssignment);
    } catch (err) {
      respond.error(res, 'Failed to update architecture assignment', 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const assignment = await ArchitectureAssignment.findByIdAndDelete(req.params.id);
      if (!assignment) {
        return respond.error(res, 'Architecture assignment not found', 404);
      }
      respond.success(res, { message: 'Architecture assignment deleted successfully' });
    } catch (err) {
      respond.error(res, 'Failed to delete architecture assignment', 500, err);
    }
  });

// OOP Assignments (kept for completeness)
router.route('/assignments')
  .get(async (req, res) => {
    try {
      const assignments = await Assignment.find().sort({ createdAt: -1 });
      respond.success(res, assignments);
    } catch (err) {
      respond.error(res, 'Failed to fetch OOP assignments', 500, err);
    }
  });

// C++ Assignments (kept for completeness)
router.route('/c-assignments')
  .get(async (req, res) => {
    try {
      const assignments = await CAssignment.find().sort({ createdAt: -1 });
      respond.success(res, assignments);
    } catch (err) {
      respond.error(res, 'Failed to fetch C++ assignments', 500, err);
    }
  });

app.use('/api', router);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 Handler
app.use((req, res) => {
  respond.error(res, 'Endpoint not found', 404);
});

// Error Handler
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