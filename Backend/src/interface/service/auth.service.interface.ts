import { ILogin, IRegister } from "../../types.js";

export interface IAuthService {
  login(data: ILogin): Promise<{ accessToken: string; refreshToken: string }>;
  register(data: IRegister): Promise<void>;
}
