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
    statusRef,
    studyStatus,
    sessionsDone,
    timePassed,
    timeLeft;

  let muteSounds = false;
  let pause = true;

  baseTimerLabel = useRef();
  baseTimerPathRemaining = useRef();
  sessionsRef = useRef();
  statusRef = useRef();
  studyStatus = useRef();

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = async function () {
      this.sound.play();
    };
    this.stop = async function () {
      this.sound.pause();
    };
  }

  let rainSounds = new sound("/sounds/rain.mp3");
  let alarmSounds = new sound("/sounds/alarm.mp3");

  function pausePlayHandler(e) {
    if (e.target.classList.contains("fa-play")) {
      e.target.classList.add("fa-pause");
      e.target.classList.remove("fa-play");
      pause = false;
      if (!muteSounds) rainSounds.play();
    } else {
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      pause = true;
      rainSounds.stop();
    }
  }

  function muteHandler(e) {
    if (e.target.classList.contains("fa-volume-up")) {
      e.target.classList.add("fa-volume-mute");
      e.target.classList.remove("fa-volume-up");
      muteSounds = false;
      if (!pause) rainSounds.play();
    } else {
      e.target.classList.add("fa-volume-up");
      e.target.classList.remove("fa-volume-mute");
      muteSounds = true;
      rainSounds.stop();
    }
  }

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

    let startingTime = formatTimeLeft(interval * 60);
    baseTimerLabel.current.innerHTML = startingTime;

    let inStudy = true;
    sessionsDone = 1;

    const countdown = () => {
      if (timerContinue && !pause) {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
      }
      if (timeLeft === 0) {
        if (sessionsDone < sessions) {
          if (inStudy) {
            console.log(1);
            TIME_LIMIT = breaks * 60;
            statusRef.current.textContent = "Break time";
            inStudy = false;
            alarmSounds.play();
            startTimer();
            clearCountdown();
            return;
          } else {
            sessionsDone += 1;
            TIME_LIMIT = interval * 60;
            console.log(sessionsDone);
            sessionsRef.current.innerHTML = `# ${sessionsDone}/${sessions}`;
            statusRef.current.textContent = "Studying";
            inStudy = true;
            alarmSounds.stop();
            startTimer();
            clearCountdown();
            return;
          }
        }
        clearCountdown();
        baseTimerLabel.current.textContent = "--:--";
        baseTimerPathRemaining.current.setAttribute(
          "stroke-dasharray",
          "283 283"
        );
        studyStatus.current.innerHTML = `
        <span ref={statusRef} className="status">
        Finished!
        </span>
        `;
        alarmSounds.play();
        return;
      }
      baseTimerLabel.current.innerHTML = formatTimeLeft(timeLeft);
      setCircleDasharray();
    };

    let timerInterval = setInterval(countdown, 1000);

    const clearCountdown = () => {
      clearInterval(timerInterval);
    };
    function startTimer() {
      timePassed = 0;
      timeLeft = TIME_LIMIT;
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
    return () => {
      clearCountdown();
      alarmSounds.stop()
      rainSounds.stop()
    };
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
          <h2 ref={studyStatus} id="study-status" className="session-info">
            <span ref={statusRef} className="status">
              Studying
            </span>
            <span className="one">.</span>
            <span className="two">.</span>
            <span className="three">.</span>
          </h2>
          <h2 ref={sessionsRef} className="session-info">
            # 1/{sessions}
          </h2>
          <h2 className="session-info choices">
            <i className="fas fa-play" onClick={pausePlayHandler}></i>
            <i className="fas fa-volume-mute" onClick={muteHandler}></i>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Pomo;
