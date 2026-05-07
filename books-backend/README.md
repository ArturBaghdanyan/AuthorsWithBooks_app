# 📚 AuthorsWithBooks — Backend API

A REST API built with Express.js and PostgreSQL for managing authors and their books. Supports full CRUD operations and can be run locally or with Docker.

🔗 **Frontend Repo:** [AuthorsWithBooks Client](https://github.com/ArturBaghdanyan/AuthorsWithBooks_app)

---

## 🛠 Tech Stack

| Technology           | Purpose                   |
| -------------------- | ------------------------- |
| Node.js + Express.js | REST API server           |
| PostgreSQL           | Relational database       |
| Docker               | Containerized environment |
| TypeScript           | Type safety               |

---

## 📡 API Endpoints

### Authors

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | `/authors`     | Get all authors     |
| GET    | `/authors/:id` | Get author by ID    |
| POST   | `/authors`     | Create a new author |
| PUT    | `/authors/:id` | Update an author    |
| DELETE | `/authors/:id` | Delete an author    |

### Books

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/books`     | Get all books     |
| GET    | `/books/:id` | Get book by ID    |
| POST   | `/books`     | Create a new book |
| PUT    | `/books/:id` | Update a book     |
| DELETE | `/books/:id` | Delete a book     |

---

## 🗄️ Database Setup

Open your PostgreSQL terminal or pgAdmin and run:

```sql
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
```

---

## 🚀 Quick Start (Local)

1. **Database Setup**
   - Create a database in PostgreSQL named `booksList`
   - Run the SQL commands above to create tables

2. **Environment**
   - Rename `.env.example` to `.env`
   - Update `DB_PASSWORD` with your local Postgres password

3. **Install & Run**

```bash
# Navigate to backend folder
cd server  # adjust folder name if different

# Install dependencies
npm install

# Start development server
npm run dev
```

API will be available at [http://localhost:3000](http://localhost:3000)

---

## 🐳 Quick Start (Docker)

```bash
# Build and start all services
docker-compose up --build
```

This starts both the Express server and PostgreSQL database in containers automatically.

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=art0610
DB_NAME=booksList
```

---

## 📁 Project Structure

```
server/
├── src/
│   ├── routes/          # Express route handlers
│   ├── controllers/     # Business logic
│   ├── db/              # Database connection & queries
│   └── index.ts         # Entry point
├── .env.example
├── docker-compose.yml
└── package.json
```

---

## 👤 Author

**Artur Baghdanyan**

- GitHub: [@ArturBaghdanyan](https://github.com/ArturBaghdanyan)
- LinkedIn: (https://www.linkedin.com/in/artur-baghdanyan)
