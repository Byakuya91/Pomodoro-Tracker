import React from "react";

// ?Components
import PomodoroTimer from "../Components/PomodoroTimer/PomodoroTimer";

const PomdoroTimerPage = () => {
  return (
    <div className="timer-container">
      <h1>Welcome to the productivity zone!</h1>
      <PomodoroTimer />
    </div>
  );
};

export default PomdoroTimerPage;
