import { HttpService } from "@/api/httpService";
import { TaskService } from "@/api/taskService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTask = () => {
  const httpService = new HttpService();
  const taskService = new TaskService(httpService);
  const mutation = useMutation({
    mutationFn: (taskId: string) => taskService.deleteTask(taskId),
    onSuccess: () => {
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete Task");
    },
  });

  return { ...mutation };
};
