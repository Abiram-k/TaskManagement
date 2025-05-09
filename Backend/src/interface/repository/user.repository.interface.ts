import { IRegister, IUser, Task, taskStatus } from "../../types";

export interface IUserRepository<T> {
  create(data: IRegister): Promise<void>;
  findByEmail(email: string): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  addTask(userId: string, data: Task): Promise<void>;
  updateTask(userId: string, data: Task): Promise<void>;
  deleteTask(userId: string, taskId: string): Promise<void>;
  toggleStatus(
    userId: string,
    taskId: string,
    status: taskStatus
  ): Promise<void>;
}
