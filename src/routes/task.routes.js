import express from "express"
import taskControllers from "../controllers/task.controllers.js";

const router = express.Router();

router.post("/", taskControllers.insertTask);
router.put("/:id",taskControllers.updateTask);
router.delete("/:id",taskControllers.deleteTask);
router.get("/todo",taskControllers.listTodoTask);

export default router;