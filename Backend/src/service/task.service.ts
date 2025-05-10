import { HttpStatusCode } from "../constants";
import { ITaskService } from "../interface/service/task.service.interface";
import { UserRepository } from "../repository/user.repository";
import { getIO, getSocketIdByUserId } from "../utils/socket";
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
      const tasks = user.tasks.find((task) => task._id == taskId);
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
      const io = getIO();
      const socketId = getSocketIdByUserId(userId);
      if (!socketId) {
        console.log("Failed to find socked id");
        throw createHttpError(
          HttpStatusCode.NOT_FOUND,
          "Socket id not founded"
        );
      }
      const task: Task[] | null = await this._userRepo.addTask(userId, data);
      if (!task) {
        throw createHttpError(
          HttpStatusCode.NOT_IMPLEMENTED,
          "Failed to add task"
        );
      }
      io.to(socketId).emit("task_updated", task);
    } catch (error) {
      throw error;
    }
  }

  async updateTask(userId: string, taskId: string, data: Task): Promise<void> {
    try {
      if (!userId) {
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "User id not fouded"
        );
      }
      const io = getIO();
      const socketId = getSocketIdByUserId(userId);
      if (!socketId) {
        console.log("Failed to find socked id");
        throw createHttpError(
          HttpStatusCode.NOT_FOUND,
          "Socket id not founded"
        );
      }
      const task: Task[] | null = await this._userRepo.updateTask(userId, data);
      if (!task) {
        throw createHttpError(
          HttpStatusCode.NOT_IMPLEMENTED,
          "Failed to update task"
        );
      }
      io.to(socketId).emit("task_updated", task);
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
      const io = getIO();
      const socketId = getSocketIdByUserId(userId);
      if (!socketId) {
        console.log("Failed to find socked id");
        throw createHttpError(
          HttpStatusCode.NOT_FOUND,
          "Socket id not founded"
        );
      }
      const task: Task[] | null = await this._userRepo.toggleStatus(
        userId,
        taskId,
        status
      );
      if (!task) {
        throw createHttpError(
          HttpStatusCode.NOT_IMPLEMENTED,
          "Failed to update status"
        );
      }
      io.to(socketId).emit("task_updated", task);
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
      const io = getIO();
      const socketId = getSocketIdByUserId(userId);
      if (!socketId) {
        console.log("Failed to find socked id");
        throw createHttpError(
          HttpStatusCode.NOT_FOUND,
          "Socket id not founded"
        );
      }
      const task: Task[] | null = await this._userRepo.deleteTask(
        userId,
        taskId
      );

      if (!task) {
        throw createHttpError(
          HttpStatusCode.NOT_IMPLEMENTED,
          "Failed to delete task"
        );
      }
      io.to(socketId).emit("task_updated", task);
    } catch (error) {
      throw error;
    }
  }
}
