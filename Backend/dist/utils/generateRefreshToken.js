import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
