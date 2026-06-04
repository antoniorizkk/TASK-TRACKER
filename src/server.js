import express from "express";
import "dotenv/config"
import { connectDB } from "./config/db.js";

connectDB();
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});