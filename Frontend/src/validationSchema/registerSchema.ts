import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(4, "*Name must be atleast 4 charecters"),
    email: z.string().email("*Invalid email address"),
    password: z
      .string()
      .min(8, "*Password must be 8 charecters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "*Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "*password not matching",
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
