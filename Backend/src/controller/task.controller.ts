import { Response, NextFunction } from "express";
import { ITaskController } from "../interface/controller/task.controller.interface.js";
import { ITaskService } from "../interface/service/task.service.interface.js";
import { HttpStatusCode } from "../constants.js";
import { AuthRequest, Task, taskStatus } from "../types.js";

export class TaskController implements ITaskController {
  private _taskService: ITaskService;
  constructor(taskService: ITaskService) {
    this._taskService = taskService;
  }

  async getAllTasks(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.user as { userId: string };

      const tasks: Task[] = await this._taskService.getAllTasks(userId);

      res.status(HttpStatusCode.OK).json({
        message: "Successfully fetched all tasks",
        success: true,
        tasks,
      });
      
    } catch (error) {
      next(error);
    }
  }

  async getSelectedTask(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const { userId } = req.user as { userId: string };
      const task = await this._taskService.getSelectedTask(userId, taskId);
      res.status(HttpStatusCode.OK).json({
        message: "Successfully fetched selected task",
        success: true,
        task,
      });
    } catch (error) {
      next(error);
    }
  }

  async addTask(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.user as { userId: string };
      await this._taskService.addTask(userId, req.body);
      res.status(HttpStatusCode.OK).json({
        message: "Successfully added tasks",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.user as { userId: string };
      const { taskId } = req.params;
      await this._taskService.updateTask(userId, taskId, req.body as Task);
      res.status(HttpStatusCode.OK).json({
        message: "Successfully updated tasks",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleStatus(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.user as { userId: string };
      const { taskId } = req.params;
      const status = req.query.status as taskStatus;
      if (!status) {
        throw new Error("Status query parameter is required");
      }

      await this._taskService.toggleStatus(userId, taskId, status);

      res.status(HttpStatusCode.OK).json({
        message: "Successfully toggled task status",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.user as { userId: string };
      const { taskId } = req.query;
      await this._taskService.deleteTask(userId, taskId as string);
      res.status(HttpStatusCode.OK).json({
        message: "Successfully deleted tasks",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
