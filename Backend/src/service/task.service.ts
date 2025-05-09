import { HttpStatusCode } from "../constants";
import { ITaskService } from "../interface/service/task.service.interface";
import { UserRepository } from "../repository/user.repository";
import { Task, taskStatus } from "../types";
import createHttpError from "http-errors";

export class TaskService implements ITaskService {
  private _userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this._userRepo = userRepo;
  }

  async getAllTasks(userId: string): Promise<Task[]> {
    try {
      if (!userId) {
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "User id not fouded"
        );
      }
      const user = await this._userRepo.findById(userId);
      if (!user) {
        throw createHttpError(HttpStatusCode.NOT_FOUND, "User not fouded");
      }
      const tasks: Task[] = user.tasks;
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getSelectedTask(userId: string, taskId: string): Promise<Task | null> {
    try {
      if (!userId) {
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "User id not fouded"
        );
      }
      if (!taskId) {
        throw createHttpError(HttpStatusCode.NOT_FOUND, "task id not fouded");
      }
      const user = await this._userRepo.findById(userId);
      if (!user) {
        throw createHttpError(HttpStatusCode.NOT_FOUND, "User not fouded");
      }
      if (!user.tasks.length) {
        return null;
      }
      const tasks = user.tasks.find((task) => task.taskId == taskId);
      return tasks ? tasks : null;
      
    } catch (error) {
      throw error;
    }
  }

  async addTask(userId: string, data: Task): Promise<void> {
    try {
      if (!userId) {
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "User id not fouded"
        );
      }
      await this._userRepo.addTask(userId, data);
    } catch (error) {
      throw error;
    }
  }

  async updateTask(userId: string, data: Task): Promise<void> {
    try {
      if (!userId) {
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "User id not fouded"
        );
      }
      await this._userRepo.updateTask(userId, data);
    } catch (error) {
      throw error;
    }
  }

  async toggleStatus(
    userId: string,
    taskId: string,
    status: taskStatus
  ): Promise<void> {
    try {
      if (!userId) {
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "User id not fouded"
        );
      }
      await this._userRepo.toggleStatus(userId, taskId, status);
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    try {
      if (!userId) {
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "User id not fouded"
        );
      }
      await this._userRepo.deleteTask(userId, taskId);
    } catch (error) {
      throw error;
    }
  }
}
