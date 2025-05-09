import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";
import { HttpStatusCode } from "../constants";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "No token provided" });
    console.log("No token founded , in jwt middleware");
    return;
  }
  console.log("💫 Access Token From Auth Middleware: ", token);
  
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = decoded;
      next();
    }
  );
};
