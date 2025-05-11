import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types.js";
import { HttpStatusCode } from "../constants.js";

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

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err) {
        console.log("Invalid or expired token");
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ message: "Invalid or expired token" }) ;
      }
      req.user = decoded;
      next();
    }
  );
};
