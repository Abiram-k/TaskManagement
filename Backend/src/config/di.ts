import { AuthController } from "../controller/auth.controller";
import { IAuthController } from "../interface/controller/auth.controller.interface";
import { IUserRepository } from "../interface/repository/user.repository.interface";
import { IAuthService } from "../interface/service/auth.service.interface";
import { ITaskService } from "../interface/service/task.service.interface";
import { UserRepository } from "../repository/user.repository";
import { AuthService } from "../service/auth.service";
import { TaskService } from "../service/task.service";
import { IUser } from "../types";

// Repository
const userRepository: IUserRepository<IUser> = new UserRepository();

// Service
const taskService: ITaskService = new TaskService(userRepository);
const authService: IAuthService = new AuthService(userRepository);

// controller
const authController: IAuthController = new AuthController(authService);

export { taskService, authService,authController };
