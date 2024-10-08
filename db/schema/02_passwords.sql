DROP TABLE IF EXISTS passwords CASCADE;
CREATE TABLE passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  pass VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  site_name VARCHAR(255) NOT NULL,
  site_url VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  category VARCHAR(255),
  username VARCHAR(255) NOT NULL
);
