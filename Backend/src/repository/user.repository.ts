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

  async findUserHavingOverDue(): Promise<IUser[]> {
    try {
      const now = new Date();
      return await User.find({
        tasks: {
          $elemMatch: {
            dueDate: { $lt: now },
            status: "pending",
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async addTask(userId: string, data: Task): Promise<Task[] | null> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { tasks: data } },
        { new: true }
      );
      if (!updatedUser) return null;
      return updatedUser.tasks;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(userId: string, data: Task): Promise<Task[] | null> {
    try {
      await User.updateOne(
        { _id: userId, "tasks._id": data._id },
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

      const user = await User.findById(userId).select("tasks");
      return user?.tasks ?? null;
    } catch (error) {
      throw error;
    }
  }

  async toggleStatus(
    userId: string,
    taskId: string,
    status: taskStatus
  ): Promise<Task[] | null> {
    try {
      await User.updateOne(
        { _id: userId, "tasks._id": taskId },
        {
          $set: {
            "tasks.$.status": status,
          },
        }
      );

      const user = await User.findById(userId).select("tasks");
      return user?.tasks ?? null;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<Task[] | null> {
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { tasks: { _id: taskId } },
      });

      const user = await User.findById(userId).select("tasks");
      return user?.tasks ?? null;
    } catch (error) {
      throw error;
    }
  }
}
