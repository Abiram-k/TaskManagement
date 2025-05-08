import { ILogin, IRegister } from "../../types";

export interface IAuthService {
  login(data: ILogin): Promise<{ accessToken: string; refreshToken: string }>;
  register(data: IRegister): Promise<void>;
}
