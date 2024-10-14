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
        <select
          id="customTimeSelect"
          value={customTime}
          onChange={(e) => onCustomTimeChange(e)}
        >
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
          <option value="15">15 minutes</option>
          <option value="20">20 minutes</option>
          <option value="25">25 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
        </select>
        {/* <button onClick={onSetCustomTime}>Set Custom Time</button> */}
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
