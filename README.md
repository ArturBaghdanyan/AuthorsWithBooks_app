## 🗄️ Database Setup
1. Open your PostgreSQL terminal or pgAdmin.
2. Run the following SQL to create the database and tables:

\`\`\`sql
CREATE DATABASE booksList;

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT REFERENCES authors(id) ON DELETE CASCADE
);
\`\`\`

## 🚀 Quick Start

1. **Database Setup**:
   - Create a database in PostgreSQL named `booksList`.
   - Run the commands in `schema.sql` to create tables.

2. **Environment**:
   - Rename `.env.example` to `.env`.
   - Update `DB_PASSWORD` with your local Postgres password.

3. **Install & Run**:
   ```bash
   npm install
   npm run dev