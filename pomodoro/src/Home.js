/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {

  let [breaks, setBreaks ] = useState(0.2)
  let [interval, setIntervals ] = useState(0.1)
  let [sessions, setSessions ] = useState(3)

  return (
    <div className="home">
      {
        <div className="base">
          <div className="base-content">
            <h1>Take a </h1>
            <input
              onChange={(e) => setBreaks(e.target.value)}
              id="break"
              type="number"
              required
              min="1"
              defaultValue="0.2"
            />
            <h1> minute break every</h1>
            <input
              onChange={(e) => setIntervals(e.target.value)}
              id="interval"
              type="number"
              required
              min="1"
              defaultValue="0.1"
            />
            <h1> minutes.</h1>
          </div>
          <div className="base-content">
            <h1># of sessions</h1>
            <input
              onChange={(e) => setSessions(e.target.value)}
              id="sessions"
              type="number"
              required
              min="1"
              max="12"
              defaultValue="3"
            />
          </div>
          <div className="base-content">
            <Link
              to={`/session/${interval}/${breaks}/${sessions}`}
              className="start-button"
            >
              START
            </Link>
          </div>
        </div>
      }
      {/* {button && <Pomo data={timerSettings}> </Pomo>} */}
    </div>
  );
};

export default Home;
