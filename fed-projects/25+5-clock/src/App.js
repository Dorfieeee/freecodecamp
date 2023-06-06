import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import "./App.css";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const SESSION_STATE = "Session";
const BREAK_STATE = "Break";

function changeAnnouncement(clockState) {
  return `${clockState === SESSION_STATE ? BREAK_STATE : SESSION_STATE} has begun!`;
}

function toClockFormat(timeInSeconds) {
  let min = Math.floor(timeInSeconds / MINUTE)
    .toString()
    .padStart(2, "0");
  let sec = ((timeInSeconds - min * MINUTE) / SECOND)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

function getOneToSixty(n) {
  return n <= 1 ? 1 : n >= 60 ? 60 : n;
}

function Button({ content, ...props }) {
  return <button {...props}>{content}</button>;
}

function Timer({ name, timeLength, increment, decrement, min, max, incrementId, decrementId, labelId, lengthId }) {
  return (
    <div>
      <p id={labelId} >{name}</p>
      <p>
        <Button
          id={decrementId}
          onClick={decrement}
          content={<AiOutlineMinus />}
          disabled={timeLength === min}
        />
        <span id={lengthId} style={{ margin: "0 0.25rem", padding: "0 0.5rem" }}>
          {timeLength}
        </span>
        <Button
          id={incrementId}
          onClick={increment}
          content={<AiOutlinePlus />}
          disabled={timeLength === max}
        />
      </p>
    </div>
  );
}

function Clock({ time, label, timeId, labelId }) {
  return (
    <div>
      <p id={labelId} >{label}</p>
      <p id={timeId} style={{ fontSize: "3rem" }}>{toClockFormat(time)}</p>
    </div>
  );
}

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [clockState, setClockState] = useState(SESSION_STATE);
  const [clockTime, setClockTime] = useState(sessionLength * MINUTE);
  const [clockRunning, setClockRunning] = useState(false);
  const [clockInterval, setClockInterval] = useState(null);
  const audioRef = useRef();

  useEffect(() => {
    if (clockTime === 0) {
      playAudio()
      clearInterval(clockInterval);
      setTimeout(() => {
        setClockState((clockState) => (clockState === SESSION_STATE ? BREAK_STATE : SESSION_STATE));
        setClockTime(
          (clockState === BREAK_STATE ? sessionLength : breakLength) * MINUTE
        );
        setClockInterval(setInterval(clockTick, SECOND));
      }, SECOND);
    }
  }, [clockTime, clockInterval, sessionLength, breakLength, clockState]);

  function playAudio() {
    audioRef.current.play();
  }
  
  function stopAudio() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  function clockTick() {
    setClockTime((clockTime) => clockTime - SECOND);
  }

  function startClock() {
    setClockRunning(true);
    setClockInterval(setInterval(clockTick, SECOND));
  }

  function stopClock() {
    clearInterval(clockInterval);
    stopAudio();
    setClockRunning(false);
    setClockInterval(null);
  }

  function resetClock() {
    stopClock();
    setBreakLength(5);
    setSessionLength(25);
    setClockState(SESSION_STATE);
    setClockTime(25 * MINUTE);
  }

  function changeTimerByMin(timerType, m) {
    const timerLength = timerType === SESSION_STATE ? sessionLength : breakLength;
    const newTimerLength = getOneToSixty(timerLength + m);
    
    if (timerType === SESSION_STATE) {
      setSessionLength(newTimerLength);
    } else {
      setBreakLength(newTimerLength);
    }

    if (!clockRunning && timerType === clockState) {
      setClockTime(newTimerLength * MINUTE);
    }
  }

  const incrementBreakLength = () => {
    changeTimerByMin(BREAK_STATE, 1)
  };

  const decrementBreakLength = () => {
    changeTimerByMin(BREAK_STATE, -1)
  };

  const incrementSessionLength = () => {
    changeTimerByMin(SESSION_STATE, 1)
  };

  const decrementSessionLength = () => {
    changeTimerByMin(SESSION_STATE, -1)
  };

  const clockLabel = clockTime !== 0 ? clockState : changeAnnouncement(clockState);

  return (
    <div className="App">
      <header className="App-header">
        <h1>25 + 5 Clock</h1>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Timer
            name={"Break Length"}
            labelId={"break-label"}
            lengthId={"break-length"}
            timeLength={breakLength}
            incrementId={"break-increment"}
            decrementId={"break-decrement"}
            increment={incrementBreakLength}
            decrement={decrementBreakLength}
            min={1}
            max={60}
          />
          <Timer
            name={"Session Length"}
            labelId={"session-label"}
            lengthId={"session-length"}
            timeLength={sessionLength}
            incrementId={"session-increment"}
            decrementId={"session-decrement"}
            increment={incrementSessionLength}
            decrement={decrementSessionLength}
            min={1}
            max={60}
          />
        </div>
        <Clock label={clockLabel} time={clockTime} labelId={"timer-label"} timeId={"time-left"} />
        <div>
          <Button
            id={"start_stop"}
            content={clockRunning ? "Pause" : "Start"}
            onClick={clockRunning ? stopClock : startClock}
          />
          <Button id={"reset"} content={"Reset"} onClick={resetClock} />
        </div>
        <audio id="beep" ref={audioRef}>
          <source src="beep.wav" type="audio/wav" />
        </audio>
      </header>
    </div>
  );
}

export default App;
