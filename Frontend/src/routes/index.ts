import { useRoutes, type RouteObject } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

const routes: RouteObject[] = [...publicRoutes, ...privateRoutes];

export const AppRoutes = () => useRoutes(routes);
