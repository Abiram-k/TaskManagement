import { HttpService } from "@/api/httpService";
import { TaskService } from "@/api/taskService";
import type { Task } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTask = () => {
  const httpService = new HttpService();
  const taskService = new TaskService(httpService);
  // const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: Task) => taskService.addTask(data),
    onSuccess: () => {
      toast.success("Task added successfully");
      // queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add Task");
    },
  });

  return { ...mutation };
};
