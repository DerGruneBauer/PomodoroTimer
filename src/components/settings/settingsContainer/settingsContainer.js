import React from "react";
import styles from "../settingsContainer/settingsContainer.module.css";
import TimeInput from "../timeInput/timeInput";

const SettingsContainer = (props) => {
  const inputFunctions = [
    props.updatePomodoroTime,
    props.updateShortBreakTime,
    props.updateLongBreakTime,
  ];

  const timeInput = [
    { id: 0, title: "pomodoro", defaultTime: props.defaultTimes[0] },
    { id: 1, title: "short break", defaultTime: props.defaultTimes[1] },
    { id: 2, title: "long break", defaultTime: props.defaultTimes[2] },
  ];

  const mappedFontButtons = props.fontButtons.map((button) => (
    <div
      key={button.id}
      id={button.id}
      name={button.name}
      onClick={(e) => {
        props.toggleFont(e);
        props.updateActiveFont(button.id);
      }}
      style={{fontFamily: button.style}}
      className={`${styles.font} ${button.isActive ? styles.selectedFont : null}`}
    >
      Aa
    </div>
  ));

  const mappedColorButtons = props.colorButtons.map((button) => (
    <div
      key={button.id}
      id={button.id}
      onClick={(e) => {
        props.toggleTheme(e);
        props.updateActiveColor(button.id);
      }}
      name={button.name}
      style={{backgroundColor: button.style}}
      className={`${styles.color} ${button.isActive ? styles.selectedColor : null}`}
    ></div>
  ));

  const timeInputs = timeInput.map((input) => (
    <TimeInput
      key={input.id}
      title={input.title}
      inputFunction={inputFunctions[input.id]}
      defaultTime={input.defaultTime}
    />
  ));

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>Settings</div>
        <svg
          className={styles.exitButton}
          onClick={() => {
            props.hideMenu();
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="gray"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </header>
      <section className={styles.timeSection}>
        <div className={`${styles.title} ${styles.subTitle}`}>
          TIME (MINUTES)
        </div>
        <div className={styles.groupInputs}>{timeInputs}</div>
      </section>
      <section className={styles.fontSection}>
        <div className={`${styles.title} ${styles.subTitle}`}>FONT</div>
        <div className={styles.groupFonts}>
          {mappedFontButtons}
        </div>
      </section>
      <section className={styles.colorSection}>
        <div className={`${styles.title} ${styles.subTitle}`}>COLOR</div>
        <div className={styles.groupColors}>{mappedColorButtons}</div>
      </section>
      <div onClick={props.applyChanges} className={styles.applyButton}>
        Apply
      </div>
    </div>
  );
};

export default SettingsContainer;
