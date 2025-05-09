import { NextFunction, Request, Response } from "express";

export interface ITaskController {
  addTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  toggleStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void>;
  getSelectedTask(req: Request, res: Response, next: NextFunction): Promise<void>;
}
