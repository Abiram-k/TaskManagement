import { HttpService } from "@/api/httpService";
import { TaskService } from "@/api/taskService";
import type { taskStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleStatusTask = () => {
  const httpService = new HttpService();
  const taskService = new TaskService(httpService);
    const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: taskStatus }) =>
      taskService.toggleStatus(taskId, status),
    onSuccess: () => {
      toast.success("status updated");
            // queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status, Try again...");
    },
  });

  return { ...mutation };
};
