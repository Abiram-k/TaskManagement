import { HttpStatusCode } from "../constants";
import { IAuthService } from "../interface/service/auth.service.interface";
import { UserRepository } from "../repository/user.repository";
import createHttpError from "http-errors";
import { ILogin, IRegister } from "../types";
import { hashPassword } from "../utils/hashPassword";
import { comparePassword } from "../utils/comparePassword";
import { generateAccessToken } from "../utils/generateAccessToken";
import { generateRefreshToken } from "../utils/generateRefreshToken";

export class AuthService implements IAuthService {
  private _userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this._userRepo = userRepo;
  }

  async login(
    data: ILogin
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { email, password } = data;
      const user = await this._userRepo.findByEmail(email);
      if (!user) {
        throw createHttpError(
          HttpStatusCode.NOT_FOUND,
          "Email is not registered"
        );
      }
      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        throw createHttpError(HttpStatusCode.BAD_REQUEST, "Invalid password");
      }
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async register(data: IRegister): Promise<void> {
    try {
      const { firstName, email, password } = data;
      if (!firstName || !email || !password) {
        throw createHttpError(
          HttpStatusCode.BAD_GATEWAY,
          "Please fill all fields"
        );
      }
      const isUserExisit = await this._userRepo.findByEmail(email);
      if (isUserExisit) {
        throw createHttpError(
          HttpStatusCode.NOT_FOUND,
          "Email already registered"
        );
      }
      const hashedPassword = await hashPassword(password);
      if (!hashedPassword) {
        console.log("No hashed password founded");
        return;
      }
      data.password = hashedPassword;
      await this._userRepo.create(data);
    } catch (error) {
      throw error;
    }
  }

  
}
