import express from "express"
import { deleteBook, getBooksByAuthor } from "../controllers/bookController.js";
import { createBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooksByAuthor);
router.post("/", createBook);
router.post("/:id", deleteBook);

export default router;