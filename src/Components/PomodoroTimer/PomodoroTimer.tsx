// ?React imports
import { useState, useEffect } from "react";
// ?Component imports
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import TimerControls from "../TimerControls/TimerControls";
import AlertManager from "../Notifications/AlertManager";

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
  const [timeRemaining, setTimeRemaining] = useState<number>(25 * 60); // Default 25 min
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.Stopped);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [customTime, setCustomTime] = useState<number>(25);
  const [sessionType, setSessionType] = useState<SessionType>(
    SessionType.Pomodoro
  );
  const [breakDuration, setBreakDuration] = useState<number>(5 * 60); // Default short break (5 minutes)

  // ? New: Flag to prevent multiple increments
  const [sessionJustSwitched, setSessionJustSwitched] =
    useState<boolean>(false);

  // ? New flag: Notification triggered when timeRemaining hits 0
  const [notificationTriggered, setNotificationTriggered] =
    useState<boolean>(false); // New flag

  // console.log("The current Pomodoro Session count is: ", pomodoroCount);
  // console.log("The sessionJustSwitched flag is: ", sessionJustSwitched);
  // console.log("The notification flag is: ", notificationTriggered);
  // console.log("The session type is: ", sessionType);

  // ?Effect to handle session switching when timeRemaining hits 0
  useEffect(() => {
    if (timeRemaining === 0 && !sessionJustSwitched) {
      handleSessionSwitch(); // Trigger session switch when time reaches 0
      setSessionJustSwitched(true); // Prevent multiple switches
    }

    // Trigger notification only when time hits 0 and it's the first time
    if (timeRemaining === 0 && !notificationTriggered) {
      setNotificationTriggered(true); // Prevent further notifications
    }
  }, [timeRemaining, sessionJustSwitched, notificationTriggered]);

  // ? saving pomodoro data in localStorage

  const setTimeRemainingAndSave = (newTime: number) => {
    setTimeRemaining(newTime);
    localStorage.setItem("timeRemaining", newTime.toString());
  };

  const setSessionTypeAndSave = (newSessionType: SessionType) => {
    setSessionType(newSessionType);
    localStorage.setItem("sessionType", newSessionType);
  };

  const setPomodoroCountAndSave = (newCount: number) => {
    setPomodoroCount(newCount);
    localStorage.setItem("pomodoroCount", newCount.toString());
  };

  // ?Handler Functions for the Controls

  // Start the timer
  const handleStart = () => {
    setStatus(TimerStatus.Running);
    // ?resetting the session switch flag
    setSessionJustSwitched(false);

    // If there's no interval running, start a new one
    if (!intervalId) {
      const id = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1; // Decrease time by 1 second
          } else {
            clearInterval(id); // Stop the timer when time reaches 0
            setIntervalId(null);
            return 0; // Ensure time doesn't go negative
          }
        });
      }, 1000); // Decrease time every 1000ms (1 second)
      setIntervalId(id); // Save the interval ID so it can be cleared later
    }
  };

  // Switch between Pomodoro and Breaks
  const handleSessionSwitch = () => {
    if (sessionType === SessionType.Pomodoro) {
      // Increment Pomodoro count once, switch to break
      setPomodoroCount((prevCount) => prevCount + 1);
      setSessionType(SessionType.ShortBreak);
      setTimeRemaining(breakDuration); // Set break time
    } else {
      // Switch back to Pomodoro after break
      setSessionType(SessionType.Pomodoro);
      setTimeRemaining(customTime * 60); // Set Pomodoro time
    }

    // Reset flag to allow next session switch
    setSessionJustSwitched(true);
    setNotificationTriggered(false); // Reset the notification flag for the next session
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
    // ! Problem1: the reset button when hit resets back to default 25 mins as opposed to custom time.
    // ! Problem2: When in break session, the reset button resets back to default 25 mins for Pomodoro as opposed to custom time for the breaks(SOLVED)

    // ?Solution to problem1(Normal logic)
    if (sessionType === SessionType.Pomodoro) {
      setTimeRemaining(customTime * 60); // Reset to custom Pomodoro time
    } else if (sessionType === SessionType.ShortBreak) {
      setTimeRemaining(breakDuration); // Reset to short break time
    } else if (sessionType === SessionType.LongBreak) {
      setTimeRemaining(breakDuration); // Reset to long break time
    }

    if (intervalId) {
      clearInterval(intervalId); // Clear the interval
      setIntervalId(null); // Reset the interval ID
    }
    setSessionJustSwitched(false); // Reset flag on reset
    setNotificationTriggered(false); // Reset the notification flag for the next session
  };

  // Dropdown Handler for session type
  const handleBreakDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const breakValue = parseInt(event.target.value, 10);
    setBreakDuration(breakValue * 60); // Convert minutes to seconds
    if (sessionType !== SessionType.Pomodoro) {
      setTimeRemaining(breakValue * 60); // Update break time if in break session
    }
  };

  // Handler for custom time duration input
  const handleCustomTimeDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCustomTime(value); // Update custom duration in minutes
    }
  };

  // Handler for setting custom time
  const handleSetCustomTime = () => {
    setTimeRemaining(customTime * 60); // Convert minutes to seconds
  };

  // ?TODO: Integrate functions to save local storage

  // ?Update and save Session Type

  // ?Update and save Pomodoro Count

  // ? Update and save Time Remaining

  // ! UseEffects for the application logic
  // Clean up when the component unmounts or the interval changes
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clean up interval on unmount
      }
    };
  }, [intervalId]);

  // Update timeRemaining when customTime changes and the timer is not running
  useEffect(() => {
    if (
      status === TimerStatus.Stopped &&
      sessionType === SessionType.Pomodoro
    ) {
      setTimeRemaining(customTime * 60); // Set the new custom time in seconds
      console.log("Use Effect in effect.");
    }
  }, [customTime, status, sessionType]);

  useEffect(() => {
    const saveTimeRemaining = localStorage.getItem("timeRemaining");
    const saveSessionType = localStorage.getItem("sessionType");
    const savePomodoroCount = localStorage.getItem("pomodoroCount");

    // ? Update types for JSON parsing

    if (saveTimeRemaining) {
      setTimeRemaining(Number(saveTimeRemaining));
    }
    if (saveSessionType) {
      setSessionType(saveSessionType as SessionType); // Cast to SessionType
    }
    if (savePomodoroCount) {
      setPomodoroCount(Number(savePomodoroCount));
    }
  }, []);

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <TimerDisplay
        timeRemaining={timeRemaining}
        pomodoroCount={pomodoroCount}
        sessionType={sessionType}
      />

      {sessionType !== SessionType.Pomodoro && (
        <div className="BreakControls">
          <label htmlFor="breakDuration">Select Break duration:</label>
          <select id="breakDuration" onChange={handleBreakDurationChange}>
            <option value="5">Short break (5 mins)</option>
            <option value="10">Short break (10 minutes)</option>
            <option value="15">Long Break (15 minutes)</option>
            <option value="20">Long Break (20 minutes)</option>
            <option value="25">Long Break (25 minutes)</option>
            <option value="30">Long Break (30 minutes)</option>
          </select>
        </div>
      )}

      <TimerControls
        status={status}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        customTime={customTime}
        onCustomTimeChange={handleCustomTimeDurationChange}
        onSetCustomTime={handleSetCustomTime}
      />
      {/* Render AlertManager to trigger notifications when session ends */}
      {timeRemaining === 0 && !notificationTriggered && (
        <AlertManager sessionType={sessionType} />
      )}
    </div>
  );
};

export default PomodoroTimer;
