// ?React imports
import React from "react";

// ?Third-Party imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AlertManagerProps = {
  sessionType: string;
};

// This component handles notification messages when Pomodoro or breaks end
const AlertManager: React.FC<AlertManagerProps> = ({ sessionType }) => {
  // Function to display notification based on session type
  const displayNotification = () => {
    // ?Notification for Pomodoros and breaks.
    if (sessionType === "pomodoro") {
      toast.success("Pomodoro session has ended! Time to take a break.");
    } else if (sessionType === "short-break") {
      toast.info("Short break has ended. Ready for another Pomodoro?");
    } else if (sessionType === "long-break") {
      toast.info("Long break has ended. Back to work!");
    }
  };

  return (
    <>
      {displayNotification()} {/* Trigger the notification */}
    </>
  );
};

export default AlertManager;
