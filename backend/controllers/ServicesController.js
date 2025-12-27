import Services from "../models/ServicesModel.js";
import fs from "fs";
import path from "path";

// Add Service
const addService = async (req, res) => {
  try {
    const { shortname, longname, video } = req.body;

    if (!shortname || !longname) {
      return res.status(400).json({ success: false, message: "All Fields are required" });
    }

    if (!req.files?.brochure) {
      return res.status(400).json({ success: false, message: "Brochure is required" });
    }

    if (!req.files?.images || req.files.images.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    const images = req.files.images.map(file => file.path);
    const brochure = req.files.brochure[0].path;

    const service = await Services.create({
      shortname,
      longname,
      brochure,
      video: video || null, // save the link directly
      images
    });

    res.status(200).json({ success: true, message: "Service Added Successfully", data: service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


// Get Services
const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json({ success: true, message: "Services Fetched Successfully", data: services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Update Service
// Update Service
const updateService = async (req, res) => {
  try {
    const { existingImages = [], removedImages = [], video } = req.body;

    // Ensure arrays
    const existingImgsArray = Array.isArray(existingImages) ? existingImages : [existingImages].filter(Boolean);
    const removedImgsArray = Array.isArray(removedImages) ? removedImages : [removedImages].filter(Boolean);

    // Handle new images
    let newImages = [];
    if (req.files?.images?.length) {
      newImages = req.files.images.map(file => file.path);
    }

    // Merge existing images and new images
    const finalImages = existingImgsArray.filter(img => !removedImgsArray.includes(img)).concat(newImages);

    const updateData = {
      shortname: req.body.shortname,
      longname: req.body.longname,
      images: finalImages,
      video: video || null, // save video link
    };

    if (req.files?.brochure?.length) updateData.brochure = req.files.brochure[0].path;

    // Delete removed images from server
    removedImgsArray.forEach(imgPath => {
      const fullPath = path.join(process.cwd(), imgPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });

    const service = await Services.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service Not Found" });
    }

    res.status(200).json({ success: true, message: "Service Updated Successfully", data: service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


// Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Services.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service Not Found" });
    }
    res.status(200).json({ success: true, message: "Service Deleted Successfully", data: service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export { addService, getServices, updateService, deleteService };
