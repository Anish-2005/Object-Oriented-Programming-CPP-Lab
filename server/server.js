require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

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

// Configure file storage
const createUploadDirectory = async () => {
  const uploadDir = path.join(__dirname, 'public', 'uploads');
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.chmod(uploadDir, 0o755);
  }
  return uploadDir;
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadDir = await createUploadDirectory();
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    const safeFilename = `${uniqueSuffix}${ext}`;
    cb(null, safeFilename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
  }

  if (file.size > maxSize) {
    return cb(new Error('File size exceeds 5MB limit'), false);
  }

  cb(null, true);
};

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files with cache control
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads'), {
  maxAge: '7d',
  setHeaders: (res, path) => {
    if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.gif')) {
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }
}));

// Schemas
const problemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  code: { type: String, required: true },
  output: { type: String, required: true }
}, { _id: false });

const architectureProblemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  moduleCode: { type: String, required: true },
  rtlImage: { type: String, required: true },
  testBenchCode: { type: String, required: true },
  waveformImage: { type: String, required: true }
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

// File Upload Endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return respond.error(res, 'No file uploaded', 400);
    }

    // Verify file exists on disk
    const filePath = path.join(req.file.destination, req.file.filename);
    try {
      await fs.access(filePath);
    } catch {
      throw new Error('Uploaded file not found on server');
    }

    // Construct secure URL
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    respond.success(res, { 
      imageUrl,
      fileInfo: {
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (err) {
    console.error('Upload error:', err);
    
    // Clean up failed upload
    if (req.file) {
      try {
        await fs.unlink(path.join(req.file.destination, req.file.filename));
      } catch (cleanupErr) {
        console.error('Failed to clean up upload:', cleanupErr);
      }
    }

    respond.error(res, err.message, 500, process.env.NODE_ENV !== 'production' ? err.stack : null);
  }
});

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
      if (!req.body.title || !req.body.programs?.length) {
        return respond.error(res, 'Title and at least one program are required', 400);
      }

      const newAssignment = new ArchitectureAssignment(req.body);
      const savedAssignment = await newAssignment.save();
      respond.success(res, savedAssignment, 201);
    } catch (err) {
      respond.error(res, 'Failed to create architecture assignment', 500, err);
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

      // Delete associated images
      const deletePromises = [];
      for (const program of assignment.programs) {
        if (program.rtlImage) {
          const filename = program.rtlImage.split('/uploads/')[1];
          if (filename) {
            deletePromises.push(
              fs.unlink(path.join(__dirname, 'public', 'uploads', filename))
                .catch(err => console.error('Failed to delete RTL image:', err))
            );
          }
        }
        if (program.waveformImage) {
          const filename = program.waveformImage.split('/uploads/')[1];
          if (filename) {
            deletePromises.push(
              fs.unlink(path.join(__dirname, 'public', 'uploads', filename))
                .catch(err => console.error('Failed to delete waveform image:', err))
            );
          }
        }
      }

      await Promise.all(deletePromises);
      respond.success(res, { message: 'Architecture assignment deleted successfully' });
    } catch (err) {
      respond.error(res, 'Failed to delete architecture assignment', 500, err);
    }
  });

// OOP Assignments
router.route('/assignments')
  .get(async (req, res) => {
    try {
      const assignments = await Assignment.find().sort({ createdAt: -1 });
      respond.success(res, assignments);
    } catch (err) {
      respond.error(res, 'Failed to fetch OOP assignments', 500, err);
    }
  })
  .post(async (req, res) => {
    try {
      if (!req.body.title || !req.body.problems?.length) {
        return respond.error(res, 'Title and at least one problem are required', 400);
      }

      const newAssignment = new Assignment(req.body);
      const savedAssignment = await newAssignment.save();
      respond.success(res, savedAssignment, 201);
    } catch (err) {
      respond.error(res, 'Failed to create OOP assignment', 500, err);
    }
  });

router.route('/assignments/:id')
  .get(async (req, res) => {
    try {
      const assignment = await Assignment.findById(req.params.id);
      if (!assignment) {
        return respond.error(res, 'OOP assignment not found', 404);
      }
      respond.success(res, assignment);
    } catch (err) {
      respond.error(res, 'Failed to fetch OOP assignment', 500, err);
    }
  })
  .put(async (req, res) => {
    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAssignment) {
        return respond.error(res, 'OOP assignment not found', 404);
      }
      respond.success(res, updatedAssignment);
    } catch (err) {
      respond.error(res, 'Failed to update OOP assignment', 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const assignment = await Assignment.findByIdAndDelete(req.params.id);
      if (!assignment) {
        return respond.error(res, 'OOP assignment not found', 404);
      }
      respond.success(res, { message: 'OOP assignment deleted successfully' });
    } catch (err) {
      respond.error(res, 'Failed to delete OOP assignment', 500, err);
    }
  });

// C++ Assignments
router.route('/c-assignments')
  .get(async (req, res) => {
    try {
      const assignments = await CAssignment.find().sort({ createdAt: -1 });
      respond.success(res, assignments);
    } catch (err) {
      respond.error(res, 'Failed to fetch C++ assignments', 500, err);
    }
  })
  .post(async (req, res) => {
    try {
      if (!req.body.title || !req.body.problems?.length) {
        return respond.error(res, 'Title and at least one problem are required', 400);
      }

      const newAssignment = new CAssignment(req.body);
      const savedAssignment = await newAssignment.save();
      respond.success(res, savedAssignment, 201);
    } catch (err) {
      respond.error(res, 'Failed to create C++ assignment', 500, err);
    }
  });

router.route('/c-assignments/:id')
  .get(async (req, res) => {
    try {
      const assignment = await CAssignment.findById(req.params.id);
      if (!assignment) {
        return respond.error(res, 'C++ assignment not found', 404);
      }
      respond.success(res, assignment);
    } catch (err) {
      respond.error(res, 'Failed to fetch C++ assignment', 500, err);
    }
  })
  .put(async (req, res) => {
    try {
      const updatedAssignment = await CAssignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAssignment) {
        return respond.error(res, 'C++ assignment not found', 404);
      }
      respond.success(res, updatedAssignment);
    } catch (err) {
      respond.error(res, 'Failed to update C++ assignment', 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const assignment = await CAssignment.findByIdAndDelete(req.params.id);
      if (!assignment) {
        return respond.error(res, 'C++ assignment not found', 404);
      }
      respond.success(res, { message: 'C++ assignment deleted successfully' });
    } catch (err) {
      respond.error(res, 'Failed to delete C++ assignment', 500, err);
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
  if (err instanceof multer.MulterError) {
    respond.error(res, `File upload error: ${err.message}`, 400);
  } else {
    console.error('Unhandled error:', err);
    respond.error(res, 'Internal server error', 500, 
      process.env.NODE_ENV !== 'production' ? err.stack : null);
  }
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = server;