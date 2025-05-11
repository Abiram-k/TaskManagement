import { HttpService } from "@/api/httpService";
import { TaskService } from "@/api/taskService";
import type { Task } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTask = () => {
  const httpService = new HttpService();
  const taskService = new TaskService(httpService);
  // const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Task }) =>
      taskService.updateTask(taskId, data),
    onSuccess: () => {
      toast.success("Task updated successfully");
      // queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update Task");
    },
  });

  return { ...mutation };
};
