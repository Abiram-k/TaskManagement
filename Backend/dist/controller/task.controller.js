import { HttpStatusCode } from "../constants";
export class TaskController {
    _taskService;
    constructor(taskService) {
        this._taskService = taskService;
    }
    async getAllTasks(req, res, next) {
        try {
            const { userId } = req.user;
            const tasks = await this._taskService.getAllTasks(userId);
            res.status(HttpStatusCode.OK).json({
                message: "Successfully fetched all tasks",
                success: true,
                tasks,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getSelectedTask(req, res, next) {
        try {
            const { taskId } = req.params;
            const { userId } = req.user;
            const task = await this._taskService.getSelectedTask(userId, taskId);
            res.status(HttpStatusCode.OK).json({
                message: "Successfully fetched selected task",
                success: true,
                task,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async addTask(req, res, next) {
        try {
            const { userId } = req.user;
            await this._taskService.addTask(userId, req.body);
            res.status(HttpStatusCode.OK).json({
                message: "Successfully added tasks",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateTask(req, res, next) {
        try {
            const { userId } = req.user;
            const { taskId } = req.params;
            await this._taskService.updateTask(userId, taskId, req.body);
            res.status(HttpStatusCode.OK).json({
                message: "Successfully updated tasks",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async toggleStatus(req, res, next) {
        try {
            const { userId } = req.user;
            const { taskId } = req.params;
            const status = req.query.status;
            if (!status) {
                throw new Error("Status query parameter is required");
            }
            await this._taskService.toggleStatus(userId, taskId, status);
            res.status(HttpStatusCode.OK).json({
                message: "Successfully toggled task status",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteTask(req, res, next) {
        try {
            const { userId } = req.user;
            const { taskId } = req.query;
            await this._taskService.deleteTask(userId, taskId);
            res.status(HttpStatusCode.OK).json({
                message: "Successfully deleted tasks",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
