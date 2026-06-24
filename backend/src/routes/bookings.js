const { Router } = require('express');
const { query } = require('../db');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { z } = require('zod');

const router = Router();

// --- Schemas ---

const createBookingSchema = z.object({
  body: z.object({
    tutor_id: z.string().uuid('Invalid tutor ID'),
    subject_id: z.string().uuid('Invalid subject ID'),
    scheduled_time: z.string().datetime('Invalid datetime format'),
    notes: z.string().max(500).optional()
  })
});

const listBookingsSchema = z.object({
  query: z.object({
    status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(20)
  })
});

const updateBookingSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid booking ID')
  }),
  body: z.object({
    status: z.enum(['confirmed', 'cancelled', 'declined'])
  })
});

// --- Routes ---

// POST /api/bookings
router.post('/', requireAuth, validate(createBookingSchema), async (req, res, next) => {
  try {
    const { tutor_id, subject_id, scheduled_time, notes } = req.body;
    const student_id = req.user.id;

    // Verify tutor exists and is verified
    const tutorCheck = await query(
      `SELECT tp.id, tp.hourly_rate FROM tutor_profiles tp WHERE tp.id = $1 AND tp.verified = true`,
      [tutor_id]
    );
    if (tutorCheck.length === 0) {
      return res.status(404).json({ error: 'Tutor not found or not available' });
    }

    // Verify subject exists
    const subjectCheck = await query('SELECT id FROM subjects WHERE id = $1 AND active = true', [subject_id]);
    if (subjectCheck.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    // Check for scheduling conflicts
    const conflicts = await query(
      `SELECT id FROM bookings
       WHERE tutor_id = $1
         AND scheduled_time = $2::timestamptz
         AND status IN ('pending', 'confirmed')`,
      [tutor_id, scheduled_time]
    );
    if (conflicts.length > 0) {
      return res.status(409).json({ error: 'This time slot is already booked' });
    }

    // Create booking
    const result = await query(
      `INSERT INTO bookings (student_id, tutor_id, subject_id, scheduled_time, notes)
       VALUES ($1, $2, $3, $4::timestamptz, $5)
       RETURNING *`,
      [student_id, tutor_id, subject_id, scheduled_time, notes || null]
    );

    res.status(201).json({
      message: 'Booking created successfully',
      data: result[0]
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/bookings
router.get('/', requireAuth, validate(listBookingsSchema), async (req, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const offset = (page - 1) * limit;
    const user = req.user;

    let whereClauses = [];
    let params = [];
    let paramIndex = 1;

    if (user.role === 'student') {
      whereClauses.push(`b.student_id = $${paramIndex}`);
      params.push(user.id);
    } else if (user.role === 'tutor') {
      whereClauses.push(`b.tutor_id = $${paramIndex}`);
      params.push(user.id);
    } else {
      // admin — no filter
    }
    paramIndex++;

    if (status) {
      whereClauses.push(`b.status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countResult = await query(
      `SELECT COUNT(*) as total FROM bookings b ${whereStr}`,
      params
    );
    const total = parseInt(countResult[0].total, 10);

    const data = await query(
      `SELECT b.*,
              student.name as student_name, student.email as student_email,
              tutor.name as tutor_name, tutor.email as tutor_email
       FROM bookings b
       JOIN users student ON b.student_id = student.id
       JOIN users tutor ON b.tutor_id = tutor.id
       ${whereStr}
       ORDER BY b.scheduled_time DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    res.status(200).json({
      data,
      pagination: { page, limit, total }
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/bookings/:id (update status)
router.patch('/:id', requireAuth, validate(updateBookingSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    // Fetch booking
    const booking = await query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (booking.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only the tutor can confirm/decline, only the student can cancel
    if (status === 'confirmed' || status === 'declined') {
      if (user.role !== 'tutor' || booking[0].tutor_id !== user.id) {
        return res.status(403).json({ error: 'Only the assigned tutor can confirm or decline bookings' });
      }
    }
    if (status === 'cancelled') {
      if (booking[0].student_id !== user.id && booking[0].tutor_id !== user.id && user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to cancel this booking' });
      }
    }

    const result = await query(
      `UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );

    // If confirmed, create a session record
    if (status === 'confirmed') {
      await query(
        `INSERT INTO sessions (booking_id, student_id, tutor_id, subject_id, start_time, price, status)
         VALUES ($1, $2, $3, $4, $5::timestamptz, $6, 'scheduled')
         ON CONFLICT DO NOTHING`,
        [id, booking[0].student_id, booking[0].tutor_id, booking[0].subject_id, booking[0].scheduled_time, 45.00]
      );
    }

    res.status(200).json({
      message: `Booking ${status}`,
      data: result[0]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;