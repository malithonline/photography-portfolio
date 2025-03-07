import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB setup
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDb() {
  try {
    await client.connect();
    db = client.db('photography_portfolio');
    console.log("Connected to MongoDB");
    
    // Initialize projects collection if empty
    const projects = await db.collection('projects').find({}).toArray();
    if (projects.length === 0) {
      await db.collection('projects').insertMany([
        {
          id: 1,
          title: 'Wedding Photography',
          description: 'Capturing beautiful moments of couples on their special day.',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
          images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
            'https://images.unsplash.com/photo-1464023790935-0f9d2e48ad5b',
            'https://images.unsplash.com/photo-1537633552985-df8429e8048b'
          ],
          year: '2024',
          details: ['Full Day Coverage', '400+ Photos', 'Premium Editing'],
          category: 'Wedding'
        },
        // Add other initial projects here
      ]);
    }
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

connectToDb();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 3600000 // 1 hour
  });

  res.json({ message: 'Logged in successfully' });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Projects routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection('projects').find({}).toArray();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = req.body;
    
    await db.collection('projects').updateOne(
      { id: parseInt(id) },
      { $set: project }
    );
    
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});