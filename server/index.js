import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Admin credentials
const ADMIN_EMAIL = 'malith@gmail.com';
const ADMIN_PASSWORD = 'malith1234';

// Login endpoint
app.post('/api/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    console.log('Invalid credentials');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: 'lax',
    maxAge: 3600000 // 1 hour
  });

  console.log('Login successful');
  res.json({ message: 'Logged in successfully' });
});

// Protected route example
app.get('/api/admin/dashboard', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    res.json({ message: 'Welcome to admin dashboard', user: decoded });
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});