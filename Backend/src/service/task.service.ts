import { ITaskService } from "../interface/service/task.service.interface";
import { UserRepository } from "../repository/user.repository";

export class TaskService implements ITaskService {
  private _userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this._userRepo = userRepo;
  }
}
