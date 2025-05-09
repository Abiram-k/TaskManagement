import HomePage from "@/page/HomePage";
import type { RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
];
