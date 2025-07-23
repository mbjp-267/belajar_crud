import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import User from "./models/UserModel.js";

const app = express();

app.use(cors({
    origin: "https://belajar-crud-lovat.vercel.app"
}));
app.use(express.json());
app.use(UserRoute);

// ✅ Ini dipanggil di luar
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
});

const connectDB = async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log("Database connected...");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

connectDB(); // jalanin koneksi, tapi server tetap jalan
