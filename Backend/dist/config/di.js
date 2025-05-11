import { AuthController } from "../controller/auth.controller";
import { TaskController } from "../controller/task.controller";
import { UserRepository } from "../repository/user.repository";
import { AuthService } from "../service/auth.service";
import { TaskService } from "../service/task.service";
// Repository
const userRepository = new UserRepository();
// Service
const taskService = new TaskService(userRepository);
const authService = new AuthService(userRepository);
// controller
const authController = new AuthController(authService);
const taskController = new TaskController(taskService);
export { taskService, authService, authController, taskController };
