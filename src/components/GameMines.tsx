import { FC } from 'react'
import MineTable from './MineTable';

interface GameMinesProps {
  mines: string;
}

const GameMines:FC<GameMinesProps> = ({mines}) => {

  const getMineSpritePos = (num: number) => {
    if (!num) return 13;
    const spriteWidth = 14;
    return -spriteWidth * (num - 1);
  } 

  return (
    <div className='game__mines-tables'>
      <MineTable pos={getMineSpritePos(+mines[0])}/>
      <MineTable pos={getMineSpritePos(+mines[1])}/>
    </div>
  )
}

export default GameMines