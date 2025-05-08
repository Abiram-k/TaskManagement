import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};
