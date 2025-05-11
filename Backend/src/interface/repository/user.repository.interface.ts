import { IRegister, IUser, Task, taskStatus } from "../../types.js";

export interface IUserRepository<T> {
  create(data: IRegister): Promise<void>;
  findByEmail(email: string): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  addTask(userId: string, data: Task): Promise<Task[] | null>;
  updateTask(userId: string, data: Task): Promise<Task[] | null>;
  deleteTask(userId: string, taskId: string): Promise<Task[] | null>;
  toggleStatus(
    userId: string,
    taskId: string,
    status: taskStatus
  ): Promise<Task[] | null>;
  findUserHavingOverDue(): Promise<T[]>;
}
