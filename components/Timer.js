import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';

import {themeColors} from "../styles/variables";

const Timer = ({ second, setSecond, style }) => {
    
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(true);

    useInterval(() => {
        setSecond(second - 1)
    }, second >= 1 ? delay : null);

    //setIsRunning(false);

    return (
        <Text style={{ ...styles.text, ...style }}> {String(Math.floor(second / 60)).padStart(2, "0")}:{String(Math.floor(second % 60)).padStart(2, "0")} </Text>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const styles = StyleSheet.create({
    text: {
        color: themeColors.orange500
    }
})

export default Timer;