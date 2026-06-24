/**
 * Reviews Model — Database Schema
 *
 * Student reviews and ratings for completed tutoring sessions.
 * Each session can have at most one review.
 */

const TABLE_NAME = 'reviews';

/**
 * SQL Schema:
 *
 * CREATE TABLE reviews (
 *   id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   session_id  UUID UNIQUE NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
 *   student_id  UUID NOT NULL REFERENCES users(id),
 *   tutor_id    UUID NOT NULL REFERENCES users(id),
 *   rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
 *   feedback    TEXT,
 *   created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_reviews_tutor ON reviews(tutor_id);
 * CREATE INDEX idx_reviews_session ON reviews(session_id);
 */

const fields = {
  id: 'UUID',
  session_id: 'UUID',
  student_id: 'UUID',
  tutor_id: 'UUID',
  rating: 'INTEGER',
  feedback: 'TEXT',
  created_at: 'TIMESTAMPTZ'
};

const Review = {
  tableName: TABLE_NAME,
  fields,

  async findBySession(sessionId) {
    throw new Error('Not implemented');
  },

  async findByTutor(tutorId) {
    // TODO: SELECT * FROM reviews WHERE tutor_id = $1 ORDER BY created_at DESC
    throw new Error('Not implemented');
  },

  async create(data) {
    // TODO: INSERT INTO reviews (...) VALUES (...)
    //       Also update tutor_profiles rating & review_count
    throw new Error('Not implemented');
  }
};

module.exports = Review;