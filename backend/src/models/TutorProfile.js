/**
 * TutorProfiles Model — Database Schema
 *
 * Extends the users table with tutoring-specific fields.
 * One-to-one relationship with users (role = 'tutor').
 */

const TABLE_NAME = 'tutor_profiles';

/**
 * SQL Schema:
 *
 * CREATE TABLE tutor_profiles (
 *   id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id      UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 *   subjects     TEXT[] NOT NULL DEFAULT '{}',
 *   bio          TEXT,
 *   hourly_rate  DECIMAL(10,2) NOT NULL,
 *   availability JSONB DEFAULT '{}',
 *   verified     BOOLEAN DEFAULT false,
 *   rating       DECIMAL(3,2) DEFAULT 0.00,
 *   review_count INTEGER DEFAULT 0,
 *   created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_tutor_profiles_user_id ON tutor_profiles(user_id);
 * CREATE INDEX idx_tutor_profiles_subjects ON tutor_profiles USING GIN(subjects);
 * CREATE INDEX idx_tutor_profiles_verified ON tutor_profiles(verified);
 */

const fields = {
  id: 'UUID',
  user_id: 'UUID',
  subjects: 'TEXT[]',
  bio: 'TEXT',
  hourly_rate: 'DECIMAL(10,2)',
  availability: 'JSONB',
  verified: 'BOOLEAN',
  rating: 'DECIMAL(3,2)',
  review_count: 'INTEGER',
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
};

const TutorProfile = {
  tableName: TABLE_NAME,
  fields,

  async findById(id) {
    // TODO: SELECT * FROM tutor_profiles WHERE id = $1
    throw new Error('Not implemented');
  },

  async findByUserId(userId) {
    // TODO: SELECT * FROM tutor_profiles WHERE user_id = $1
    throw new Error('Not implemented');
  },

  async search(filters) {
    // TODO: Full-text search with subject, rate, rating filters
    throw new Error('Not implemented');
  },

  async create(data) {
    // TODO: INSERT INTO tutor_profiles (...) VALUES (...)
    throw new Error('Not implemented');
  }
};

module.exports = TutorProfile;