import React from "react";

const TimerControls = ({
  status,
  onStart,
  onPause,
  onReset,
  customTime,
  onCustomTimeChange,
  onSetCustomTime,
}) => {
  return (
    <div>
      {/* Custom Time Input */}
      <div className="customControls">
        <label htmlFor="customTimeInput">
          Set Custom Pomodoro Duration (Minutes):
        </label>
        <input
          type="number"
          value={customTime}
          onChange={onCustomTimeChange}
          min="1"
        />
        <button onClick={onSetCustomTime}>Set Custom Time</button>
      </div>

      {/* Start Button */}
      {status !== "running" && <button onClick={onStart}>Start</button>}

      {/* Pause Button */}
      {status === "running" && <button onClick={onPause}>Pause</button>}

      {/* Reset Button */}
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default TimerControls;
