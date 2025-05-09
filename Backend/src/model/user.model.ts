import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: [
      {
        taskId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        dueDate: { type: Date, required: true },
        status: {
          type: String,
          enum: ["pending", "completed", "overdue"],
          default: "pending",
        },
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [], 
  },
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
