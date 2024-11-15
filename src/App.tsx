// ! Imports
// ? Components
import PomodoroTimer from "./Components/PomodoroTimer/PomodoroTimer";

// ? Third-Party
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ?Pages Imports
import HomePage from "./Pages/HomePage";

// TODO:
// 1) Create the boilerplate and setup folders(DONE)
// 2) Work on displaying the time and controls for starting and stopping the timer(ONGOING)

function App() {
  return (
    <>
      <h1>Productivity Library: A place to track your productivity</h1>
      {/* <PomodoroTimer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      /> */}
      <HomePage />
    </>
  );
}

export default App;
