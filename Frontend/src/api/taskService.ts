import type { axiosResponse, Task, taskStatus } from "@/types";
import type { HttpService } from "./httpService";

export class TaskService {
  private _httpService: HttpService;
  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }
  async getSelectedTask(
    taskId: string
  ): Promise<axiosResponse & { task: Task }> {
    return this._httpService.get(`/task/${taskId}`);
  }
  async getAllTasks(): Promise<axiosResponse & { tasks: Task[] }> {
    return this._httpService.get("/tasks");
  }
  async addTask(data: Task): Promise<axiosResponse> {
    return this._httpService.post("/task", data);
  }
  async updateTask(taskId: string, data: Task): Promise<axiosResponse> {
    return this._httpService.put(`/task/${taskId}`, data);
  }
  async deleteTask(taskId: string): Promise<axiosResponse> {
    return this._httpService.delete(`/task?taskId=${taskId}`);
  }
  async toggleStatus(
    taskId: string,
    status: taskStatus
  ): Promise<axiosResponse> {
    return this._httpService.patch(`/task/${taskId}?status=${status}`);
  }
}
