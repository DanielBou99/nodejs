import express from "express";
import AuthorController from "../controllers/authorsController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router.get("/authors", AuthorController.getAll, paginate);
router.get("/authors/:id", AuthorController.getById);
router.post("/authors", AuthorController.new);
router.put("/authors/:id", AuthorController.update);
router.delete("/authors/:id", AuthorController.delete);

export default router;
