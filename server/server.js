require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// Schemas
const problemSchema = new mongoose.Schema({
  question: String,
  code: String,
  output: String
});

const architectureProblemSchema = new mongoose.Schema({
  question: String,
  moduleCode: String,
  rtlImage: String, // URL to uploaded image
  testBenchCode: String,
  waveformImage: String // URL to uploaded image
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

// Utility function to handle errors
const handleError = (res, err, status = 500) => {
  console.error(err);
  res.status(status).json({ 
    success: false, 
    message: err.message || 'Server error' 
  });
};

// File Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }
    
    // Construct the URL where the image can be accessed
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({ 
      success: true, 
      imageUrl 
    });
  } catch (err) {
    handleError(res, err);
  }
});

// Routes for OOP Assignments
app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (err) {
    handleError(res, err);
  }
});

app.post('/api/assignments', async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json({ success: true, data: savedAssignment });
  } catch (err) {
    handleError(res, err);
  }
});

app.delete('/api/assignments/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (err) {
    handleError(res, err);
  }
});

// Routes for C Programming Assignments
app.get('/api/c-assignments', async (req, res) => {
  try {
    const assignments = await CAssignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (err) {
    handleError(res, err);
  }
});

app.post('/api/c-assignments', async (req, res) => {
  try {
    const newAssignment = new CAssignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json({ success: true, data: savedAssignment });
  } catch (err) {
    handleError(res, err);
  }
});

app.delete('/api/c-assignments/:id', async (req, res) => {
  try {
    await CAssignment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'C Assignment deleted' });
  } catch (err) {
    handleError(res, err);
  }
});

// Routes for Computer Architecture Assignments
app.get('/api/architecture-assignments', async (req, res) => {
  try {
    const assignments = await ArchitectureAssignment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assignments });
  } catch (err) {
    handleError(res, err);
  }
});

app.get('/api/architecture-assignments/:id', async (req, res) => {
  try {
    const assignment = await ArchitectureAssignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Assignment not found' 
      });
    }
    res.json({ success: true, data: assignment });
  } catch (err) {
    handleError(res, err);
  }
});

app.post('/api/architecture-assignments', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.title || !req.body.programs || req.body.programs.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title and at least one program are required'
      });
    }

    const newAssignment = new ArchitectureAssignment(req.body);
    const savedAssignment = await newAssignment.save();
    res.status(201).json({ success: true, data: savedAssignment });
  } catch (err) {
    handleError(res, err);
  }
});

app.put('/api/architecture-assignments/:id', async (req, res) => {
  try {
    const updatedAssignment = await ArchitectureAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAssignment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Assignment not found' 
      });
    }
    res.json({ success: true, data: updatedAssignment });
  } catch (err) {
    handleError(res, err);
  }
});

app.delete('/api/architecture-assignments/:id', async (req, res) => {
  try {
    const assignment = await ArchitectureAssignment.findByIdAndDelete(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Assignment not found' 
      });
    }

    // Delete associated images
    const deleteImages = [];
    assignment.programs.forEach(program => {
      if (program.rtlImage) {
        const filename = program.rtlImage.split('/uploads/')[1];
        deleteImages.push(fs.promises.unlink(`public/uploads/${filename}`).catch(console.error));
      }
      if (program.waveformImage) {
        const filename = program.waveformImage.split('/uploads/')[1];
        deleteImages.push(fs.promises.unlink(`public/uploads/${filename}`).catch(console.error));
      }
    });

    await Promise.all(deleteImages);
    
    res.json({ 
      success: true, 
      message: 'Architecture Assignment deleted' 
    });
  } catch (err) {
    handleError(res, err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error (e.g., file size exceeded)
    return res.status(400).json({ 
      success: false, 
      message: err.message || 'File upload error' 
    });
  } else if (err) {
    // Other errors
    handleError(res, err);
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));