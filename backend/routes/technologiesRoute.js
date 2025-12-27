import express from "express";
import {addTechnology, getTechnologies, updateTechnology, deleteTechnology} from "../controllers/TechnologiesController.js";
import upload from "../middleware/upload.js";

const router =  express.Router();


router.post("/addtechnology", upload.single("image"), addTechnology);
router.get("/gettechnologies", getTechnologies);
router.put("/update/:id", upload.single("image"), updateTechnology);
router.delete("/delete/:id", deleteTechnology);

export default router;