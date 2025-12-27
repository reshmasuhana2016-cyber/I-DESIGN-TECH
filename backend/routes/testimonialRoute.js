import express from "express";
import { body } from "express-validator";
import upload from "../middleware/upload.js";
import {
  addTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/TestimonialController.js";




const router = express.Router();

router.post("/addtestimonial", upload.single("image"), addTestimonial);


router.get("/gettestimonial", getTestimonial);

router.put(
  "/update/:id", upload.single("image"), 
  [
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("company").notEmpty(),
  ],
  updateTestimonial
);


router.delete("/delete/:id", deleteTestimonial);

export default router;
