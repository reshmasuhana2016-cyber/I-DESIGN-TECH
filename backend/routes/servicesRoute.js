import {addService, getServices, updateService, deleteService} from "../controllers/ServicesController.js"
import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";

router.post(
  "/addservice",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  addService
);


router.get("/getservices", getServices);
router.put("/update/:id", upload.fields([
    { name: "images", maxCount: 5 },   // multiple images
    { name: "brochure", maxCount: 1 },
    { name: "video", maxCount: 1 }  // single pdf
  ]), updateService);

router.delete("/delete/:id", deleteService)

export default router;