import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // add path here once
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/events", eventRoutes);

// Serve React frontend build
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
