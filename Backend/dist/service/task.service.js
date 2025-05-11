import { HttpStatusCode } from "../constants.js";
import { getIO, getSocketIdByUserId } from "../utils/socket.js";
import createHttpError from "http-errors";
export class TaskService {
    _userRepo;
    constructor(userRepo) {
        this._userRepo = userRepo;
    }
    async getAllTasks(userId) {
        try {
            if (!userId) {
                throw createHttpError(HttpStatusCode.UNAUTHORIZED, "User id not fouded");
            }
            const user = await this._userRepo.findById(userId);
            if (!user) {
                throw createHttpError(HttpStatusCode.NOT_FOUND, "User not fouded");
            }
            const tasks = user.tasks;
            return tasks;
        }
        catch (error) {
            throw error;
        }
    }
    async getSelectedTask(userId, taskId) {
        try {
            if (!userId) {
                throw createHttpError(HttpStatusCode.UNAUTHORIZED, "User id not fouded");
            }
            if (!taskId) {
                throw createHttpError(HttpStatusCode.NOT_FOUND, "task id not fouded");
            }
            const user = await this._userRepo.findById(userId);
            if (!user) {
                throw createHttpError(HttpStatusCode.NOT_FOUND, "User not fouded");
            }
            if (!user.tasks.length) {
                return null;
            }
            const tasks = user.tasks.find((task) => task._id == taskId);
            return tasks ? tasks : null;
        }
        catch (error) {
            throw error;
        }
    }
    async addTask(userId, data) {
        try {
            if (!userId) {
                throw createHttpError(HttpStatusCode.UNAUTHORIZED, "User id not fouded");
            }
            const io = getIO();
            const socketId = getSocketIdByUserId(userId);
            if (!socketId) {
                console.log("Failed to find socked id");
                throw createHttpError(HttpStatusCode.NOT_FOUND, "Socket id not founded");
            }
            const task = await this._userRepo.addTask(userId, data);
            if (!task) {
                throw createHttpError(HttpStatusCode.NOT_IMPLEMENTED, "Failed to add task");
            }
            io.to(socketId).emit("task_updated", task);
        }
        catch (error) {
            throw error;
        }
    }
    async updateTask(userId, taskId, data) {
        try {
            if (!userId) {
                throw createHttpError(HttpStatusCode.UNAUTHORIZED, "User id not fouded");
            }
            const io = getIO();
            const socketId = getSocketIdByUserId(userId);
            if (!socketId) {
                console.log("Failed to find socked id");
                throw createHttpError(HttpStatusCode.NOT_FOUND, "Socket id not founded");
            }
            const task = await this._userRepo.updateTask(userId, data);
            if (!task) {
                throw createHttpError(HttpStatusCode.NOT_IMPLEMENTED, "Failed to update task");
            }
            io.to(socketId).emit("task_updated", task);
        }
        catch (error) {
            throw error;
        }
    }
    async toggleStatus(userId, taskId, status) {
        try {
            if (!userId) {
                throw createHttpError(HttpStatusCode.UNAUTHORIZED, "User id not fouded");
            }
            const io = getIO();
            const socketId = getSocketIdByUserId(userId);
            if (!socketId) {
                console.log("Failed to find socked id");
                throw createHttpError(HttpStatusCode.NOT_FOUND, "Socket id not founded");
            }
            const task = await this._userRepo.toggleStatus(userId, taskId, status);
            if (!task) {
                throw createHttpError(HttpStatusCode.NOT_IMPLEMENTED, "Failed to update status");
            }
            io.to(socketId).emit("task_updated", task);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteTask(userId, taskId) {
        try {
            if (!userId) {
                throw createHttpError(HttpStatusCode.UNAUTHORIZED, "User id not fouded");
            }
            const io = getIO();
            const socketId = getSocketIdByUserId(userId);
            if (!socketId) {
                console.log("Failed to find socked id");
                throw createHttpError(HttpStatusCode.NOT_FOUND, "Socket id not founded");
            }
            const task = await this._userRepo.deleteTask(userId, taskId);
            if (!task) {
                throw createHttpError(HttpStatusCode.NOT_IMPLEMENTED, "Failed to delete task");
            }
            io.to(socketId).emit("task_updated", task);
        }
        catch (error) {
            throw error;
        }
    }
}
