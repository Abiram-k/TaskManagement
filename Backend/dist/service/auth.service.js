import { HttpStatusCode } from "../constants.js";
import createHttpError from "http-errors";
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/comparePassword.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
export class AuthService {
    _userRepo;
    constructor(userRepo) {
        this._userRepo = userRepo;
    }
    async login(data) {
        try {
            const { email, password } = data;
            const user = await this._userRepo.findByEmail(email);
            if (!user) {
                throw createHttpError(HttpStatusCode.NOT_FOUND, "Email is not registered");
            }
            const isPasswordCorrect = await comparePassword(password, user.password);
            if (!isPasswordCorrect) {
                throw createHttpError(HttpStatusCode.BAD_REQUEST, "Invalid password");
            }
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);
            return { accessToken, refreshToken };
        }
        catch (error) {
            throw error;
        }
    }
    async register(data) {
        try {
            const { firstName, email, password } = data;
            if (!firstName || !email || !password) {
                throw createHttpError(HttpStatusCode.BAD_GATEWAY, "Please fill all fields");
            }
            const isUserExisit = await this._userRepo.findByEmail(email);
            if (isUserExisit) {
                throw createHttpError(HttpStatusCode.NOT_FOUND, "Email already registered");
            }
            const hashedPassword = await hashPassword(password);
            if (!hashedPassword) {
                console.log("No hashed password founded");
                return;
            }
            data.password = hashedPassword;
            await this._userRepo.create(data);
        }
        catch (error) {
            throw error;
        }
    }
}
