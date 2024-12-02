// ! Imports
// ? Components
import PomodoroTimer from "./Components/PomodoroTimer/PomodoroTimer";

// ? Third-Party
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

// ?Pages Imports
import HomePage from "./Pages/HomePage";

// TODO:
// 1) Create the boilerplate and setup folders(DONE)
// 2) Work on displaying the time and controls for starting and stopping the timer(ONGOING)

function App() {
  // implementing useNavigate Hook
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h1>Productivity Library: A place to track your productivity</h1>
      </header>
      <HomePage />
      <main>
        <div className="nav-btns-container">
          <button onClick={() => navigate("/timer")}>Pomodoro Timer</button>
          <button onClick={() => navigate("/history")}>Session history</button>
        </div>
      </main>
    </>
  );
}

export default App;
