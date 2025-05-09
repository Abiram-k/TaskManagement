import { Router } from "express";
import { taskController } from "../config/di";

const router = Router();

router.get("/tasks", taskController.getAllTasks.bind(taskController));
router.get(
  "/task/:taskId",
  taskController.getSelectedTask.bind(taskController)
);
router.put("/task", taskController.updateTask.bind(taskController));
router.post("/task", taskController.addTask.bind(taskController));
router.delete("/task", taskController.deleteTask.bind(taskController));
router.patch("/task", taskController.toggleStatus.bind(taskController));

export default router;
