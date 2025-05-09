import { AuthService } from "@/api/authService";
import { HttpService } from "@/api/httpService";
import type { ILogin } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
  const httpService = new HttpService();
  const authService = new AuthService(httpService);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: ILogin) => authService.login("/auth/register", data),
    onSuccess: () => {
        navigate("/auth/login");
        toast.success("User registered, login now!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to register, Try again");
    },
  });

  return { ...mutation };
};
