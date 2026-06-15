import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Shop from "../pages/shop/page";
import Marketplace from "../pages/marketplace/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;