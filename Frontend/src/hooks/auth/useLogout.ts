import { AuthService } from "@/api/authService";
import { HttpService } from "@/api/httpService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
  const httpService = new HttpService();
  const authService = new AuthService(httpService);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => authService.logout("/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      navigate("/auth/login");
      toast.success("Logout out");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to logout, Try again");
    },
  });

  return { ...mutation };
};
