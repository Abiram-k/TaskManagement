import { Task, taskStatus } from "../../types";

export interface ITaskService {
  getSelectedTask(userId: string, taskId: string): Promise<Task | null>;
  getAllTasks(userId: string): Promise<Task[]>;
  addTask(userId: string, data: Task): Promise<void>;
  updateTask(userId: string, taskId: string, data: Task): Promise<void>;
  deleteTask(userId: string, taskId: string): Promise<void>;
  toggleStatus(
    userId: string,
    taskId: string,
    status: taskStatus
  ): Promise<void>;
}
