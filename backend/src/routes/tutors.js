const { Router } = require('express');
const { query } = require('../db');
const { validate } = require('../middleware/validate');
const { z } = require('zod');

const router = Router();

// --- Schemas ---

const tutorQuerySchema = z.object({
  query: z.object({
    subject: z.string().optional(),
    category: z.string().optional(),
    grade_level: z.string().optional(),
    min_rate: z.coerce.number().optional(),
    max_rate: z.coerce.number().optional(),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(20)
  })
});

const tutorIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tutor ID')
  })
});

// --- Routes ---

// GET /api/tutors
router.get('/', validate(tutorQuerySchema), async (req, res, next) => {
  try {
    const { subject, category, grade_level, min_rate, max_rate, page, limit } = req.query;
    const offset = (page - 1) * limit;

    let whereClauses = [];
    let params = [];
    let paramIndex = 1;

    whereClauses.push(`tp.verified = true`);

    if (subject) {
      whereClauses.push(`$${paramIndex} = ANY(tp.subjects)`);
      params.push(subject);
      paramIndex++;
    }

    if (category) {
      whereClauses.push(`EXISTS (SELECT 1 FROM unnest(tp.subjects) AS s
                         JOIN subjects sub ON sub.name = s
                         WHERE sub.category = $${paramIndex})`);
      params.push(category);
      paramIndex++;
    }

    if (min_rate !== undefined) {
      whereClauses.push(`tp.hourly_rate >= $${paramIndex}`);
      params.push(min_rate);
      paramIndex++;
    }

    if (max_rate !== undefined) {
      whereClauses.push(`tp.hourly_rate <= $${paramIndex}`);
      params.push(max_rate);
      paramIndex++;
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM tutor_profiles tp ${whereStr}`,
      params
    );
    const total = parseInt(countResult[0].total, 10);

    // Fetch
    const data = await query(
      `SELECT
        tp.id, tp.user_id, tp.subjects, tp.bio, tp.hourly_rate,
        tp.verified, tp.rating, tp.review_count,
        u.name, u.email, u.avatar_url, u.grade_level
       FROM tutor_profiles tp
       JOIN users u ON tp.user_id = u.id
       ${whereStr}
       ORDER BY tp.rating DESC, tp.review_count DESC
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

// GET /api/tutors/:id
router.get('/:id', validate(tutorIdSchema), async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT
        tp.id, tp.user_id, tp.subjects, tp.bio, tp.hourly_rate,
        tp.availability, tp.verified, tp.rating, tp.review_count,
        u.name, u.email, u.avatar_url
       FROM tutor_profiles tp
       JOIN users u ON tp.user_id = u.id
       WHERE tp.id = $1`,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Tutor not found' });
    }

    // Get recent reviews
    const reviews = await query(
      `SELECT r.rating, r.feedback, r.created_at,
              u.name as student_name
       FROM reviews r
       JOIN users u ON r.student_id = u.id
       WHERE r.tutor_id = $1
       ORDER BY r.created_at DESC
       LIMIT 10`,
      [result[0].user_id]
    );

    res.status(200).json({
      data: { ...result[0], reviews }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;