import express from "express";
import { registeruser, loginuser, getuser } from "../controllers/UserController.js";
import { body } from "express-validator"
import fetchuser from "../middleware/fetchuser.js";


const router = express.Router();

router.post("/register", [
    body("name", "Name must be at least 3 Charecters").isLength({min: 3}),
    body("email", "Please enter valid email").isEmail(),
    body("password", "Password must be at least 5 Charecters")
], registeruser);

router.post("/login", [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 5 charecters").isLength({ min: 5})
], loginuser);


router.get("/getuser", fetchuser, getuser);


export default router;