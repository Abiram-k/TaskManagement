import { IRegister, IUser } from "../../types";

export interface IUserRepository<T> {
  create(data: IRegister): Promise<void>;
  findByEmail(email: string): Promise<T | null>;
  findById(id: string): Promise<T | null>;
}
