/**
 * Users Model — Database Schema
 *
 * Represents students, tutors, and admin users on the platform.
 */

const TABLE_NAME = 'users';

/**
 * SQL Schema:
 *
 * CREATE TABLE users (
 *   id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   name        VARCHAR(255) NOT NULL,
 *   email       VARCHAR(255) UNIQUE NOT NULL,
 *   password_hash VARCHAR(255) NOT NULL,
 *   role        VARCHAR(20) NOT NULL DEFAULT 'student'
 *               CHECK (role IN ('student', 'tutor', 'admin')),
 *   grade_level VARCHAR(20),
 *   avatar_url  TEXT,
 *   created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_users_email ON users(email);
 * CREATE INDEX idx_users_role ON users(role);
 */

const fields = {
  id: 'UUID',
  name: 'VARCHAR(255)',
  email: 'VARCHAR(255)',
  password_hash: 'VARCHAR(255)',
  role: 'VARCHAR(20)',
  grade_level: 'VARCHAR(20)',
  avatar_url: 'TEXT',
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
};

// Model stub — database queries will go here
const User = {
  tableName: TABLE_NAME,
  fields,

  async findById(id) {
    // TODO: SELECT * FROM users WHERE id = $1
    throw new Error('Not implemented');
  },

  async findByEmail(email) {
    // TODO: SELECT * FROM users WHERE email = $1
    throw new Error('Not implemented');
  },

  async create(data) {
    // TODO: INSERT INTO users (...) VALUES (...)
    throw new Error('Not implemented');
  }
};

module.exports = User;