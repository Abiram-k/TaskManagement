import { useRoutes, type RouteObject } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";

const routes:RouteObject[] = [... publicRoutes]

export const AppRoutes = ()=> useRoutes(routes)