import type { RouteObject } from "react-router-dom";
import LoginPage from "@/page/LoginPage";
import RegisterPage from "@/page/RegisterPage";
import ProtectHome from "@/protected/ProtectHome";

export const publicRoutes: RouteObject[] = [
  {
    path: "/auth/login",
    element: (
      <ProtectHome>
        <LoginPage />
      </ProtectHome>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <ProtectHome>
        <RegisterPage />
      </ProtectHome>
    ),
  },
];
