import mongoose from "mongoose";
import "dotenv/config"

export function connectDB (){
     mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Database connected!"))
    .catch ( (err) => {
        console.error(err);
    });
}