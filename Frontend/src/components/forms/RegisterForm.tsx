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
import { ErrorMessage } from "../ui/ErrorMessage";
import {
  registerSchema,
  type registerSchemaType,
} from "@/validationSchema/registerSchema";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/auth/useRegister";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useRegister();

  const onSubmit = (data: registerSchemaType) => {
    mutate(data);
  };
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className=""
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && (
                    <ErrorMessage message={String(errors.password.message)} />
                  )}
                </div>
              </div>

              {/* Confirm Password field */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className=""
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <ErrorMessage
                      message={String(errors.confirmPassword.message)}
                    />
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                {isPending ? "Registering ..." : "Sign up"}
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
