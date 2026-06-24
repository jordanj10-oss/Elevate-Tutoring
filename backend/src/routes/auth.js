const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../db');
const { validate } = require('../middleware/validate');
const { z } = require('zod');

const router = Router();

// --- Schemas ---

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['student', 'tutor']).optional().default('student'),
    grade_level: z.string().optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
  })
});

// --- Helpers ---

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function sanitizeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}

// --- Routes ---

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password, role, grade_level } = req.body;

    // Check if user already exists
    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Insert user
    const result = await query(
      `INSERT INTO users (name, email, password_hash, role, grade_level)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role, grade_level, created_at`,
      [name, email, password_hash, role, grade_level || null]
    );

    const user = result[0];
    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful',
      data: { user, token }
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Look up user
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result[0];

    // Compare password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      data: { user: sanitizeUser(user), token }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;