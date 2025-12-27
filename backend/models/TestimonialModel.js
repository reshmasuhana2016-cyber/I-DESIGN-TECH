import mongoose from "mongoose";
const { Schema } = mongoose;

const TestimonialSchema = new mongoose.Schema ({
    name: {
        type : String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);
export default Testimonial;