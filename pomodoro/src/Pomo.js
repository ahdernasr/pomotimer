const Pomo = (props) => {
  let TIME_LIMIT = 10;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerContinue = true;

  const formatTimeLeft = (time) => {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  };

  function startTimer() {
    setInterval(() => {
      // The amount of time passed increments by one
      if (timerContinue) {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
      }
      if (timeLeft === 0) {
        timerContinue = false;
      }

      // The time left label is updated
      document.getElementById("base-timer-label").innerHTML =
        formatTimeLeft(timeLeft);
    }, 1000);
  }

  startTimer();

  return (
    <div className="home">
      <div className="base">
        <div className="base-content top">
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
              </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">
              {formatTimeLeft(timeLeft)}
            </span>
          </div>
        </div>
        <div className="base-content bottom"></div>
      </div>
    </div>
  );
};

export default Pomo;
