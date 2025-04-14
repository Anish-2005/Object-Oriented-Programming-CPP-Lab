require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Initialize Express app
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

// Validate required environment variables
const requiredEnv = ['MONGODB_URI'];
requiredEnv.forEach(env => {
  if (!process.env[env]) {
    console.error(`❌ Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

// Enhanced MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ MongoDB Atlas connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  connectDB().catch(err => {
    console.log('⏳ Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};
connectWithRetry();

// MongoDB Schema with validation
const labCodeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    default: '',
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  code: { 
    type: String, 
    required: [true, 'Code is required'],
    validate: {
      validator: function(v) {
        return v.length >= 10;
      },
      message: 'Code must be at least 10 characters long'
    }
  },
  problemStatement: { 
    type: String, 
    required: [true, 'Problem statement is required'],
    minlength: [20, 'Problem statement must be at least 20 characters']
  },
  expectedOutput: { 
    type: String, 
    required: [true, 'Expected output is required'],
    trim: true
  },
  tags: { 
    type: [String], 
    default: [],
    validate: {
      validator: function(v) {
        return v.every(tag => tag.length <= 20);
      },
      message: 'Tags cannot exceed 20 characters each'
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
labCodeSchema.index({ title: 'text', tags: 'text' });
labCodeSchema.index({ createdAt: -1 });

const LabCode = mongoose.model('LabCode', labCodeSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    dbState: mongoose.STATES[mongoose.connection.readyState],
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Get all codes with pagination
app.get('/api/codes', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [codes, count] = await Promise.all([
      LabCode.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      LabCode.countDocuments()
    ]);

    res.json({
      data: codes,
      meta: {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        limit
      }
    });
  } catch (err) {
    console.error('Error fetching codes:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR'
    });
  }
});

// Enhanced code creation with validation middleware
app.post('/api/codes', 
  [
    // Validation middleware
    (req, res, next) => {
      const requiredFields = ['title', 'code', 'problemStatement', 'expectedOutput'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Missing required fields',
          code: 'MISSING_FIELDS',
          details: missingFields.reduce((acc, field) => ({
            ...acc,
            [field]: `${field} is required`
          }), {})
        });
      }
      next();
    }
  ],
  async (req, res) => {
    try {
      const { title, description, code, problemStatement, expectedOutput, tags } = req.body;

      // Process tags
      const processedTags = Array.isArray(tags) 
        ? tags.map(tag => tag.trim().substring(0, 20)).filter(tag => tag)
        : typeof tags === 'string' 
          ? tags.split(',').map(tag => tag.trim().substring(0, 20)).filter(tag => tag)
          : [];

      const newCode = new LabCode({
        title: title.trim(),
        description: (description || '').trim(),
        code: code.trim(),
        problemStatement: problemStatement.trim(),
        expectedOutput: expectedOutput.trim(),
        tags: processedTags
      });

      const savedCode = await newCode.save();
      res.status(201).json(savedCode);
    } catch (err) {
      console.error('Error creating code:', err);
      
      let status = 500;
      let error = 'Internal server error';
      let code = 'INTERNAL_SERVER_ERROR';
      let details = null;

      if (err.name === 'ValidationError') {
        status = 400;
        error = 'Validation error';
        code = 'VALIDATION_ERROR';
        details = Object.values(err.errors).reduce((acc, { path, message }) => ({
          ...acc,
          [path]: message
        }), {});
      }

      res.status(status).json({ error, code, ...(details && { details }) });
    }
  }
);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'ENDPOINT_NOT_FOUND'
  });
});

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error('🚨 Server error:', err);

  // Handle JSON parse errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON format',
      code: 'INVALID_JSON'
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
    ...(process.env.NODE_ENV === 'development' && {
      message: err.message,
      stack: err.stack
    })
  });
});

// Server configuration
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 MongoDB connection state: ${mongoose.STATES[mongoose.connection.readyState]}`);
});

// Graceful shutdown
const shutdown = async () => {
  console.log('🛑 Received shutdown signal');
  server.close(async () => {
    await mongoose.connection.close();
    console.log('🔌 All connections closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected');
});