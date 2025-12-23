import express from "express";
import * as bookController from "../controllers/bookController.js";




const router = express.Router();



router.get("/",bookController.getBooks);
router.get("/:id",bookController.getBook);
router.post("/",bookController.createBook);

export default router;
