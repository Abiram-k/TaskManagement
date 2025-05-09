import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
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

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const { data: tasksData, isPending: tasksIsPending } = useGetAllTasks();
  console.log("All task data: ", tasksData);
  const { mutate: addTaskMutate, isPending: addingTask } = useAddTask();
  const { mutate: updateTaskMutate, isPending: updatingTask } = useUpdateTask();
  const { mutate: deleteTaskMutate, isPending: deletingTask } = useDeleteTask();
  const { mutate: toggleStatusMutate, isPending: statusUpdating } =
    useToggleStatusTask();

  useEffect(() => {
    if (tasksData?.tasks) setTasks(tasksData.tasks);
  }, [tasksData?.tasks]);

  // Check for overdue tasks every minute
  useEffect(() => {
    checkOverdueTasks();
    const interval = setInterval(() => {
      checkOverdueTasks();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   checkOverdueTasks(); // Recheck immediately when tasks change
  // }, [tasks]);

  const checkOverdueTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (
          task.status !== "completed" &&
          new Date(task.dueDate) < new Date()
        ) {
          return { ...task, status: "overdue" };
        }
        return task;
      })
    );
  };

  const handleAddTask = (task: Task) => {
    addTaskMutate(task);
    setTasks([
      ...tasks,
      {
        ...task,
        taskId: Date.now().toString(),
        createdAt: new Date(),
      },
    ]);
    // setIsAddingTask(false);
  };

  const handleUpdateTask = (task: Task) => {
    updateTaskMutate({ taskId: task.taskId, data: task });
    setTasks(tasks.map((t) => (t.taskId === task.taskId ? task : t)));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutate(taskId);
    setTasks(tasks.filter((task) => task.taskId !== taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleStatusChange = (task: Task) => {
    toggleStatusMutate({ taskId: task.taskId, status: task.status });
    setTasks(tasks.map((t) => (t.taskId === task.taskId ? task : t)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    return task.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* {(tasksIsPending || addingTask || updatingTask || deletingTask || statusUpdating) && <Spinner />} */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">
            Manage your tasks, track progress, and stay organized.
          </p>
        </div>
        <Button
          onClick={() => {
            setIsAddingTask(true);
            setEditingTask(null);
          }}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 ">
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
