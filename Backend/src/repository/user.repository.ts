import { IUserRepository } from "../interface/repository/user.repository.interface";
import { IRegister, IUser, Task, taskStatus } from "../types";
import User from "../model/user.model";

export class UserRepository implements IUserRepository<IUser> {
  async create(data: IRegister): Promise<void> {
    try {
      await User.create(data);
    } catch (error) {
      throw error;
    }
  }
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async addTask(userId: string, data: Task): Promise<void> {
    try {
      await User.findByIdAndUpdate(
        userId,
        { $push: { tasks: data } },
        { new: true, useFindAndModify: false }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateTask(userId: string, data: Task): Promise<void> {
    try {
      await User.updateOne(
        { _id: userId, "tasks.taskId": data.taskId },
        {
          $set: {
            "tasks.$.title": data.title,
            "tasks.$.description": data.description,
            "tasks.$.dueDate": data.dueDate,
            "tasks.$.status": data.status,
            "tasks.$.priority": data.priority,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async toggleStatus(
    userId: string,
    taskId: string,
    status: taskStatus
  ): Promise<void> {
    try {
      await User.updateOne(
        { _id: userId, "tasks.taskId": taskId },
        {
          $set: {
            "tasks.$.status": status,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { tasks: { taskId } },
      });
    } catch (error) {
      throw error;
    }
  }
}
