import { z } from "zod";
const getDateWithoutTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const taskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required *" }),
  description: z.string().optional(),
  dueDate: z.coerce.date().refine(
    (date) => {
      const today = getDateWithoutTime(new Date());
      const selectedDate = getDateWithoutTime(date);
      return selectedDate >= today;
    },
    {
      message: "Due date must be today or in the future *",
    }
  ),
  status: z.enum(["pending", "completed", "overdue"]),
  priority: z.enum(["low", "medium", "high"]),
  createdAt: z.coerce.date(),
});

export type taskSchemaType = z.infer<typeof taskSchema>;
