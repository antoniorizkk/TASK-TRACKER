import express, { urlencoded } from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import taskRouter from "./routes/task.routes.js";

connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(urlencoded());

app.use("/tasks",taskRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});