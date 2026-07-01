import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import Home from "@/pages/home/Home";
import Session from "@/pages/session/Session";
import Statistic from "@/pages/statistic/Statistic";
import Options from "@/pages/options/Options";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/session",
        element: <Session />,
      },
      {
        path: "/statistic",
        element: <Statistic />,
      },
      {
        path: "/options",
        element: <Options />,
      },
    ],
  },
]);
