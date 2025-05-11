import { AuthController } from "../controller/auth.controller.js";
import { TaskController } from "../controller/task.controller.js";
import { UserRepository } from "../repository/user.repository.js";
import { AuthService } from "../service/auth.service.js";
import { TaskService } from "../service/task.service.js";
// Repository
const userRepository = new UserRepository();
// Service
const taskService = new TaskService(userRepository);
const authService = new AuthService(userRepository);
// controller
const authController = new AuthController(authService);
const taskController = new TaskController(taskService);
export { taskService, authService, authController, taskController };
