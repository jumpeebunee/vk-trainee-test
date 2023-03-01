import { FC } from 'react'
import { getSpriteNumPos } from '../helpers/getSpriteNumPos';
import NumberTable from './NumberTable';

interface GameMinesProps {
  mines: string;
}

const GameMines:FC<GameMinesProps> = ({mines}) => {
  return (
    <div className='game__mines-tables'>
      <NumberTable pos={getSpriteNumPos(+mines[0])}/>
      <NumberTable pos={getSpriteNumPos(+mines[1])}/>
      <NumberTable pos={getSpriteNumPos(+mines[2])}/>
    </div>
  )
}

export default GameMines