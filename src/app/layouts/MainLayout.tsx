import { Outlet } from "react-router-dom";

import Header from "@/shared/ui/header/Header";
import TimerEngine from "@/widgets/timer/TimerEngine";

function MainLayout() {
  return (
    <>
      <Header />
      <TimerEngine />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
