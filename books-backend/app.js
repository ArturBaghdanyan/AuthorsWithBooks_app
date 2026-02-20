import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import "./models/index.js";

// Import your modular routes
import authorRoutes from "./routes/AuthorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("Books API is running 📚"));

// Delegate specific paths to routers
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
