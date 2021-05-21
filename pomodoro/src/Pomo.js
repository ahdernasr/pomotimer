/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";

const Pomo = (props) => {
  let TIME_LIMIT = 10;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerContinue = true;
  let color = "grey";
  let baseTimerLabel;
  let baseTimerPathRemaining;
  let remainingPathColor;

  useEffect(() => {
    baseTimerLabel = useRef()
    baseTimerPathRemaining = useRef()
  }, [])

  console.log(baseTimerLabel, baseTimerPathRemaining)

  // const formatTimeLeft = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   let seconds = time % 60;
  //   if (seconds < 10) {
  //     seconds = `0${seconds}`;
  //   }
  //   return `${minutes}:${seconds}`;
  // };

  // function startTimer() {
  //   setInterval(() => {
  //     if (timerContinue) {
  //       timePassed = timePassed += 1;
  //       timeLeft = TIME_LIMIT - timePassed;
  //     } else {
  //       color = "red";
  //     }
  //     if (timeLeft === 0) {
  //       timerContinue = false;
  //     }
  //     baseTimerLabel.current.innerHTML = formatTimeLeft(timeLeft);

  //     setCircleDasharray();
  //   }, 1000);
  // }

  // const COLOR_CODES = {
  //   info: {
  //     color: "green",
  //   },
  // };

  // let remainingPathColor = COLOR_CODES.info.color;
  // function calculateTimeFraction() {
  //   const rawTimeFraction = timeLeft / TIME_LIMIT;
  //   return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  // }

  // let FULL_DASH_ARRAY = 283;

  // function setCircleDasharray() {
  //   const circleDasharray = `${(
  //     calculateTimeFraction() * FULL_DASH_ARRAY
  //   ).toFixed(0)} 283`;
  //   baseTimerPathRemaining.current.setAttribute("stroke-dasharray", circleDasharray);
  // }

  // startTimer();
  return (
    <div className="home">
      <div className="base">
        <div id="timer-container" className="base-content top">
          <div className="base-timer">
            <svg
              className="base-timer__svg"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="base-timer__circle">
                <circle
                  className="base-timer__path-elapsed"
                  style={{stroke: color}}
                  cx="50"
                  cy="50"
                  r="45"
                ></circle>
                <path
                  ref={baseTimerPathRemaining}
                  id="base-timer-path-remaining"
                  strokeDasharray="283"
                  className={`base-timer__path-remaining ${remainingPathColor}`}
                  d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                ></path>
              </g>
            </svg>
            <span  id="base-timer-label" ref={baseTimerLabel} className="base-timer__label">
            </span>
          </div>
        </div>
        <div className="base-content bottom">
          <h2 className="session-info">
            <i className="fas fa-coffee"></i>: {props.data.break} min{" "}
          </h2>
          <h2 className="session-info">
            <i className="fas fa-hashtag"></i>: {props.data.sessions} sessions{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Pomo;
