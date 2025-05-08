import { IUserRepository } from "../interface/repository/user.repository.interface";
import { IRegister, IUser } from "../types";
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
}
