import mongoose from "mongoose";
const {Schema} = mongoose;

const TechnologySchema =  new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
})

const Technologies = mongoose.model("Technologies", TechnologySchema);
export default Technologies;