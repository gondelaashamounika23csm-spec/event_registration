import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "../models/eventModel.js"; // adjust path
dotenv.config();

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const events = await Event.find({});
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const newEvent = await Event.create(req.body);
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
