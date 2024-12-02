import React from "react";

// ?Components
import PomodoroTimer from "../Components/PomodoroTimer/PomodoroTimer";

// ?RRD imports
import { useNavigate } from "react-router-dom";

const PomdoroTimerPage = () => {
  const navigate = useNavigate();
  return (
    <div className="timer-container">
      <h1>Welcome to the productivity zone!</h1>
      <PomodoroTimer />

      <div className="PTPage-btn-container">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/history")}>Session history</button>
      </div>
    </div>
  );
};

export default PomdoroTimerPage;
