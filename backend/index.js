import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectToDB from "./config/db.js";
import promoRoute from "./routes/promoRoute.js";
import testimonialRoute from "./routes/testimonialRoute.js";
import technologiesRoute from "./routes/technologiesRoute.js";
import servicesRoute from "./routes/servicesRoute.js";
import path from "path";
import { fileURLToPath } from "url";



dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


connectToDB();


// Middleware
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/promos", promoRoute);
app.use("/api/testimonial", testimonialRoute);
app.use("/api/technologies", technologiesRoute);
app.use("/api/services", servicesRoute);

// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
