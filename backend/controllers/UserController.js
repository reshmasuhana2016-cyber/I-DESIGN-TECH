import User from "../models/UserModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registeruser = async (req, res) => {
  const { name, email, password } = req.body;
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    // const { name, email, password } = req.body;

    const Existeduser = await User.findOne({ email });
    if (Existeduser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already existed with this Email",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    const newuser = await User.create({
      name,
      email,
      password: secpass,
    });

    const user = await newuser.save();
    const token = createToken(user._id);

    res
      .status(200)
      .json({ success: true, message: "User Created Successfully", Token: token });
  } catch (error) {
    console.log(error);
    res.json(400).json({ success: false, message: error.message });
  }
};

const loginuser = async(req, res) =>  {
  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const { email, password } = req.body;

    let user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({success: false, message: "Please try to login with Correct Credentials"})
    }

    const passwordcompare = await bcrypt.compare(password, user.password)
    if(!passwordcompare) {
      return res.status(400).json({success: false , message: "Please try to login with correct credentials"})
    }

    const token = createToken(user._id)
    console.log(token, "Logged in Successfully");
    res.status(200).json({success: true, message: "Logged in Successfully", Token: token})
  }catch(error) {
    console.log(error);
    return res.status(400).json({success: false, message: error.message})
  }
}


const getuser = async(req, res) => {
  try{
     const userId = req.user.id
  let user = await  User.findById(userId).select("-password")
  res.send(user)
  } catch(error) {
    console.log(error)
    res.status(400).json("Internal Server Error")
  }
}

export { registeruser, loginuser, getuser };
