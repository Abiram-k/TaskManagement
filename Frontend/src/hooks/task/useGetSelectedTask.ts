import { HttpService } from "@/api/httpService";
import { TaskService } from "@/api/taskService";
import { useQuery } from "@tanstack/react-query";

export const useGetSelectedTasks = (taskId: string) => {
  const httpService = new HttpService();
  const taskService = new TaskService(httpService);
  return useQuery({
    queryKey: ["task"],
    queryFn: () => taskService.getSelectedTask(taskId),
  });
};
