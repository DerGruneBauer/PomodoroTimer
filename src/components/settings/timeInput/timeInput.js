import React from "react";
import styles from "../timeInput/timeInput.module.css";

const TimeInput = (props) => {
  return (
    <div className={styles.container}>
        <div className={styles.title}>{props.title}</div>
        <select onChange={(e) => (props.inputFunction(e))}>
            <option value={props.defaultTime}>{props.defaultTime}</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
        </select>
    </div>
  );
};

export default TimeInput;