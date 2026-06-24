const { neon } = require('@neondatabase/serverless');

let sql;

function getDb() {
  if (!sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
}

/**
 * Execute a raw SQL query with optional parameters.
 * Returns the result rows.
 */
async function query(text, params = []) {
  const db = getDb();
  try {
    const result = await db(text, ...params);
    return result;
  } catch (err) {
    console.error('[DB Error]', err.message);
    throw err;
  }
}

/**
 * Run the schema migration to create all tables.
 */
async function runMigrations() {
  console.log('[Migration] Running database schema creation...');

  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          VARCHAR(255) NOT NULL,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role          VARCHAR(20) NOT NULL DEFAULT 'student'
                    CHECK (role IN ('student', 'tutor', 'admin')),
      grade_level   VARCHAR(20),
      avatar_url    TEXT,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS tutor_profiles (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id       UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      subjects      TEXT[] NOT NULL DEFAULT '{}',
      bio           TEXT,
      hourly_rate   DECIMAL(10,2) NOT NULL,
      availability  JSONB DEFAULT '{}',
      verified      BOOLEAN DEFAULT false,
      rating        DECIMAL(3,2) DEFAULT 0.00,
      review_count  INTEGER DEFAULT 0,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        VARCHAR(255) NOT NULL,
      category    VARCHAR(100) NOT NULL,
      description TEXT,
      levels      TEXT[] NOT NULL DEFAULT '{}',
      icon        VARCHAR(10),
      active      BOOLEAN DEFAULT true,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      student_id      UUID NOT NULL REFERENCES users(id),
      tutor_id        UUID NOT NULL REFERENCES users(id),
      subject_id      UUID REFERENCES subjects(id),
      scheduled_time  TIMESTAMPTZ NOT NULL,
      status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'declined')),
      notes           TEXT,
      created_at      TIMESTAMPTZ DEFAULT NOW(),
      updated_at      TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      booking_id   UUID REFERENCES bookings(id) ON DELETE SET NULL,
      student_id   UUID NOT NULL REFERENCES users(id),
      tutor_id     UUID NOT NULL REFERENCES users(id),
      subject_id   UUID REFERENCES subjects(id),
      start_time   TIMESTAMPTZ NOT NULL,
      end_time     TIMESTAMPTZ,
      status       VARCHAR(20) NOT NULL DEFAULT 'scheduled'
                   CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),
      price        DECIMAL(10,2) NOT NULL,
      notes        TEXT,
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      updated_at   TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id  UUID UNIQUE NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      student_id  UUID NOT NULL REFERENCES users(id),
      tutor_id    UUID NOT NULL REFERENCES users(id),
      rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      feedback    TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    CREATE INDEX IF NOT EXISTS idx_tutor_profiles_user_id ON tutor_profiles(user_id);
    CREATE INDEX IF NOT EXISTS idx_tutor_profiles_verified ON tutor_profiles(verified);
    CREATE INDEX IF NOT EXISTS idx_subjects_category ON subjects(category);
    CREATE INDEX IF NOT EXISTS idx_subjects_active ON subjects(active);
    CREATE INDEX IF NOT EXISTS idx_bookings_student ON bookings(student_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_tutor ON bookings(tutor_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
    CREATE INDEX IF NOT EXISTS idx_sessions_student ON sessions(student_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_tutor ON sessions(tutor_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
    CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON sessions(start_time);
    CREATE INDEX IF NOT EXISTS idx_reviews_tutor ON reviews(tutor_id);
  `;

  try {
    const db = getDb();
    // Split by semicolons and execute each statement
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    for (const stmt of statements) {
      await db(stmt.trim() + ';');
    }
    console.log('[Migration] All tables created successfully');
    return true;
  } catch (err) {
    console.error('[Migration] Failed:', err.message);
    throw err;
  }
}

module.exports = { query, getDb, runMigrations };