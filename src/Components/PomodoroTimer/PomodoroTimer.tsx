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

// Define SessionTypes Enums

enum SessionType {
  Pomodoro = "pomodoro",
  ShortBreak = "short-break",
  LongBreak = "long-break",
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
  // SessionType for breaks or Pomodoro
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.Pomodoro
  );
  // break duration for Pomodoros
  const [breakDuration, setBreakDuration] = useState<number>(5 * 60); // Default short break (5 minutes)

  // console.log("the interval id is", intervalId);
  // console.log("the status  is", status);
  // console.log("The time remaining is,", timeRemaining);

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
            handleSessionSwitch();
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

  // Switch between Pomodoro and Breaks
  const handleSessionSwitch = () => {
    if (sessionType === SessionType.Pomodoro) {
      //? Switch to short break after Pomodoro
      setSessionType(SessionType.ShortBreak);
      // Set Break time
      setTimeRemaining(breakDuration);
    } else {
      // Switch back to Pomodoro after break
      setSessionType(SessionType.Pomodoro);
      // Set Pomodoro time
      setTimeRemaining(25 * 60);
    }
  };
  // Dropdown Handler for session type
  const handleBreakDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const breakValue = parseInt(event.target.value, 10);
    // convert the mins to seconds
    setBreakDuration(breakValue * 60);
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
      <TimerDisplay
        timeRemaining={timeRemaining}
        pomodoroCount={pomodoroCount}
        sessionType={sessionType}
      />
      <div className="BreakControls">
        <label htmlFor="breakDuration">Select Break duration:</label>
        <select id="breakDuration" onChange={handleBreakDurationChange}>
          <option value="5">Short break (5mins)</option>
          <option value="10">Short break (10 minutes)</option>
          <option value="15">Long Break(15 minutes)</option>
          <option value="20">Long Break (20 minutes)</option>
          <option value="25">Long Break (25 minutes)</option>
          <option value="30">Long Break (30 minutes)</option>
        </select>
      </div>
      <TimerControls
        status={status}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        customTime={customTime}
        onCustomTimeChange={handleCustomTimeDurationChange}
        onSetCustomTime={handleSetCustomTime}
      />
    </div>
  );
};

export default PomodoroTimer;
