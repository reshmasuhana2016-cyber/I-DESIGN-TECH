import { validationResult } from "express-validator";
import Promo from "../models/PromoModel.js";

const addPromo = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    const { name, icon, transparentIcon } = req.body;

    const newPromo = await Promo.create({
      name,
      icon,
      transparentIcon,
    });

    res.status(201).json({
      success: true,
      message: "Promo added successfully",
      promo: newPromo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



const getPromo = async (req, res) => {
  try {
    const promos = await Promo.find();
    res.status(200).json({
      success: true,
      message: "Promo Fetched Successfully",
      count: promos.length,
      data: promos,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const updatePromo = async (req, res) => {
  try {
    const promo = await Promo.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        transparentIcon: req.body.transparentIcon,
      },
      { new: true }
    );

    if (!promo) {
      return res.status(404).json({ success: false, message: "Promo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Promo Updated Successfully",
      data: promo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const deletePromo = async(req, res) => {
    try{
        const promo = await Promo.findByIdAndDelete(req.params.id, req.body, {new: true});
    if(!promo) {
        return res.status(400).json({success: false, message: "Promo Not Found"})
    }

    res.status(200).json({success: true, message: "Promo Deleted Successfully", data: promo})

    }catch(error) {
        res.status(400).json({success: false, message: "Internal Server Error", error: error.message})

    }
    

}


export {addPromo, getPromo, updatePromo, deletePromo};