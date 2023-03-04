import { nanoid } from '@reduxjs/toolkit';
import { FC, FormEvent } from 'react'
import { ICell } from '../types/types';
import BoardFields from './BoardFields'

interface BoardMainProps {
  board: ICell[][];
  handleLeftClick: (cell: ICell) => void;
  handleRightClick: (e: FormEvent<HTMLElement>, cell: ICell) => void;
}

const BoardMain:FC<BoardMainProps> = ({board, handleLeftClick, handleRightClick}) => {

  return (
    <>
      {board 
        ?
        <>
        {board.map((boardItem: ICell[]) =>
          boardItem.map((field: ICell) => 
          <BoardFields
            key={nanoid()}
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
            field={field}
          />
        ))}
        </>
        :
      <></>}
    </>
  )
}

export default BoardMain