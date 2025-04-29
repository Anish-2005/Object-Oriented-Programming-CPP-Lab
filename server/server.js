require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const History = require('./models/History');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: true,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  maxAge: 86400 // cache preflight response for 1 day
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Schema Definitions
const problemSchema = new mongoose.Schema({
  question: String,
  code: String,
  output: String
}, { _id: false });

const architectureProblemSchema = new mongoose.Schema({
  question: String,
  moduleCode: String,
  testBenchCode: String
}, { _id: false });

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

// Models
const Assignment = mongoose.model('Assignment', assignmentSchema);
const CAssignment = mongoose.model('CAssignment', assignmentSchema);
const ArchitectureAssignment = mongoose.model('ArchitectureAssignment', architectureAssignmentSchema);
const PythonAssignment = mongoose.model('PythonAssignment', assignmentSchema);
const DSAAssignment = mongoose.model('DSAAssignment', assignmentSchema);

// Response Helpers
const respond = {
  success: (res, data, status = 200) => res.status(status).json({ success: true, data }),
  error: (res, message, status = 400, details = null) => {
    const response = { success: false, message };
    if (details && process.env.NODE_ENV !== 'production') response.details = details;
    res.status(status).json(response);
  }
};

// Routes
const router = express.Router();

function asyncHandler(fn) {
  return (req, res) => fn(req, res).catch(err => respond.error(res, err.message, 500, err));
}

// Architecture Assignment Routes
router.route('/architecture-assignments')
  .get(asyncHandler(async (req, res) => {
    const assignments = await ArchitectureAssignment.find().sort({ createdAt: -1 }).lean();
    respond.success(res, assignments);
  }))
  .post(asyncHandler(async (req, res) => {
    const { title, programs = [], icon = 'FaMicrochip' } = req.body;
    if (!title || !programs.length) {
      return respond.error(res, 'Title and at least one program are required');
    }

    const validPrograms = programs.map(({ question, moduleCode, testBenchCode }) => {
      if (!question || !moduleCode || !testBenchCode) {
        throw new Error('Each program must have question, moduleCode, and testBenchCode');
      }
      return { question, moduleCode, testBenchCode };
    });

    const newAssignment = new ArchitectureAssignment({ title, icon, programs: validPrograms });
    const saved = await newAssignment.save();
    respond.success(res, saved, 201);
  }));

router.route('/architecture-assignments/:id')
  .get(asyncHandler(async (req, res) => {
    const doc = await ArchitectureAssignment.findById(req.params.id).lean();
    if (!doc) return respond.error(res, 'Not found', 404);
    respond.success(res, doc);
  }))
  .put(asyncHandler(async (req, res) => {
    const updated = await ArchitectureAssignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!updated) return respond.error(res, 'Not found', 404);
    respond.success(res, updated);
  }))
  .delete(asyncHandler(async (req, res) => {
    const deleted = await ArchitectureAssignment.findByIdAndDelete(req.params.id);
    if (!deleted) return respond.error(res, 'Not found', 404);
    respond.success(res, { message: 'Deleted successfully' });
  }));

// OOP / C++ / Python Routes (same structure)
const genericRoutes = (model, name) => {
  const plural = name.toLowerCase().replace(/\s/g, '-') + 's';

  router.route(`/${plural}`)
    .get(asyncHandler(async (req, res) => {
      const docs = await model.find().sort({ createdAt: -1 }).lean();
      respond.success(res, docs);
    }))
    .post(asyncHandler(async (req, res) => {
      const { title, problems = [], icon } = req.body;
      if (!title || !problems.length) return respond.error(res, 'Title and problems required');
      const validProblems = problems.map(p => {
        if (!p.question || !p.code || !p.output) throw new Error('Invalid problem');
        return p;
      });
      const newDoc = new model({ title, icon: icon || 'FaPython', problems: validProblems });
      const saved = await newDoc.save();
      respond.success(res, saved, 201);
    }));

  router.route(`/${plural}/:id`)
    .get(asyncHandler(async (req, res) => {
      const doc = await model.findById(req.params.id).lean();
      if (!doc) return respond.error(res, 'Not found', 404);
      respond.success(res, doc);
    }))
    .put(asyncHandler(async (req, res) => {
      const updated = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      }).lean();
      if (!updated) return respond.error(res, 'Not found', 404);
      respond.success(res, updated);
    }))
    .delete(asyncHandler(async (req, res) => {
      const deleted = await model.findByIdAndDelete(req.params.id);
      if (!deleted) return respond.error(res, 'Not found', 404);
      respond.success(res, { message: 'Deleted successfully' });
    }));
};

genericRoutes(Assignment, 'Assignment');
genericRoutes(CAssignment, 'C Assignment');
genericRoutes(PythonAssignment, 'Python Assignment');
genericRoutes(DSAAssignment, 'DSA Assignment');


app.use('/api', router);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});
// Save history endpoint
app.post('/api/history', async (req, res) => {
  try {
    const { code, output, errors, language } = req.body;
    
    const newHistory = new History({
      code,
      output,
      errors,
      language
    });

    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ message: 'Error saving history' });
  }
});

// Get history endpoint
app.get('/api/history', async (req, res) => {
  try {
    const history = await History.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
});
// 404
app.use((req, res) => {
  respond.error(res, 'Endpoint not found', 404);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  respond.error(res, 'Internal Server Error', 500, err.stack);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || 'development'}`);
});
