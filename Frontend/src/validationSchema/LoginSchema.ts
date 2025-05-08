import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("*Invalid email address"),
  password: z
    .string()
    .min(8, "*Password must be 8 charecters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "*Password is incorrect"
    ),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
