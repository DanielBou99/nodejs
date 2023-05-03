import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router.get("/authors", AuthorController.getAll);
router.get("/authors/:id", AuthorController.getById);
router.post("/authors", AuthorController.new);
router.put("/authors/:id", AuthorController.update);
router.delete("/authors/:id", AuthorController.delete);

export default router;
