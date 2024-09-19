// ?React imports
import { useState } from "react";
// ?Component imports
import TimerDisplay from "../TimerDisplay/TimerDisplay";

// ?Other Imports

// TODO for this component
// 1) Add a timer
// 2) Add a start and stop button
// 3) Add a pomodoro counter
// 4) Define interface for TypeScript.
// TODO: Extra Notes
// Split the Timer into Controls and Display.
// Setup pieces of state to pass down into the Controls and Display

// Define TimerStatus enum for managing the state of the timer
enum TimerStatus {
  Running = "running",
  Paused = "paused",
  Stopped = "stopped",
}

const PomodoroTimer = () => {
  // ?State for the timer and controls
  // Time remaining
  const [timeRemaining, setTineRemaining] = useState<number>(25 * 60);
  //time status
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.Stopped);
  // Sessions for the Pomodoro
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  // ?Handler Functions for the Controls

  const handleStart = () => {
    setStatus(TimerStatus.Running);
  };

  const handlePause = () => {
    setStatus(TimerStatus.Paused);
  };

  const handleReset = () => {
    setStatus(TimerStatus.Stopped);
    //  resetting the timer to twenty-five mins
    setTimeRemaing(25 * 60);
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      {/* Pass state and handlers to TimerDisplay and TimerControls */}

      <TimerDisplay
        timeRemaining={timeRemaining}
        pomodoroCount={pomodoroCount}
      />
      {/* <TimerControls status={status} onStart={handleStart} onPause={handlePause} onReset={handleReset} /> */}
    </div>
  );
};

export default PomodoroTimer;
