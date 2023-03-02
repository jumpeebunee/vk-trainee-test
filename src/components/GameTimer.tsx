import React, { FC, useEffect, useState } from 'react'
import { getSpriteNumPos } from '../helpers/getSpriteNumPos';
import NumberTable from './NumberTable';

interface GameTimerProps {
  isStart: boolean;
  gameFinished: boolean;
}

const GameTimer:FC<GameTimerProps> = ({isStart, gameFinished}) => {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (isStart) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!gameFinished) {
      setSeconds(0)
    }
    return () => clearInterval(intervalId);
  }, [isStart, gameFinished]);

  return (
    <div className='game__timer'>
      <NumberTable pos={getSpriteNumPos(+seconds.toString().padStart(3, '0')[0])}/>
      <NumberTable pos={getSpriteNumPos(+seconds.toString().padStart(3, '0')[1])}/>
      <NumberTable pos={getSpriteNumPos(+seconds.toString().padStart(3, '0')[2])}/>
    </div>
  )
}

export default GameTimer