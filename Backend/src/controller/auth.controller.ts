import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interface/controller/auth.controller.interface";
import { IAuthService } from "../interface/service/auth.service.interface";
import { IRegister } from "../types";
import { HttpStatusCode } from "../constants";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export class AuthController implements IAuthController {
  private _authService: IAuthService;
  constructor(authService: IAuthService) {
    this._authService = authService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await this._authService.login({
        email,
        password,
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(HttpStatusCode.OK).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, firstName, password }: IRegister = req.body;
      await this._authService.register({ email, firstName, password });
      res
        .status(HttpStatusCode.OK)
        .json({ message: "User created", success: true });
    } catch (error) {
      next(error);
    }
  }

  async refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) {
        console.log("No refresh token founded");
        throw createHttpError(
          HttpStatusCode.UNAUTHORIZED,
          "Refresh token not found"
        );
      }
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
          if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
          }

          const { userId } = decoded;
          const accessToken = jwt.sign(
            { userId },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "15m" }
          );

          res.status(HttpStatusCode.CREATED).json({ accessToken });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (refreshToken) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
      }

      res.status(HttpStatusCode.OK).json({
        message: "Successfully logged out",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
