import React, { FC, useEffect, useState } from 'react'
import { getSpriteNumPos } from '../helpers/getSpriteNumPos';
import NumberTable from './NumberTable';

interface GameTimerProps {
  isStart: boolean;
  gameFinished: boolean;
}

const GameTimer:FC<GameTimerProps> = ({isStart, gameFinished}) => {

  const [seconds, setSeconds] = useState(0);

  let intervalId: NodeJS.Timer;

  useEffect(() => {
    if (gameFinished) {
      clearInterval(intervalId);
    } else if (!isStart) {
      setSeconds(0);
    } else {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isStart, seconds]);

  return (
    <div className='game__timer'>
      <NumberTable pos={getSpriteNumPos(+seconds.toString().padStart(3, '0')[0])}/>
      <NumberTable pos={getSpriteNumPos(+seconds.toString().padStart(3, '0')[1])}/>
      <NumberTable pos={getSpriteNumPos(+seconds.toString().padStart(3, '0')[2])}/>
    </div>
  )
}

export default GameTimer