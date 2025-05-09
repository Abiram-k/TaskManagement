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
import {
  loginSchema,
  type loginSchemaType,
} from "@/validationSchema/LoginSchema";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/auth/useLogin";
import Spinner from "../ui/Spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: loginSchemaType) => {
    mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div>
                  <Input
                    id="email"
                    type="email"
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
                    placeholder="Enter you password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <ErrorMessage message={String(errors.password.message)} />
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="underline underline-offset-4"
              >
                {isPending ? "Please wait ..." : "Sign up"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
