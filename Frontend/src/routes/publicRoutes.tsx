import type { RouteObject } from "react-router-dom";
import LoginPage from "@/page/LoginPage";
import RegisterPage from "@/page/RegisterPage";

export const publicRoutes:RouteObject[] = [
    {path:"/auth/login",element:<LoginPage/>},
    {path:"/auth/register",element:<RegisterPage/>},
]