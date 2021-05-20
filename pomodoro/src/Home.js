import { useState } from "react";
import Pomo from "./Pomo";

let timerSettings;

const Home = () => {
  const [ button, setButton] = useState(false);

  const handleSubmit = () => {
    setButton(true)
    timerSettings = {
      break: document.getElementById("break").value,
      interval: document.getElementById("interval").value,
      sessions: document.getElementById("sessions").value,
    };
    // console.log(timerSettings)

    // history.push({
    //     pathname: '/session',
    //     state: [timerSettings] // your data array of objects
    //   });
  };
  return (
    <div className="home">
      {!button && (
        <div className="base">
          <div className="base-content">
            <h1>Take a </h1>
            <input
              id="break"
              type="number"
              required
              min="1"
              defaultValue="10"
            />
            <h1> minute break every</h1>
            <input
              id="interval"
              type="number"
              required
              min="1"
              defaultValue="50"
            />
            <h1> minutes.</h1>
          </div>
          <div className="base-content">
            <h1># of sessions</h1>
            <input
              id="sessions"
              type="number"
              required
              min="1"
              max="12"
              defaultValue="5"
            />
          </div>
          <div className="base-content">
            <button className="start-button" onClick={handleSubmit}>
              START
            </button>
          </div>
        </div>
      )}
      {button && <Pomo data={timerSettings}> </Pomo>}
    </div>
  );
};

export default Home;
