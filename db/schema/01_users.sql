-- Drop and recreate Users table

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  organization_id INTEGER REFERENCES organizations(id),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  pass VARCHAR(255) NOT NULL
);
