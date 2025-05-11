import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../constants";
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res
            .status(HttpStatusCode.UNAUTHORIZED)
            .json({ message: "No token provided" });
        console.log("No token founded , in jwt middleware");
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Invalid or expired token");
            return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json({ message: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};
