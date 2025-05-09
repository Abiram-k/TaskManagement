import { HttpService } from "@/api/httpService";
import { TaskService } from "@/api/taskService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTasks = () => {
  const httpService = new HttpService();
  const taskService = new TaskService(httpService);
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getAllTasks(),
  });
};
