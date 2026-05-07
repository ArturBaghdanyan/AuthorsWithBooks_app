# 📚 AuthorsWithBooks — Frontend

A React + TypeScript application for managing authors and their books. Connects to a custom Express.js REST API with a PostgreSQL database.

🔗 **Backend Repo:** [AuthorsWithBooks API](https://github.com/ArturBaghdanyan/AuthorsWithBooks_app)

---

## ✨ Features

- 📋 View list of authors and their books
- ➕ Add new authors and books
- ✏️ Edit existing entries
- 🗑️ Delete authors and books
- 🔗 Connected to a real PostgreSQL database via REST API

---

## 🛠 Tech Stack

| Technology | Purpose                 |
| ---------- | ----------------------- |
| React 18   | UI library              |
| TypeScript | Type safety             |
| Vite       | Build tool & dev server |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ArturBaghdanyan/AuthorsWithBooks_app.git

# Navigate to the frontend folder
cd AuthorsWithBooks_app/client  # adjust folder name if different

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

> ⚠️ Make sure the backend server is running before starting the frontend.

---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
client/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── services/        # API call functions
│   ├── types/           # TypeScript interfaces
│   └── App.tsx
├── index.html
└── vite.config.ts
```

---

## 👤 Author

**Artur Baghdanyan**

- GitHub: [@ArturBaghdanyan](https://github.com/ArturBaghdanyan)
- LinkedIn: (https://www.linkedin.com/in/artur-baghdanyan)
