import { AuthService } from "@/api/authService";
import { HttpService } from "@/api/httpService";
import type { ILogin } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const httpService = new HttpService();
  const authService = new AuthService(httpService);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: ILogin) => authService.login("/auth/login", data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to login, Try again");
    },
  });

  return { ...mutation };
};
