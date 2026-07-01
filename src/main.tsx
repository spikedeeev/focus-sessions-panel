import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/providers/router";
import { TasksProvider } from "./app/context/tasks/TasksProvider";
import { SettingsProvider } from "./app/context/settings/SettingsProvider";
import { TimerProvider } from "./app/context/timer/TimerProvider";
import { StatsProvider } from "./app/context/stats/StatsProvider";
import { NotificationProvider } from "./app/context/notification/NotificationProvider";
import "./app/styles/globals.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TasksProvider>
    <SettingsProvider>
      <TimerProvider>
        <StatsProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </StatsProvider>
      </TimerProvider>
    </SettingsProvider>
  </TasksProvider>,
);
