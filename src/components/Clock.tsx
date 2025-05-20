import { useEffect, useState } from "react";
import type { Color } from "../Piece";

export default function Clock(currentMove: Color) {
    // TODO: start the clock when the game starts
    const [whiteTime, setWhiteTime] = useState(0);
    const [blackTime, setBlackTime] = useState(0);

    useEffect(() => {
        setInterval(() => {
            if (currentMove === 'white') {
                setWhiteTime((prevTime) => prevTime + 1);
            } else {
                setBlackTime((prevTime) => prevTime + 1);
            }
        }, 100);

    }, [currentMove]);

    return (
        <div className="clock">
            <span>{Math.floor(whiteTime/600)}:{Math.floor(whiteTime % 600 / 10)} </span>
            <span>{Math.floor(blackTime/600)}:{Math.floor(blackTime % 600 / 10)}</span>
        </div>
    );
}