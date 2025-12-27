import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    shortname: { type: String, required: true }, // e.g., "Designing"
    longname: { type: String, required: true },  // e.g., "Web Designing (UI/UX)"
    brochure: { type: String, required: true },  // PDF file path
    video: { type: String, default: null },      // Video URL (YouTube/Vimeo link)
    images: [
      {
        type: String,
        required: true, // at least 1 image required
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
