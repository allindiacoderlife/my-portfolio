import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import fs from 'fs';

// Import our schemas & helpers (since "type": "module" is enabled in package.json)
import clientPromise from './src/lib/mongodb.js';
import { validateProject, processProjectData } from './src/lib/projectSchema.js';
import { validateCertificate, processCertificateData } from './src/lib/certificateSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define and ensure local uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration for saving files locally to the server disk
const localDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Unique name: fieldname-timestamp-random.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Multer middleware for local uploads
const uploadLocal = multer({
  storage: localDiskStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// In-memory mock database state
let mockProjects = [];
let mockProjectsNextId = 1;
let mockCertificates = [];
let mockCertificatesNextId = 1;

// 1. Projects APIs
// POST /api/projects
app.post('/api/projects', async (req, res) => {
  try {
    const isMockDb = !process.env.MONGODB_URI || 
      process.env.MONGODB_URI.includes('auth@') || 
      process.env.MONGODB_URI === 'your_mongodb_connection_string_here';

    const body = req.body;

    if (isMockDb) {
      if (!body.title || !body.description || !body.technologies) {
        return res.status(400).json({ error: 'Title, description, and technologies are required' });
      }

      const newProject = {
        _id: mockProjectsNextId.toString(),
        title: body.title.trim(),
        description: body.description.trim(),
        technologies: body.technologies.trim(),
        githubUrl: body.githubUrl || '',
        liveUrl: body.liveUrl || '',
        thumbnail: body.thumbnail || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockProjects.unshift(newProject);
      mockProjectsNextId++;

      return res.status(201).json({
        message: 'Project added successfully! (Using mock database - Configure MongoDB for persistence)',
        projectId: newProject._id,
        project: newProject
      });
    }

    // Use MongoDB
    const validationErrors = validateProject(body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const projectData = {
      title: body.title.trim(),
      description: body.description.trim(),
      technologies: body.technologies.trim(),
      githubUrl: body.githubUrl || '',
      liveUrl: body.liveUrl || '',
      thumbnail: body.thumbnail || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');

    const result = await collection.insertOne(projectData);
    if (result.acknowledged) {
      return res.status(201).json({
        message: 'Project added successfully!',
        projectId: result.insertedId,
        project: { ...projectData, _id: result.insertedId }
      });
    } else {
      return res.status(500).json({ error: 'Failed to add project' });
    }
  } catch (error) {
    console.error('Error adding project:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET /api/projects
app.get('/api/projects', async (req, res) => {
  try {
    const isMockDb = !process.env.MONGODB_URI || 
      process.env.MONGODB_URI.includes('auth@') || 
      process.env.MONGODB_URI === 'your_mongodb_connection_string_here';

    if (isMockDb) {
      return res.json({
        message: 'Projects fetched successfully (Using mock database)',
        projects: mockProjects,
        count: mockProjects.length
      });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');
    const projectsFromDB = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return res.json({
      message: 'Projects fetched successfully',
      projects: projectsFromDB,
      count: projectsFromDB.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET /api/projects/:id
app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check mock database first
    const mockProj = mockProjects.find(p => p._id === id);
    if (mockProj) {
      return res.json({ message: 'Project fetched successfully', project: mockProj });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');
    const project = await collection.findOne({ _id: new ObjectId(id) });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json({ message: 'Project fetched successfully', project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// PUT /api/projects/:id
app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Check mock database first
    const mockIndex = mockProjects.findIndex(p => p._id === id);
    if (mockIndex !== -1) {
      const updatedMock = {
        ...mockProjects[mockIndex],
        title: body.title.trim(),
        description: body.description.trim(),
        technologies: body.technologies.trim(),
        githubUrl: body.githubUrl || '',
        liveUrl: body.liveUrl || '',
        thumbnail: body.thumbnail || '',
        updatedAt: new Date()
      };
      mockProjects[mockIndex] = updatedMock;
      return res.json({ message: 'Project updated successfully! (Mock database)' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const validationErrors = validateProject(body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const updateData = {
      title: body.title.trim(),
      description: body.description.trim(),
      technologies: body.technologies.trim(),
      githubUrl: body.githubUrl || '',
      liveUrl: body.liveUrl || '',
      thumbnail: body.thumbnail || '',
      updatedAt: new Date()
    };

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json({ message: 'Project updated successfully!' });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// DELETE /api/projects/:id
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check mock database first
    const mockIndex = mockProjects.findIndex(p => p._id === id);
    if (mockIndex !== -1) {
      mockProjects.splice(mockIndex, 1);
      return res.json({ message: 'Project deleted successfully! (Mock database)' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json({ message: 'Project deleted successfully!' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// 2. Certificates APIs
// GET /api/certificates
app.get('/api/certificates', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.json({ success: true, certificates: mockCertificates, warning: 'Database not configured' });
    }

    const client = await clientPromise;
    const db = client.db();
    const certs = await db.collection('certificates').find({}).toArray();
    return res.json({ success: true, certificates: certs });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// POST /api/certificates
app.post('/api/certificates', async (req, res) => {
  try {
    const body = req.body;
    const validationErrors = validateCertificate(body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    const processedData = processCertificateData(body);

    if (!process.env.MONGODB_URI) {
      processedData._id = mockCertificatesNextId.toString();
      mockCertificates.push(processedData);
      mockCertificatesNextId++;

      return res.json({
        success: true,
        message: 'Certificate validated but not saved (database not configured - using mock in-memory store)',
        certificate: processedData,
        warning: 'Database not configured - data not persisted'
      });
    }

    processedData.createdAt = new Date();
    processedData.updatedAt = new Date();

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('certificates').insertOne(processedData);
    processedData._id = result.insertedId;

    return res.json({
      success: true,
      message: 'Certificate added successfully',
      certificate: processedData
    });
  } catch (error) {
    console.error('Error adding certificate:', error);
    return res.status(500).json({ error: 'Failed to add certificate' });
  }
});

// DELETE /api/certificates
app.delete('/api/certificates', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Certificate ID is required' });
    }

    // Check mock database first
    const mockIndex = mockCertificates.findIndex(c => c._id === id);
    if (mockIndex !== -1) {
      mockCertificates.splice(mockIndex, 1);
      return res.json({ success: true, message: 'Certificate deleted successfully' });
    }

    if (!process.env.MONGODB_URI) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const client = await clientPromise;
    const db = client.db();

    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (error) {
      query = { id: id };
    }

    const result = await db.collection('certificates').deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    return res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

// 3. Nodemailer Contact Form API
// POST /api/send-email
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: 'chiragsaxena728@gmail.com',
      subject: `Contact from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 4. ImageKit Authentication API (stubbed for compatibility)
// GET /api/imagekit/auth
app.get('/api/imagekit/auth', (req, res) => {
  return res.json({
    token: "local_token",
    expire: 0,
    signature: "local_signature"
  });
});

// 5. Local Upload API (replacing ImageKit upload)
// POST /api/imagekit/upload
app.post('/api/imagekit/upload', uploadLocal.single('file'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Return the local static path
    const fileUrl = `/uploads/${file.filename}`;

    return res.json({
      message: 'File uploaded successfully (saved locally)',
      url: fileUrl,
      name: file.filename,
    });
  } catch (error) {
    console.error('Local upload error:', error);
    return res.status(500).json({ error: 'Failed to upload file locally', details: error.message });
  }
});

// 6. Test DB connection API
// GET /api/test-db
app.get('/api/test-db', async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      return res.json({ success: false, error: 'MONGODB_URI is not configured' });
    }
    const client = await clientPromise;
    const db = client.db();
    const adminDb = db.admin();
    const serverStatus = await adminDb.ping();
    const stats = await db.stats();

    return res.json({
      success: true,
      message: 'Database connection successful',
      connection: {
        connected: true,
        dbName: db.databaseName,
        collections: stats.collections || 0,
        documents: stats.objects || 0,
        dataSize: stats.dataSize || 0
      },
      mongoStatus: serverStatus
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Serve frontend build output in production (or if the dist folder is built and exists)
const hasDist = fs.existsSync(path.join(__dirname, 'dist'));
if (process.env.NODE_ENV === 'production' || hasDist) {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('/*path', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API Server is running in development mode. Start frontend via Vite.');
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
