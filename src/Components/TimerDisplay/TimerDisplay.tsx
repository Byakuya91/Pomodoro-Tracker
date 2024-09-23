import React from "react";

// TODO: Display the Current time for the Pomodoro and the Pomodoro Count
// 1) Create an interface for the props

interface TimerDisplayProps {
  timeRemaining: number;
  pomodoroCount: number;
  sessionType: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeRemaining,
  pomodoroCount,
  sessionType,
}) => {
  //  Format the time using the format time utility function(NEED to CODE)
  const formattedTime = formatTime(timeRemaining);

  return (
    <div className="timerDisplayFace">
      {sessionType === "pomodoro" && <h2>Time remaining:{formattedTime}</h2>}

      {sessionType === "short-break" && (
        <h2>Break time Remaining:{formattedTime}</h2>
      )}

      {sessionType === "long-break" && (
        <h2> Break time Remaining:{formattedTime}</h2>
      )}

      <h3>Pomodoros Completed: {pomodoroCount}</h3>
    </div>
  );
};

//? Utility function to format time from seconds to MM:SS
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export default TimerDisplay;
