// ?React imports
import { useState, useEffect } from "react";
// ?Component imports
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import TimerControls from "../TimerControls/TimerControls";

// ?Other Imports

// TODO for this component
// 1) Add a timer
// 2) Add a start and stop button(DONE)
// 3) Add a pomodoro counter(DONE)
// 4) Define interface for TypeScript(DONE)
// TODO: Extra Notes
// Split the Timer into Controls and Display.
// Setup pieces of state to pass down into the Controls and Display
// ! problem: the timer is not ticking down when start is clicked.
// ? Add a useEffect to prevent memory leaks
// ? Create a handle function for the timer

// Define TimerStatus enum for managing the state of the timer
enum TimerStatus {
  Running = "running",
  Paused = "paused",
  Stopped = "stopped",
}

const PomodoroTimer = () => {
  // ?State for the timer and controls
  // Time remaining (default 25 minutes)
  const [timeRemaining, setTimeRemaining] = useState<number>(25 * 60);
  // Timer status
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.Stopped);
  // Sessions for the Pomodoro
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  // Interval ID to track the setInterval
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // Custom time duration
  const [customTime, setCustomTime] = useState<number>(25);

  console.log("the interval id is", intervalId);
  console.log("the status  is", status);
  console.log("The time remaining is,", timeRemaining);

  // ?Handler Functions for the Controls

  // Start the timer
  const handleStart = () => {
    setStatus(TimerStatus.Running);

    // If there's no interval running, start a new one
    if (!intervalId) {
      const id = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1; // Decrease time by 1 second
          } else {
            // Time reached 0, stop the timer
            clearInterval(id);
            setStatus(TimerStatus.Stopped);
            setPomodoroCount((prevCount) => prevCount + 1); // Increment pomodoro count
            return 0;
          }
        });
      }, 1000); // Decrease time every 1000ms (1 second)
      setIntervalId(id); // Save the interval ID so it can be cleared later
    }
  };

  // Pause the timer
  const handlePause = () => {
    setStatus(TimerStatus.Paused);

    if (intervalId) {
      clearInterval(intervalId); // Clear the interval
      setIntervalId(null); // Reset the interval ID
    }
  };

  // Reset the timer
  const handleReset = () => {
    setStatus(TimerStatus.Stopped);
    setTimeRemaining(25 * 60); // Reset to 25 minutes

    if (intervalId) {
      clearInterval(intervalId); // Clear the interval
      setIntervalId(null); // Reset the interval ID
    }
  };

  // Handler for custom time duration input
  const handleCustomTimeDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // create value
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value) && value > 0) {
      setCustomTime(value); // Update custom duration in minutes
    }
  };

  // Handler for setting custom time
  const handleSetCustomTime = () => {
    setTimeRemaining(customTime * 60); // Convert minutes to seconds
  };

  // Clean up when the component unmounts or the interval changes
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clean up interval on unmount
      }
    };
  }, [intervalId]);

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <div className="customControls">
        <label htmlFor="customTimeInput">
          Set Custom Pomodoro Duration (Minutes):
        </label>
        <input
          type="number"
          value={customTime}
          onChange={handleCustomTimeDurationChange}
          min="1"
        />
        <button onClick={handleSetCustomTime}>Set Custom Time</button>
      </div>
      <TimerDisplay
        timeRemaining={timeRemaining}
        pomodoroCount={pomodoroCount}
      />
      <TimerControls
        status={status}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        CustomTime={handleSetCustomTime}
        CustomTimeDuration={handleCustomTimeDurationChange}
      />
    </div>
  );
};

export default PomodoroTimer;
