import Technologies from "../models/TechnologiesModel.js";

const addTechnology = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image is Required" });
  }
  try {
    const technology = await Technologies.create({
      image: `uploads/${req.file.filename}`,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Technology Created Successfully",
        data: technology,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

const getTechnologies = async (req, res) => {
  try {
    const technologies = await Technologies.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Technologies Fetched Successfully",
        data: technologies,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

const updateTechnology = async (req, res) => {
  try {
    // If image not uploaded, return error
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Creating update object manually
    const updateData = {
      image: `uploads/${req.file.filename}`, // <-- updated image field
    };

    // Update document
    const technology = await Technologies.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Technology Updated Successfully",
      data: technology,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteTechnology = async (req, res) => {
  try {
    const technology = await Technologies.findByIdAndDelete(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!technology) {
      return res
        .status(400)
        .json({ success: false, message: "Technology Not Found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Technology Deleted Successfully",
        data: technology,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

export { addTechnology, getTechnologies, updateTechnology, deleteTechnology };
