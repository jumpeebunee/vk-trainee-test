import React, { FC } from 'react';
import { status } from '../features/StatusSlice';
import { useSelector } from 'react-redux';

interface GameControlProps {
  createFields: () => void;
}

const GameControl:FC<GameControlProps> = ({createFields}) => {

  const gameStatus = useSelector(status);

  const handleControl = () => {
    reloadGame();
  }

  const reloadGame = () => {
    createFields();
  }

  return (
    <button 
    onClick={handleControl} 
    className={
      `game__control ${gameStatus === 'loose' ? 'game__control_loose' : ''}${gameStatus === 'win' ? 'game__control_win' : ''}${gameStatus === 'scared' ? 'game__control_scared' : ''}`
    }></button>
  )
}

export default GameControl