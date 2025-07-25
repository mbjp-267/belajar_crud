import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import User from "./models/UserModel.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://belajar-crud-lovat.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use('/users', UserRoute);

// Jalankan server setelah database berhasil connect
const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("✅ Database connected...");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

startServer();
