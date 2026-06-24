/**
 * Sessions Model — Database Schema
 *
 * Tracks completed, in-progress, and scheduled tutoring sessions.
 * A session is created when a booking is confirmed and the
 * scheduled time arrives (or is in progress).
 */

const TABLE_NAME = 'sessions';

/**
 * SQL Schema:
 *
 * CREATE TABLE sessions (
 *   id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   booking_id   UUID REFERENCES bookings(id) ON DELETE SET NULL,
 *   student_id   UUID NOT NULL REFERENCES users(id),
 *   tutor_id     UUID NOT NULL REFERENCES users(id),
 *   subject_id   UUID REFERENCES subjects(id),
 *   start_time   TIMESTAMP WITH TIME ZONE NOT NULL,
 *   end_time     TIMESTAMP WITH TIME ZONE,
 *   status       VARCHAR(20) NOT NULL DEFAULT 'scheduled'
 *                CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),
 *   price        DECIMAL(10,2) NOT NULL,
 *   notes        TEXT,
 *   created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_sessions_student ON sessions(student_id);
 * CREATE INDEX idx_sessions_tutor ON sessions(tutor_id);
 * CREATE INDEX idx_sessions_status ON sessions(status);
 * CREATE INDEX idx_sessions_start_time ON sessions(start_time);
 */

const fields = {
  id: 'UUID',
  booking_id: 'UUID',
  student_id: 'UUID',
  tutor_id: 'UUID',
  subject_id: 'UUID',
  start_time: 'TIMESTAMPTZ',
  end_time: 'TIMESTAMPTZ',
  status: 'VARCHAR(20)',
  price: 'DECIMAL(10,2)',
  notes: 'TEXT',
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
};

const Session = {
  tableName: TABLE_NAME,
  fields,

  async findById(id) {
    // TODO: SELECT s.*, u.name as student_name, t.name as tutor_name
    //       FROM sessions s
    //       JOIN users u ON s.student_id = u.id
    //       JOIN users t ON s.tutor_id = t.id
    //       WHERE s.id = $1
    throw new Error('Not implemented');
  },

  async findByStudent(studentId, filters) {
    // TODO: List sessions for a student with optional status filter
    throw new Error('Not implemented');
  },

  async findByTutor(tutorId, filters) {
    // TODO: List sessions for a tutor with optional status filter
    throw new Error('Not implemented');
  },

  async create(data) {
    // TODO: INSERT INTO sessions (...) VALUES (...)
    throw new Error('Not implemented');
  },

  async updateStatus(id, status) {
    // TODO: UPDATE sessions SET status = $1, updated_at = NOW() WHERE id = $2
    throw new Error('Not implemented');
  }
};

module.exports = Session;