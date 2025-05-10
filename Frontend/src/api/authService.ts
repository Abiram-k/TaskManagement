import type { axiosResponse, ILogin, IRegister } from "@/types";
import type { HttpService } from "./httpService";

export class AuthService {
  private httpService: HttpService;
  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async login(url: string, data: ILogin): Promise<{ accessToken: string }> {
    return this.httpService.post(url, data);
  }
  async register(url: string, data: IRegister): Promise<axiosResponse> {
    return this.httpService.post(url, data);
  }
  async logout(url: string): Promise<axiosResponse> {
    return this.httpService.post(url, {});
  }
}
