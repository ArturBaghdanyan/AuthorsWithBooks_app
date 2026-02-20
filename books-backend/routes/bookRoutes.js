import express from "express"
import { getBooksByAuthor } from "../controllers/bookController.js";
import { createBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooksByAuthor);
router.post("/", createBook);

export default router;