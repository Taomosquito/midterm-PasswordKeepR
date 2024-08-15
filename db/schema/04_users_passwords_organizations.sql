-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS users_passwords_organizations CASCADE;
CREATE TABLE users_passwords_organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  password_id INTEGER REFERENCES passwords(id),
  organization_id INTEGER REFERENCES organizations(id)
);
