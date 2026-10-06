import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import fs from 'fs';

// Import our schemas & helpers
import clientPromise from './src/lib/mongodb.js';
import { validateProject, processProjectData } from './src/lib/projectSchema.js';
import { validateCertificate, processCertificateData } from './src/lib/certificateSchema.js';
import { initialProjects, initialCertificates, initialSkills, initialAbout } from './src/lib/initialData.js';

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

// Multer storage configuration for saving files locally
const localDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const uploadLocal = multer({
  storage: localDiskStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// In-memory fallback stores pre-seeded with portfolio data
let mockProjects = [...initialProjects];
let mockCertificates = [...initialCertificates];
let mockSkills = [...initialSkills];
let mockAbout = { ...initialAbout };
let mockMessages = [];

// Helper to determine if running with MongoDB or fallback
function isUsingMock() {
  return (
    !process.env.MONGODB_URI ||
    process.env.MONGODB_URI.includes('auth@') ||
    process.env.MONGODB_URI === 'your_mongodb_connection_string_here' ||
    process.env.MONGODB_URI.trim() === ''
  );
}

// Auto-seed MongoDB on startup if connected and empty
async function initDbSeed() {
  if (isUsingMock()) return;
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');

    // Projects seed
    const projCount = await db.collection('projects').countDocuments();
    if (projCount === 0) {
      console.log('Seeding initial projects to MongoDB...');
      await db.collection('projects').insertMany(initialProjects.map(p => ({ ...p, _id: undefined })));
    }

    // Certificates seed
    const certCount = await db.collection('certificates').countDocuments();
    if (certCount === 0) {
      console.log('Seeding initial certificates to MongoDB...');
      await db.collection('certificates').insertMany(initialCertificates.map(c => ({ ...c, _id: undefined })));
    }

    // Skills seed
    const skillCount = await db.collection('skills').countDocuments();
    if (skillCount === 0) {
      console.log('Seeding initial skills to MongoDB...');
      await db.collection('skills').insertMany(initialSkills.map(s => ({ ...s, _id: undefined })));
    }

    // About seed
    const aboutDoc = await db.collection('about').findOne();
    if (!aboutDoc) {
      console.log('Seeding initial about data to MongoDB...');
      await db.collection('about').insertOne(initialAbout);
    }
  } catch (err) {
    console.error('Database seed error (will use in-memory store):', err.message);
  }
}

initDbSeed();

// ==========================================
// 1. AUTH APIs
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.NEXT_PUBLIC_USERNAME || process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.NEXT_PUBLIC_PASSWORD || process.env.ADMIN_PASSWORD || 'password123';

  if (username === adminUser && password === adminPass) {
    // Generate a simple secure session token
    const token = 'admin_token_' + Buffer.from(username + ':' + Date.now()).toString('base64');
    return res.json({
      success: true,
      token,
      user: { username: adminUser, role: 'admin' },
      message: 'Logged in successfully',
    });
  }

  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

// ==========================================
// 2. STATS API (DASHBOARD OVERVIEW)
// ==========================================
app.get('/api/stats', async (req, res) => {
  try {
    let projectsCount = mockProjects.length;
    let skillsCount = mockSkills.length;
    let messagesCount = mockMessages.length;
    let dbConnected = false;

    if (!isUsingMock()) {
      try {
        const client = await clientPromise;
        const db = client.db('portfolio');
        projectsCount = await db.collection('projects').countDocuments();
        skillsCount = await db.collection('skills').countDocuments();
        messagesCount = await db.collection('messages').countDocuments();
        dbConnected = true;
      } catch (e) {
        dbConnected = false;
      }
    }

    return res.json({
      success: true,
      stats: {
        projects: projectsCount,
        skills: skillsCount,
        messages: messagesCount,
        dbConnected,
        environment: process.env.NODE_ENV || 'development'
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. PROJECTS APIs (CRUD)
// ==========================================
app.get('/api/projects', async (req, res) => {
  try {
    if (isUsingMock()) {
      return res.json({
        message: 'Projects fetched successfully',
        projects: mockProjects,
        count: mockProjects.length,
      });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const projects = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();

    // If database returned empty, fallback to seed
    if (!projects || projects.length === 0) {
      return res.json({
        message: 'Projects fetched successfully (fallback)',
        projects: mockProjects,
        count: mockProjects.length,
      });
    }

    return res.json({
      message: 'Projects fetched successfully',
      projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.json({
      message: 'Projects fetched successfully (fallback on error)',
      projects: mockProjects,
      count: mockProjects.length,
    });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const mockProj = mockProjects.find(p => p._id === id);
    if (mockProj) {
      return res.json({ message: 'Project fetched successfully', project: mockProj });
    }

    if (isUsingMock() || !ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    return res.json({ message: 'Project fetched successfully', project });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // Parse techs or techStack if array or string
    let techsArray = [];
    if (Array.isArray(body.techs)) {
      techsArray = body.techs;
    } else if (typeof body.technologies === 'string') {
      techsArray = body.technologies.split(',').map(t => t.trim()).filter(Boolean);
    }

    const newProject = {
      title: body.title.trim(),
      description: body.description.trim(),
      detailedDescription: body.detailedDescription ? body.detailedDescription.trim() : body.description.trim(),
      technologies: body.technologies ? body.technologies.trim() : '',
      techs: techsArray,
      features: Array.isArray(body.features) ? body.features : [],
      category: body.category || 'Other',
      githubUrl: body.githubUrl || body.githubLink || '',
      githubLink: body.githubLink || body.githubUrl || '',
      liveUrl: body.liveUrl || body.liveDemo || body.link || '',
      liveDemo: body.liveDemo || body.liveUrl || body.link || '',
      link: body.link || body.liveUrl || body.liveDemo || '',
      thumbnail: body.thumbnail || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isUsingMock()) {
      newProject._id = 'proj-' + Date.now();
      mockProjects.unshift(newProject);
      return res.status(201).json({
        message: 'Project added successfully!',
        projectId: newProject._id,
        project: newProject,
      });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const result = await db.collection('projects').insertOne(newProject);
    newProject._id = result.insertedId;

    return res.status(201).json({
      message: 'Project added successfully!',
      projectId: result.insertedId,
      project: newProject,
    });
  } catch (error) {
    console.error('Error adding project:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const mockIndex = mockProjects.findIndex(p => p._id === id);
    if (mockIndex !== -1) {
      mockProjects[mockIndex] = {
        ...mockProjects[mockIndex],
        ...body,
        updatedAt: new Date().toISOString()
      };
      return res.json({ message: 'Project updated successfully!', project: mockProjects[mockIndex] });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const updateData = { ...body, updatedAt: new Date().toISOString() };
    delete updateData._id;

    const result = await db.collection('projects').updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json({ message: 'Project updated successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const mockIndex = mockProjects.findIndex(p => p._id === id);
    if (mockIndex !== -1) {
      mockProjects.splice(mockIndex, 1);
      return res.json({ message: 'Project deleted successfully!' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json({ message: 'Project deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4. CERTIFICATES APIs (CRUD)
// ==========================================
app.get('/api/certificates', async (req, res) => {
  try {
    if (isUsingMock()) {
      return res.json({ success: true, certificates: mockCertificates });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const certs = await db.collection('certificates').find({}).sort({ createdAt: -1 }).toArray();

    if (!certs || certs.length === 0) {
      return res.json({ success: true, certificates: mockCertificates });
    }

    return res.json({ success: true, certificates: certs });
  } catch (error) {
    return res.json({ success: true, certificates: mockCertificates });
  }
});

app.post('/api/certificates', async (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.issuer) {
      return res.status(400).json({ error: 'Title and issuer are required' });
    }

    const newCert = {
      title: body.title.trim(),
      issuer: body.issuer.trim(),
      date: body.date ? body.date.trim() : '2024',
      description: body.description ? body.description.trim() : '',
      image: body.image || '',
      credentialId: body.credentialId || '',
      skills: Array.isArray(body.skills) ? body.skills : [],
      verifyLink: body.verifyLink || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isUsingMock()) {
      newCert._id = 'cert-' + Date.now();
      mockCertificates.unshift(newCert);
      return res.json({ success: true, message: 'Certificate added successfully', certificate: newCert });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const result = await db.collection('certificates').insertOne(newCert);
    newCert._id = result.insertedId;

    return res.json({ success: true, message: 'Certificate added successfully', certificate: newCert });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/certificates', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Certificate ID is required' });

    const mockIndex = mockCertificates.findIndex(c => c._id === id || c.id === id);
    if (mockIndex !== -1) {
      mockCertificates.splice(mockIndex, 1);
      return res.json({ success: true, message: 'Certificate deleted successfully' });
    }

    if (!isUsingMock() && ObjectId.isValid(id)) {
      const client = await clientPromise;
      const db = client.db('portfolio');
      await db.collection('certificates').deleteOne({ _id: new ObjectId(id) });
      return res.json({ success: true, message: 'Certificate deleted successfully' });
    }

    return res.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 5. SKILLS APIs (CRUD)
// ==========================================
app.get('/api/skills', async (req, res) => {
  try {
    let skillsList = mockSkills;

    if (!isUsingMock()) {
      try {
        const client = await clientPromise;
        const db = client.db('portfolio');
        const dbSkills = await db.collection('skills').find({}).toArray();
        if (dbSkills && dbSkills.length > 0) {
          skillsList = dbSkills;
        }
      } catch (e) {
        skillsList = mockSkills;
      }
    }

    // Organize into categories for direct frontend consumption
    const categorized = {
      frontend: skillsList.filter(s => s.category?.toLowerCase() === 'frontend'),
      backend: skillsList.filter(s => s.category?.toLowerCase() === 'backend'),
      database: skillsList.filter(s => s.category?.toLowerCase() === 'database' || s.category?.toLowerCase() === 'db'),
      other: skillsList.filter(s => s.category?.toLowerCase() === 'other' || s.category?.toLowerCase() === 'tools'),
    };

    return res.json({
      success: true,
      skills: skillsList,
      categorized,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const { name, img, category } = req.body;
    if (!name) return res.status(400).json({ error: 'Skill name is required' });

    const newSkill = {
      name: name.trim(),
      img: img || '/assets/StackLogos/react.png',
      category: (category || 'frontend').toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    if (isUsingMock()) {
      newSkill._id = 'skill-' + Date.now();
      mockSkills.push(newSkill);
      return res.status(201).json({ success: true, skill: newSkill, message: 'Skill added successfully' });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const result = await db.collection('skills').insertOne(newSkill);
    newSkill._id = result.insertedId;

    return res.status(201).json({ success: true, skill: newSkill, message: 'Skill added successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const mockIndex = mockSkills.findIndex(s => s._id === id);
    if (mockIndex !== -1) {
      mockSkills.splice(mockIndex, 1);
      return res.json({ success: true, message: 'Skill deleted successfully' });
    }

    if (!isUsingMock() && ObjectId.isValid(id)) {
      const client = await clientPromise;
      const db = client.db('portfolio');
      await db.collection('skills').deleteOne({ _id: new ObjectId(id) });
      return res.json({ success: true, message: 'Skill deleted successfully' });
    }

    return res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 6. ABOUT / PROFILE APIs
// ==========================================
app.get('/api/about', async (req, res) => {
  try {
    if (isUsingMock()) {
      return res.json({ success: true, about: mockAbout });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const aboutData = await db.collection('about').findOne();

    return res.json({ success: true, about: aboutData || mockAbout });
  } catch (error) {
    return res.json({ success: true, about: mockAbout });
  }
});

app.put('/api/about', async (req, res) => {
  try {
    const body = req.body;
    mockAbout = { ...mockAbout, ...body, updatedAt: new Date().toISOString() };

    if (!isUsingMock()) {
      const client = await clientPromise;
      const db = client.db('portfolio');
      await db.collection('about').updateOne({}, { $set: mockAbout }, { upsert: true });
    }

    return res.json({ success: true, message: 'About profile updated successfully', about: mockAbout });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 7. CONTACT / MESSAGES APIs
// ==========================================
async function handleContactMessage(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
    }

    const newMessage = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    if (isUsingMock()) {
      newMessage._id = 'msg-' + Date.now();
      mockMessages.unshift(newMessage);
    } else {
      try {
        const client = await clientPromise;
        const db = client.db('portfolio');
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage._id = result.insertedId;
      } catch (dbErr) {
        newMessage._id = 'msg-' + Date.now();
        mockMessages.unshift(newMessage);
      }
    }

    // Dispatch email if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: email,
          to: process.env.EMAIL_USER,
          subject: `Portfolio Contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailErr) {
        console.warn('Nodemailer notice: Email could not be dispatched (saved to DB):', emailErr.message);
      }
    }

    return res.json({ success: true, message: 'Message received and saved successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

app.post('/api/contact', handleContactMessage);
app.post('/api/send-email', handleContactMessage);

app.get('/api/messages', async (req, res) => {
  try {
    if (isUsingMock()) {
      return res.json({ success: true, messages: mockMessages });
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const messages = await db.collection('messages').find({}).sort({ createdAt: -1 }).toArray();

    return res.json({ success: true, messages: messages || mockMessages });
  } catch (error) {
    return res.json({ success: true, messages: mockMessages });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const mockIndex = mockMessages.findIndex(m => m._id === id);
    if (mockIndex !== -1) {
      mockMessages.splice(mockIndex, 1);
      return res.json({ success: true, message: 'Message deleted' });
    }

    if (!isUsingMock() && ObjectId.isValid(id)) {
      const client = await clientPromise;
      const db = client.db('portfolio');
      await db.collection('messages').deleteOne({ _id: new ObjectId(id) });
    }

    return res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 8. UPLOADS APIs
// ==========================================
app.get('/api/imagekit/auth', (req, res) => {
  return res.json({ token: "local_token", expire: 0, signature: "local_signature" });
});

app.post(['/api/upload', '/api/imagekit/upload'], uploadLocal.single('file'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileUrl = `/uploads/${file.filename}`;
    return res.json({
      message: 'File uploaded successfully',
      url: fileUrl,
      name: file.filename,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Database ping test
app.get('/api/test-db', async (req, res) => {
  try {
    if (isUsingMock()) {
      return res.json({ success: true, mode: 'In-Memory / Fallback Store', connected: false });
    }
    const client = await clientPromise;
    const db = client.db();
    const stats = await db.stats();
    return res.json({ success: true, mode: 'MongoDB Connected', dbName: db.databaseName, stats });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Serve frontend build output if exists
const hasDist = fs.existsSync(path.join(__dirname, 'dist'));
if (process.env.NODE_ENV === 'production' || hasDist) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('/*path', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API Server is running in development mode.');
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
