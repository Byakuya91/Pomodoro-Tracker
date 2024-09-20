import React from "react";

const TimerControls = ({ status, onStart, onPause, onReset }) => {
  return (
    <div>
      {/* Start Button: Only show when timer is paused or stopped */}
      {status !== "running" && <button onClick={onStart}>Start</button>}

      {/* Pause Button: Only show when timer is running */}
      {status === "running" && <button onClick={onPause}>Pause</button>}

      {/* Reset Button: Always available */}
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
export default TimerControls;
