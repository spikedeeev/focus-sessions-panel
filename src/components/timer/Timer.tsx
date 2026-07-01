import TimerView from "@/widgets/timer/TimerView";
import TimerControls from "@/widgets/timer/TimerControls";
import { useTasks } from "@/app/context/tasks/useContext";

function Timer() {
  const { state } = useTasks();
  return (
    <>
      <TimerView />
      {state.currentTaskId && <TimerControls />}
    </>
  );
}

export default Timer;
