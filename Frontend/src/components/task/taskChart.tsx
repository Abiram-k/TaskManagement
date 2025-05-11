import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/types";

const COLORS = [
  "#6366f1",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#ec4899",
];

interface TaskChartProps {
  tasks: Task[];
}

export default function TaskChart({ tasks }: TaskChartProps) {
  const chartData = useMemo(() => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      {
        name: "Completed",
        value: statusCounts.completed || 0,
        color: "#10b981",
      },
      {
        name: "Pending",
        value: statusCounts.pending || 0,
        color: "#3b82f6",
      },
      {
        name: "Overdue",
        value: statusCounts.overdue || 0,
        color: "#ef4444",
      },
    ];
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">No tasks to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 ">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-xl sm:text-3xl font-bold">{totalTasks}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Total Tasks
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-xl sm:text-3xl font-bold">
              {completionRate}%
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Completion Rate
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={8}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={1.5}
                  strokeOpacity={0.9}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ payload }) => (
                <div className="bg-background/95 backdrop-blur-sm p-2 rounded-lg shadow-lg border">
                  <p className="font-medium">{payload?.[0]?.name}</p>
                  <p className="text-sm">{payload?.[0]?.value} tasks</p>
                </div>
              )}
            />
            <Legend
              wrapperStyle={{
                fontSize: "14px",
                paddingTop: "16px",
              }}
              formatter={(value) => (
                <span className="text-sm text-foreground/80">{value}</span>
              )}
              payload={chartData.map((item, index) => ({
                id: item.name,
                value: item.name,
                type: "square",
                color: COLORS[index % COLORS.length],
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
