import { HttpStatusCode } from "../constants.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
export class AuthController {
    _authService;
    constructor(authService) {
        this._authService = authService;
    }
    async login(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            const { email, firstName, password } = req.body;
            await this._authService.register({ email, firstName, password });
            res
                .status(HttpStatusCode.OK)
                .json({ message: "User created", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshAccessToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refresh_token;
            if (!refreshToken) {
                console.log("No refresh token founded");
                throw createHttpError(HttpStatusCode.UNAUTHORIZED, "Refresh token not found");
            }
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                const { userId } = decoded;
                const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
                res.status(HttpStatusCode.CREATED).json({ accessToken });
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
}
