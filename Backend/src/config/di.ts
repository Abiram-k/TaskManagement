import { AuthController } from "../controller/auth.controller.js";
import { TaskController } from "../controller/task.controller.js";
import { IAuthController } from "../interface/controller/auth.controller.interface.js";
import { ITaskController } from "../interface/controller/task.controller.interface.js";
import { IUserRepository } from "../interface/repository/user.repository.interface.js";
import { IAuthService } from "../interface/service/auth.service.interface.js";
import { ITaskService } from "../interface/service/task.service.interface.js";
import { UserRepository } from "../repository/user.repository.js";
import { AuthService } from "../service/auth.service.js";
import { TaskService } from "../service/task.service.js";
import { IUser } from "../types.js";

// Repository
const userRepository: IUserRepository<IUser> = new UserRepository();

// Service
const taskService: ITaskService = new TaskService(userRepository);
const authService: IAuthService = new AuthService(userRepository);

// controller
const authController: IAuthController = new AuthController(authService);
const taskController:ITaskController = new TaskController(taskService);

export { taskService, authService,authController,taskController };
