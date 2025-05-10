export type axiosResponse = {
  success: boolean;
  message: string;
};

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  firstName: string;
  password: string;
}

export type taskStatus = "pending" | "completed" | "overdue"

export type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  createdAt: Date;
};