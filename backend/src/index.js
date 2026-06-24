require('dotenv/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const tutorRoutes = require('./routes/tutors');
const bookingRoutes = require('./routes/bookings');
const sessionRoutes = require('./routes/sessions');
const { errorHandler } = require('./middleware/errorHandler');
const { runMigrations } = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Security & parsing middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/sessions', sessionRoutes);

// Error handling
app.use(errorHandler);

// Start server
async function start() {
  try {
    // Run database migrations to create tables
    await runMigrations();
    console.log('[Startup] Database tables ready');

    app.listen(PORT, () => {
      console.log(`[Startup] Elevate Tutoring API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[Startup] Failed:', err.message);
    process.exit(1);
  }
}

start();

module.exports = app;