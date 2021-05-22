/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

const Pomo = () => {
  let { interval, breaks, sessions } = useParams();

  let TIME_LIMIT = interval * 60,
    timerContinue = true,
    baseTimerLabel,
    baseTimerPathRemaining,
    remainingPathColor,
    sessionsRef,
    timeLeft;

  baseTimerLabel = useRef();
  baseTimerPathRemaining = useRef();
  sessionsRef = useRef();

  let sessionsLeft = sessions
  useEffect(() => {
    //RUN TIMER ONCE ON START
    const formatTimeLeft = (time) => {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    };

    let startingTime = formatTimeLeft(interval*60)
    baseTimerLabel.current.innerHTML = startingTime

    function startTimer() {
      let timePassed = 0;
      let inStudy = true;
      timeLeft = TIME_LIMIT;
      
      // console.log(breaks, interval, sessionsLeft);
      // console.log(TIME_LIMIT, timeLeft, timePassed)
      const countdown = () => {
        if (timerContinue) {
          timePassed = timePassed += 1;
          timeLeft = TIME_LIMIT - timePassed;
        }
        if (timeLeft === 0) {
          if (sessionsLeft > 0) {
            if (inStudy) {
              TIME_LIMIT = breaks * 60;
              sessionsLeft -= 1
              sessionsRef.current.innerHTML = `# ${sessions - sessionsLeft}/${sessions}`
              inStudy = false;
              startTimer()
              clearCountdown()
              return;
            } else {
              TIME_LIMIT = interval * 60;
              inStudy = true;
              startTimer()
              clearCountdown()
              return;
            }
          }
          clearCountdown()
          return;
        }
        baseTimerLabel.current.innerHTML = formatTimeLeft(timeLeft);
        setCircleDasharray();
      }

      let timerInterval = setInterval(countdown, 1000)

      const clearCountdown = () => {
        clearInterval(timerInterval)
      }
    }

    const COLOR_CODES = {
      info: {
        color: "green",
      },
    };

    remainingPathColor = COLOR_CODES.info.color;
    function calculateTimeFraction() {
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    let FULL_DASH_ARRAY = 283;

    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      baseTimerPathRemaining.current.setAttribute(
        "stroke-dasharray",
        circleDasharray
      );
    }

    startTimer();
  }, []);

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
            <span
              id="base-timer-label"
              ref={baseTimerLabel}
              className="base-timer__label"
            ></span>
          </div>
        </div>
        <div className="base-content bottom">
          <h2 id="study-status" className="session-info">Studying</h2>
          <h2 className="session-info">
            {breaks}min break
          </h2>
          <h2 ref={sessionsRef} className="session-info">
            # 1/{sessions}
          </h2>

        </div>
      </div>
    </div>
  );
};

export default Pomo;
