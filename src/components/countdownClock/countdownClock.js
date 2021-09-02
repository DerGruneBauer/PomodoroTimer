import React from "react";
import styles from "../countdownClock/countdownClock.module.css";

const CountdownClock = (props) => {
  return (
    <div className={styles.container}>
        <div className={styles.circleBorder}>
            <div className={styles.innerCircle}>
                <div onClick={props.alterClockMessage} className={styles.timerCircle}>
                    <div className={styles.time}>{props.minutesLeft < 10 ? "0"+ props.minutesLeft : props.minutesLeft}:{props.secondsLeft < 10 ? "0"+props.secondsLeft: props.secondsLeft}</div>
                    <div className={styles.pauseButton}>{props.clockWord}</div>
                </div>
            </div>
        </div>
    </div>
  );
};


export default CountdownClock;
