import { FormEvent, useEffect, useState } from 'react'
import { getCellClass } from './helpers/getCellClass';
import { getRandomNumber } from './helpers/getRandomNumber';
import { ICell, IMine } from './types/types';


const App = () => {

  const [board, setBoard] = useState<ICell[][]>();

  useEffect(() => {
    createFields();
  },[])

  const GAME_CONFIG = {
    fields: 16,
    mines: 40,
  }

  const createFields = () => {
    const gameBoard = [];
    const gameMines = createMines();

    for (let x = 0; x < GAME_CONFIG.fields; x += 1) {
      const row = [];
      for (let y = 0; y < GAME_CONFIG.fields; y += 1) {
        const cell = {
          x,
          y,
          status: '',
          nearbyMines: 0,
          isMine: gameMines.find((mine) => mine.x === x && mine.y === y) ? true : false,
        }
        row.push(cell);
      }
      gameBoard.push(row);
    }
    setBoard(gameBoard);
    return gameBoard;
  }

  const createMines = () => {
    const mines: IMine[] = [];

    while (mines.length < GAME_CONFIG.mines) {
      const mine = {x: getRandomNumber(GAME_CONFIG.fields), y: getRandomNumber(GAME_CONFIG.fields)};
      const isAdded = mines.find((item: IMine) => {
        return item.x === mine.x && item.y === mine.y;
      })
      if (!isAdded) mines.push(mine);
    }
    return mines;
  }

  const handleLeftClick = (cell: ICell) => {
    if (cell.status === 'open') return;

    const nearbyCells = getNearbyCells(cell);
    const nearbyMines = nearbyCells.filter(item => item.isMine);

    if (board) {
      const updateBoard = board.map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (cell.isMine) {
              itemCell.status = 'mineActive';
            } else {
              itemCell.status = 'open';
              if (nearbyMines.length) itemCell.nearbyMines = nearbyMines.length;
            }
          }
          return itemCell;
        })
      })
      
      setBoard(updateBoard);

      if (nearbyMines.length === 0) nearbyCells.map(item => handleLeftClick(item))
    }
    
  }

  const handleRightClick = (e: FormEvent<HTMLElement>, cell: ICell) => {
    e.preventDefault();
    if (board) {
      const updateBoard = board.map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (!cell.status) {
              itemCell.status = 'mark';
            } else if (itemCell.status === 'mark') {
              itemCell.status = 'question';
            } else if (itemCell.status === 'question') {
              itemCell.status = '';
            }
          }
          return itemCell;
        })
      })
      setBoard(updateBoard)
    }
  }

  const getNearbyCells = (cell: ICell) => {

    const nearbyMines = [];

    if (board) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (cell.x + x >= 0 && cell.x + x < board.length) {
            const newCell = board[cell.x + x]?.[cell.y + y];
            if (newCell) nearbyMines.push(newCell);
          }
        }
      }
    }

    return nearbyMines;
  }

  return (
    <div className='app'>
      <div className='app__game'>
        <ul className='app__fields'>
          {board 
          ?
          <>
          {board.map((boardItem: any) =>
            boardItem.map((field: any) => 
              <div
                key={field.x + field.y} 
                onContextMenu={(e) => handleRightClick(e, field)}
                onClick={(e) => handleLeftClick(field)}
                data-mine={field.isMine ? 'yessss': ''}
                className={`app__field ${field.status ? getCellClass(field.status) : ''}`}>
                {field.nearbyMines ? field.nearbyMines : ''}
            </div>
          ))}
          </>
          :
          <></>}
        </ul>
      </div>
    </div>
  )
}

export default App