import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type loginSchemaType } from "@/validationSchema/LoginSchema";
import { ErrorMessage } from "../ui/ErrorMessage";
import {
  registerSchema,
  type registerSchemaType,
} from "@/validationSchema/registerSchema";
import { Link } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: registerSchemaType) => {
    console.log("Register Data:", data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your Details below to create new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Name </Label>
                <div>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Your name"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <ErrorMessage message={String(errors.firstName.message)} />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div>
                  <Input
                    id="email"
                    type="text"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <ErrorMessage message={String(errors.email.message)} />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
<div>

                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  />
                {errors.password && (
                    <ErrorMessage message={String(errors.password.message)} />
                )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div>

                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  />
                {errors.confirmPassword && (
                    <ErrorMessage
                    message={String(errors.confirmPassword.message)}
                    />
                )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Alread have an account?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
