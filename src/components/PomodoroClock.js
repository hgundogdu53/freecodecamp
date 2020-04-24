import React from "react";
import "./Pomodoro.css";

class PomodoroClock extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    timeLeft: 1500,
    isSession: true,
    timerID: null,
  };

  handleStartStop = () => {
    if (this.state.timerID) this.clearTimer();
    else this.setTimer();
  };

  handleReset = () => {
    this.clearTimer();
    this.stopBeep();
    document.getElementById("timer").style.color = "#444";
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      isSession: true,
    });
  };

  setTimer() {
    const timerID = setInterval(() => {
      let { timeLeft, breakLength, sessionLength, isSession } = this.state;
      if (timeLeft > 60) {
        timeLeft--;
      } else if (timeLeft > 1 && timeLeft <= 60) {
        document.getElementById("timer").style.color = "#e74c3c";
        timeLeft--;
      } else if (timeLeft === 1) {
        this.playBeep();
        timeLeft--;
      } else {
        if (isSession) {
          timeLeft = breakLength * 60;
          isSession = false;
        } else {
          timeLeft = sessionLength * 60;
          isSession = true;
        }
        document.getElementById("timer").style.color = "#444";
      }
      this.setState({ timeLeft, isSession });
    }, 1000);

    this.setState({ timerID });
  }

  playBeep() {
    const beep = document.getElementById("beep");
    beep.play();
  }

  stopBeep() {
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  }

  clearTimer() {
    clearInterval(this.state.timerID);
    this.setState({ timerID: null });
  }

  displayTimer(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  }

  handleBreakIncrement = () => {
    let { breakLength, isSession } = this.state;
    if (breakLength >= 60 || this.state.timerID) return;
    if (breakLength === 1)
      document.getElementById("timer").style.color = "#444";
    breakLength++;
    this.setState({ breakLength });
    if (!isSession) this.setState({ timeLeft: breakLength * 60 });
  };

  handleBreakDecrement = () => {
    let { breakLength, isSession } = this.state;
    if (breakLength <= 1 || this.state.timerID) return;
    breakLength--;
    this.setState({ breakLength });
    if (!isSession) this.setState({ timeLeft: breakLength * 60 });
  };

  handleSessionIncrement = () => {
    let { sessionLength, isSession } = this.state;
    if (sessionLength >= 60 || this.state.timerID) return;
    if (sessionLength === 1)
      document.getElementById("timer").style.color = "#444";
    sessionLength++;
    this.setState({ sessionLength });
    if (isSession) this.setState({ timeLeft: sessionLength * 60 });
  };

  handleSessionDecrement = () => {
    let { sessionLength, isSession } = this.state;
    if (sessionLength <= 1 || this.state.timerID) return;
    sessionLength--;
    this.setState({ sessionLength });
    if (isSession) this.setState({ timeLeft: sessionLength * 60 });
  };

  render() {
    return (
      <div className="App">
        <div className="PomodoroClock">
          <div className="duration-controls">
            <div id="break-label" className="label">
              Break Label
            </div>
            <button id="break-decrement" onClick={this.handleBreakDecrement}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="8 12 12 16 16 12"></polyline>
                <line x1="12" y1="8" x2="12" y2="16"></line>
              </svg>
            </button>
            <div id="break-length" className="duration">
              {this.state.breakLength}
            </div>
            <button id="break-increment" onClick={this.handleBreakIncrement}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="16 12 12 8 8 12"></polyline>
                <line x1="12" y1="16" x2="12" y2="8"></line>
              </svg>
            </button>
          </div>
          <div className="duration-controls">
            <div id="session-label" className="label">
              Session Label
            </div>
            <button
              id="session-decrement"
              onClick={this.handleSessionDecrement}
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="8 12 12 16 16 12"></polyline>
                <line x1="12" y1="8" x2="12" y2="16"></line>
              </svg>
            </button>
            <div id="session-length" className="duration">
              {this.state.sessionLength}
            </div>
            <button
              id="session-increment"
              onClick={this.handleSessionIncrement}
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="16 12 12 8 8 12"></polyline>
                <line x1="12" y1="16" x2="12" y2="8"></line>
              </svg>
            </button>
          </div>
          <div id="timer" className="timer-wrapper">
            <div id="timer-label">
              {this.state.isSession ? "Session" : "Break"}
            </div>
            <div id="time-left">{this.displayTimer(this.state.timeLeft)}</div>
          </div>
          <div className="timer-controls">
            <button id="start_stop" onClick={this.handleStartStop}>
              {this.state.timerID ? (
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                >
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1em"
                  width="1em"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
            <button id="reset" onClick={this.handleReset}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </button>
          </div>
          <audio
            id="beep"
            src="https://freesound.org/data/previews/246/246332_4486188-lq.mp3"
          />
        </div>
      </div>
    );
  }
}

export default PomodoroClock;
