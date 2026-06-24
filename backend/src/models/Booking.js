/**
 * Bookings Model — Database Schema
 *
 * Represents a request by a student to book a session with a tutor.
 * Once confirmed by the tutor, a Session record is created.
 */

const TABLE_NAME = 'bookings';

/**
 * SQL Schema:
 *
 * CREATE TABLE bookings (
 *   id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   student_id      UUID NOT NULL REFERENCES users(id),
 *   tutor_id        UUID NOT NULL REFERENCES users(id),
 *   subject_id      UUID REFERENCES subjects(id),
 *   scheduled_time  TIMESTAMP WITH TIME ZONE NOT NULL,
 *   status          VARCHAR(20) NOT NULL DEFAULT 'pending'
 *                   CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'declined')),
 *   notes           TEXT,
 *   created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 *
 * CREATE INDEX idx_bookings_student ON bookings(student_id);
 * CREATE INDEX idx_bookings_tutor ON bookings(tutor_id);
 * CREATE INDEX idx_bookings_status ON bookings(status);
 * CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_time);
 */

const fields = {
  id: 'UUID',
  student_id: 'UUID',
  tutor_id: 'UUID',
  subject_id: 'UUID',
  scheduled_time: 'TIMESTAMPTZ',
  status: 'VARCHAR(20)',
  notes: 'TEXT',
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
};

const Booking = {
  tableName: TABLE_NAME,
  fields,

  async findById(id) {
    throw new Error('Not implemented');
  },

  async findByStudent(studentId, filters) {
    throw new Error('Not implemented');
  },

  async findByTutor(tutorId, filters) {
    throw new Error('Not implemented');
  },

  async create(data) {
    throw new Error('Not implemented');
  },

  async updateStatus(id, status) {
    throw new Error('Not implemented');
  }
};

module.exports = Booking;