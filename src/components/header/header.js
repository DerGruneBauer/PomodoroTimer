import React from 'react';
import styles from '../header/header.module.css';

const Header = (props) => {

    const updateHeaderStyle = () => {
        let headers = document.querySelectorAll('.headerTitle');
        for(let i = 0; i < headers.length; i++){
            let title = headers[i].classList;
            headers[i].innerText === props.currentTimer ? title.add(styles.selectedSection) : title.remove(styles.selectedSection);
        }
    }

    return (
        <div onRender={() => (updateHeaderStyle(props))} className={styles.container}>
            <div className={styles.title}>pomodoro</div>
            <div className={styles.sliderContainer}>
                <div className={`headerTitle ${styles.sliderSection} ${styles.selectedSection} ${updateHeaderStyle()}`}>pomodoro</div>
                <div className={`headerTitle ${styles.sliderSection} ${updateHeaderStyle()}`}>short break</div>
                <div className={`headerTitle ${styles.sliderSection} ${updateHeaderStyle()}`}>long break</div>
            </div>
        </div>
    );
}

export default Header;