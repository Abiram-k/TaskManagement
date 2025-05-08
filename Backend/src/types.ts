import { Document } from "mongoose";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Task {
  title: string;
  description: string;
  status: "completed" | "pending" | "in-progress";
}

export interface IUser extends Document {
  _id: string;
  firstName: string;
  email: string;
  password: string;
  tasks?: Task[];
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