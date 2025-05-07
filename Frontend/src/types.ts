export type axiosResponse = {
  success: boolean;
  message: string;
};

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  firstName: string;
  password: string;
}
