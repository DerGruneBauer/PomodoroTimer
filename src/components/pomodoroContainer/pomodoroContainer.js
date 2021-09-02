import React, { useState, useRef } from "react";
import Header from "../header/header.js";
import styles from "../pomodoroContainer/pomodoroContainer.module.css";
import CountdownClock from "../countdownClock/countdownClock.js";
import SettingsContainer from "../settings/settingsContainer/settingsContainer.js";
import Modal from "react-modal";
import '../../themes.css';

const PomodoroContainer = () => {
  const [pomodoro, setPomodoro] = useState(45);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [clockWord, setClockWord] = useState("START");
  const [font, setFont] = useState('fontOne');
  const [theme, setTheme] = useState('themeOne');
  const [history, setHistory] = useState([pomodoro, shortBreak, longBreak, theme, font]);

  const counterRef = useRef(0);
  const currentTimerRef = useRef("pomodoro");

  const [fontButtons, setFontButtons] = useState([
    { id: 0, name: "fontOne", style: "'Urbanist', sans-serif", isActive: true },
    { id: 1, name: "fontTwo", style: "'Work Sans', sans-serif", isActive: false },
    { id: 2, name: "fontThree", style: "'Lora', serif", isActive: false },
  ]);

  const [colorButtons, setColorButtons] = useState([
    { id: 0, name: "themeOne", style: "rgb(238, 118, 105)", isActive: true },
    { id: 1, name: "themeTwo", style: "rgb(0, 255, 242)", isActive: false },
    { id: 2, name: "themeThree", style: "rgb(200, 117, 255)", isActive: false },
  ]);

  const updateActiveColor = (id) => {
    const updatedColorButtons = colorButtons.map((button) => {
      return button.id === id
        ? { ...button, isActive: true }
        : { ...button, isActive: false };
    });
    setColorButtons(updatedColorButtons);
  };

  const updateActiveFont = (id) => {
    const updatedFontButtons = fontButtons.map((button) => {
      return button.id === id
        ? { ...button, isActive: true }
        : { ...button, isActive: false };
    });
    setFontButtons(updatedFontButtons);
  };

  React.useEffect(() => {
    if (clockWord === "PAUSE") {
      if (secondsLeft >= 0) {
        if (secondsLeft === 0 && minutesLeft === 0) {
          updateCurrentTimer();
          setTimerMinutes();
          return;
        } else {
          setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
        }
      } else if (secondsLeft < 0) {
        if (minutesLeft === 0) {
          return;
        } else {
          setMinutesLeft(minutesLeft - 1);
          setSecondsLeft(59);
        }
      }
    }
  });

  const updateCurrentTimer = () => {
    if (currentTimerRef.current === "pomodoro") {
      counterRef.current++;
      if (counterRef.current === 4) {
        counterRef.current = 0;
        currentTimerRef.current = "long break";
      } else {
        currentTimerRef.current = "short break";
      }
    } else {
      currentTimerRef.current = "pomodoro";
    }
  };

  const setTimerMinutes = () => {
    if (currentTimerRef.current === "pomodoro") {
      setMinutesLeft(pomodoro);
    } else if (currentTimerRef.current === "short break") {
      setMinutesLeft(shortBreak);
    } else {
      setMinutesLeft(longBreak);
    }
  };

  const alterClockMessage = () => {
    clockWord === "START" ? setClockWord("PAUSE") : setClockWord("START");
  };

  const showSettingsMenu = () => {
    setShowSettings(true);
  };

  const hideSettingsMenu = () => {
    setPomodoro(history[0]);
    setShortBreak(history[1]);
    setLongBreak(history[2]);
    setFont(history[4]);
    setTheme(history[3]);
    setShowSettings(false);
  };

  const updatePomodoroTime = (e) => {
    setPomodoro(e.target.value);
  };

  const updateShortBreakTime = (e) => {
    setShortBreak(e.target.value);
  };

  const updateLongBreakTime = (e) => {
    setLongBreak(e.target.value);
  };

  const toggleTheme = (e) => {
    const value = e.target.getAttribute('name');
    setTheme(value);
  }

  const toggleFont = (e) => {
    const value = e.target.getAttribute('name');
    setFont(value);
  }

  const applyChanges = () => {
    setHistory([pomodoro, shortBreak, longBreak, theme, font]);
    setShowSettings(false);
  };

  return (
    <div className={`${font} ${theme} ${styles.container}`}>
      <Header className={styles.header} currentTimer={currentTimerRef.current}/>
      <CountdownClock
        minutesLeft={minutesLeft}
        secondsLeft={secondsLeft}
        clockWord={clockWord}
        alterClockMessage={alterClockMessage}
      />
      <div className={styles.gearContainer}>
        <div className={styles.gearIcon} onClick={showSettingsMenu}></div>
      </div>
      <Modal
        appElement={document.getElementById("root") || undefined}
        isOpen={showSettings}
        className={styles.modalContainer}
      >
        <SettingsContainer
          hideMenu={hideSettingsMenu}
          displayBool={showSettings}
          updateLongBreakTime={updateLongBreakTime}
          updateShortBreakTime={updateShortBreakTime}
          updatePomodoroTime={updatePomodoroTime}
          applyChanges={applyChanges}
          defaultTimes={history}
          toggleFont={toggleFont}
          toggleTheme={toggleTheme}
          fontButtons={fontButtons}
          colorButtons={colorButtons}
          updateActiveColor={updateActiveColor}
          updateActiveFont={updateActiveFont}
        />
      </Modal>
    </div>
  );
};

export default PomodoroContainer;
