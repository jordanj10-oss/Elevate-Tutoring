/**
 * Subjects Model — Database Schema
 *
 * Master list of subjects offered on the platform.
 */

const TABLE_NAME = 'subjects';

/**
 * SQL Schema:
 *
 * CREATE TABLE subjects (
 *   id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   name        VARCHAR(255) NOT NULL,
 *   category    VARCHAR(100) NOT NULL,
 *   description TEXT,
 *   levels      TEXT[] NOT NULL DEFAULT '{}',
 *   icon        VARCHAR(10),
 *   active      BOOLEAN DEFAULT true,
 *   created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_subjects_category ON subjects(category);
 * CREATE INDEX idx_subjects_active ON subjects(active);
 */

const fields = {
  id: 'UUID',
  name: 'VARCHAR(255)',
  category: 'VARCHAR(100)',
  description: 'TEXT',
  levels: 'TEXT[]',
  icon: 'VARCHAR(10)',
  active: 'BOOLEAN',
  created_at: 'TIMESTAMPTZ'
};

const Subject = {
  tableName: TABLE_NAME,
  fields,

  async findAll() {
    // TODO: SELECT * FROM subjects WHERE active = true ORDER BY category, name
    throw new Error('Not implemented');
  },

  async findById(id) {
    // TODO: SELECT * FROM subjects WHERE id = $1
    throw new Error('Not implemented');
  },

  async findByCategory(category) {
    // TODO: SELECT * FROM subjects WHERE category = $1 AND active = true
    throw new Error('Not implemented');
  }
};

module.exports = Subject;