import HomePage from "@/page/HomePage";
import ProtectLogin from "@/protected/ProtectLogin";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectLogin>
        <HomePage />
      </ProtectLogin>
    ),
  },
];
