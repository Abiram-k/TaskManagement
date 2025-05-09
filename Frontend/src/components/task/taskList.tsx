import { useState } from "react"
import { Clock, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "@/types"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (task: Task) => void
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)

  const toggleTaskExpansion = (id: string) => {
    setExpandedTaskId(expandedTaskId === id ? null : id)
  }

  const handleStatusChange = (task: Task, checked: boolean) => {
    onStatusChange({
      ...task,
      status: checked ? "completed" : task.status === "overdue" ? "overdue" : "pending",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "overdue":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "pending":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No tasks found</h3>
        <p className="text-muted-foreground mt-1">Add a new task to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.taskId}
          className={`border rounded-lg transition-all ${task.status === "completed" ? "bg-muted/50" : ""}`}
        >
          <div className="p-4 flex items-start gap-3 cursor-pointer" onClick={() => toggleTaskExpansion(task.taskId)}>
            <div className="pt-0.5">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={(checked) => handleStatusChange(task, checked as boolean)}
                onClick={(e) => e.stopPropagation()}
                className="h-5 w-5"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3
                  className={`font-medium truncate ${
                    task.status === "completed" ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className={`${getPriorityColor(task.priority)} capitalize`}>
                    {task.priority}
                  </Badge>
                  <Badge variant="secondary" className={`${getStatusColor(task.status)} capitalize`}>
                    {task.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(task)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(task.taskId)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {expandedTaskId === task.taskId && (
            <div className="px-4 pb-4 pt-0 ml-8">
              <p className="text-sm text-muted-foreground mb-2">{task.description || "No description provided."}</p>
              <div className="text-xs text-muted-foreground">
                Created: {format(new Date(task.createdAt), "MMM d, yyyy")}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
