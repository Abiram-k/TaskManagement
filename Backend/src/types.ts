import { Document } from "mongoose";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// export interface Task {
//   taskId: string;
//   title: string;
//   description: string;
//   dueDate: string;
//   status: string;
//   priority: string;
//   createdAt: string;
// }

export interface IUser extends Document {
  _id: string;
  firstName: string;
  email: string;
  password: string;
  tasks: Task[];
}

export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  firstName: string;
  email: string;
  password: string;
}

export interface DecodedToken extends JwtPayload {
  userId?: string;
}

export interface AuthRequest extends Request {
  user?: DecodedToken;
  headers: Request["headers"] & {
    authorization?: string;
  };
}

export type taskStatus = "pending" | "completed" | "overdue"
export type Task = {
  taskId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  createdAt: Date;
};