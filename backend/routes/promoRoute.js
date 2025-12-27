import express from "express";
import {addPromo, getPromo, updatePromo, deletePromo} from "../controllers/PromoController.js"
import { body } from "express-validator"


const router = express.Router();

router.post(
  "/addpromo",
  [
    body("name", "Name is required").notEmpty(),
    body("icon", "Icon is required").notEmpty()
  ], addPromo );

  router.get("/getpromos",  getPromo);

  router.put("/update/:id",  [
    body("name", "Name is required").notEmpty(),
    body("icon", "Icon is required").notEmpty()
  ], updatePromo );

  router.delete("/delete/:id", deletePromo);

  export default router;





