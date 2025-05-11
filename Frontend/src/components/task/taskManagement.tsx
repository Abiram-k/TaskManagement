import { useState, useEffect, useRef } from "react";
import { LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/task/taskList";
import TaskForm from "@/components/task/taskForm";
import TaskChart from "@/components/task/taskChart";
import type { Task } from "@/types";
import { useGetAllTasks } from "@/hooks/task/useGetAllTasks";
import Spinner from "../ui/Spinner";
import { useAddTask } from "@/hooks/task/useAddTask";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";
import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import { useToggleStatusTask } from "@/hooks/task/useToggleStatus";
import { useLogout } from "@/hooks/auth/useLogout";
import { toast } from "sonner";
import { createSocket } from "@/utils/createSocket";

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const socketRef = useRef<any>(null);

  const { data: tasksData, isPending: tasksIsPending } = useGetAllTasks();
  const { mutate: addTaskMutate, isPending: addingTask } = useAddTask();
  const { mutate: updateTaskMutate, isPending: updatingTask } = useUpdateTask();
  const { mutate: deleteTaskMutate, isPending: deletingTask } = useDeleteTask();
  const { mutate: toggleStatusMutate, isPending: statusUpdating } =
    useToggleStatusTask();
  const { mutate: logoutMutate, isPending: loggingOut } = useLogout();

  useEffect(() => {
    if (tasksData?.tasks) setTasks(tasksData.tasks);
  }, [tasksData?.tasks]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.warning("Session expired, please login again.");
      return;
    }
    const socket = createSocket(token);
    socketRef.current = socket;
    socket.on("connect", () => {
      toast.success(" Real time connection established ");
    });
    socket.on("task_updated", (task: Task[]) => {
      setTasks(task);
    });
    socket.on("connect_error", (err: Error) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.off("task_updated");
      socket.disconnect();
    };
  }, []);

  const handleAddTask = (task: Task) => {
    addTaskMutate(task);
    setTasks([
      ...tasks,
      {
        ...task,
        _id: Date.now().toString(),
        createdAt: new Date(),
      },
    ]);
    setIsAddingTask(false);
  };

  const handleUpdateTask = (task: Task) => {
    updateTaskMutate({ taskId: task._id, data: task });
    setTasks(tasks.map((t) => (t._id === task._id ? task : t)));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutate(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleStatusChange = (task: Task) => {
    console.log("From handleStatusChange: ", task);
    toggleStatusMutate({ taskId: task._id, status: task.status });
    setTasks(tasks.map((t) => (t._id === task._id ? task : t)));
  };

  const handleLogout = () => {
    logoutMutate();
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    return task.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {(tasksIsPending ||
        loggingOut ||
        addingTask ||
        updatingTask ||
        deletingTask ||
        statusUpdating) && <Spinner />}
      <div className=" sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="md:mb-5  mb-3">
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">
            Manage your tasks, track progress, and stay organized.
          </p>
        </div>
        <div className="flex items-center justify-between w-full space-x-4">
          <Button
            onClick={() => {
              setIsAddingTask(true);
              setEditingTask(null);
            }}
            className="flex bg-green-500 shadow-md text-white hover:bg-green-600 items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Task
          </Button>

          <Button
            onClick={handleLogout}
            className="bg-red-500 shadow-md text-white hover:bg-red-600 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="md:inline hidden">Logout</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="m-0">
                  <TaskList
                    tasks={filteredTasks}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskChart tasks={tasks} />
            </CardContent>
          </Card>
        </div>
      </div>

      {(isAddingTask || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onCancel={() => {
            setIsAddingTask(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
