import Testimonial from "../models/TestimonialModel.js";


const addTestimonial = async(req, res) => { 
    try{
    const { name, description, company } = req.body;

    if (!name || !description || !company) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const testimonial = await Testimonial.create({
        name, 
        description, 
        company, 
        image: req.file.path
    })

    res.status(200).json({success: true, message: "Testimonial Created Successfully", data: testimonial})

    }catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error", error: error.message });
  }
    
}

const getTestimonial = async(req, res) => {
  try {
     const testimonial = await Testimonial.find();
  return res.status(200).json({success: true, message: "Testimonials Fetched Successfully", data: testimonial})
  }catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error", error: error.message });
  }
    
}

const updateTestimonial = async(req, res) => {
  try{
    const updatedData = req.body;
    if(req.file) {
  updatedData.image = req.file.path.replace(/\\/g, "/");
}

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updatedData, {new: true});
  if(!testimonial) {
    return res.status(400).json({success: false, message: "Testimonial Not Found"})
  }
  res.status(200).json({success:true, message: "Testimonial Updated  Successsfull", data: testimonial})

  }catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}

const deleteTestimonial = async(req, res) => {
 try {
   const testimonial = await Testimonial.findByIdAndDelete(req.params.id, req.body, {new: true});
  if(!testimonial) {
    return res.status(400).json({success: false, message: "Testimonial Not found"})
  }

  res.status(200).json({success: true, message: "Testimonial Deleted Successfully", data: testimonial})

 }catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}

export {addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial}