import mongoose from "mongoose";
const { Schema } = mongoose;

const PromoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    icon: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true } // optional but useful
);

const Promo = mongoose.model("Promo", PromoSchema);
export default Promo;
