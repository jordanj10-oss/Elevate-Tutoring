const { Router } = require('express');
const { query } = require('../db');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { z } = require('zod');

const router = Router();

// --- Schemas ---

const reviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
    feedback: z.string().max(2000).optional()
  })
});

const listSessionsSchema = z.object({
  query: z.object({
    status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled', 'no_show']).optional(),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(20)
  })
});

const updateSessionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid session ID')
  }),
  body: z.object({
    status: z.enum(['in_progress', 'completed', 'cancelled', 'no_show'])
  })
});

// --- Routes ---

// GET /api/sessions
router.get('/', requireAuth, validate(listSessionsSchema), async (req, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const offset = (page - 1) * limit;
    const user = req.user;

    let whereClauses = [];
    let params = [];
    let paramIndex = 1;

    if (user.role === 'student') {
      whereClauses.push(`s.student_id = $${paramIndex}`);
      params.push(user.id);
    } else if (user.role === 'tutor') {
      whereClauses.push(`s.tutor_id = $${paramIndex}`);
      params.push(user.id);
    }
    paramIndex++;

    if (status) {
      whereClauses.push(`s.status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countResult = await query(
      `SELECT COUNT(*) as total FROM sessions s ${whereStr}`,
      params
    );
    const total = parseInt(countResult[0].total, 10);

    const data = await query(
      `SELECT s.*,
              student.name as student_name,
              tutor.name as tutor_name,
              sub.name as subject_name,
              r.rating, r.feedback as review_feedback
       FROM sessions s
       JOIN users student ON s.student_id = student.id
       JOIN users tutor ON s.tutor_id = tutor.id
       LEFT JOIN subjects sub ON s.subject_id = sub.id
       LEFT JOIN reviews r ON r.session_id = s.id
       ${whereStr}
       ORDER BY s.start_time DESC
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

// PATCH /api/sessions/:id
router.patch('/:id', requireAuth, validate(updateSessionSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const session = await query('SELECT * FROM sessions WHERE id = $1', [id]);
    if (session.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Only tutor can update session status
    if (user.role !== 'tutor' || session[0].tutor_id !== user.id) {
      return res.status(403).json({ error: 'Only the assigned tutor can update session status' });
    }

    const now = new Date().toISOString();
    let updateFields = `status = $1, updated_at = NOW()`;
    let extraParams = [];

    if (status === 'in_progress') {
      // No end time yet
    } else if (status === 'completed') {
      updateFields += `, end_time = $3::timestamptz`;
      extraParams = [now];
    } else if (status === 'no_show') {
      updateFields += `, end_time = $3::timestamptz`;
      extraParams = [now];
    }

    const result = await query(
      `UPDATE sessions SET ${updateFields} WHERE id = $2 RETURNING *`,
      [status, id, ...extraParams]
    );

    res.status(200).json({
      message: `Session ${status}`,
      data: result[0]
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/sessions/:id/review
router.post('/:id/review', requireAuth, validate(reviewSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, feedback } = req.body;
    const user = req.user;

    // Fetch session
    const session = await query('SELECT * FROM sessions WHERE id = $1', [id]);
    if (session.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Only the student who attended can review
    if (session[0].student_id !== user.id) {
      return res.status(403).json({ error: 'Only the student can review this session' });
    }

    // Only completed sessions can be reviewed
    if (session[0].status !== 'completed') {
      return res.status(400).json({ error: 'Can only review completed sessions' });
    }

    // Check if already reviewed
    const existingReview = await query('SELECT id FROM reviews WHERE session_id = $1', [id]);
    if (existingReview.length > 0) {
      return res.status(409).json({ error: 'This session has already been reviewed' });
    }

    // Create review
    const review = await query(
      `INSERT INTO reviews (session_id, student_id, tutor_id, rating, feedback)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, user.id, session[0].tutor_id, rating, feedback || null]
    );

    // Update tutor's average rating
    await query(
      `UPDATE tutor_profiles tp
       SET rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE tutor_id = $1),
           review_count = (SELECT COUNT(*) FROM reviews WHERE tutor_id = $1),
           updated_at = NOW()
       WHERE tp.user_id = $1`,
      [session[0].tutor_id]
    );

    res.status(201).json({
      message: 'Review submitted successfully',
      data: review[0]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;