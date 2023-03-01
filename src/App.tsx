import { FormEvent, useEffect, useState } from 'react'
import BoardMain from './components/BoardMain';
import GameMines from './components/GameMines';
import { getRandomNumber } from './helpers/getRandomNumber';
import { ICell, IMine } from './types/types';


const App = () => {

  const [board, setBoard] = useState<ICell[][]>();
  const [mines, setMines] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [isStart, setIsStart] = useState(false);

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

    setMines(GAME_CONFIG.mines);
    return mines;
  }

  const getNewMinePosition = () => {
    let finded = false;
    const updateBoard = board?.map((itemRow: ICell[]) => {
      return itemRow.map((itemCell: ICell) => {
        if (!itemCell.isMine && !finded && !itemCell.status) {
          itemCell.isMine = true;
          finded = true;
        }
        return itemCell;
      })
    })
    setBoard(updateBoard);
  }
  
  const handleLeftClick = (cell: ICell) => {
    if (cell.status || gameFinished) return;

    const nearbyCells = getNearbyCells(cell);
    const nearbyMines = nearbyCells.filter(item => item.isMine);

    if (board) {
      const updateBoard = board.map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (cell.isMine && isStart) {
              itemCell.status = 'mineActive';
              setGameFinished(true);
              finishGame();
            } else {
              if (cell.isMine) {
                setIsStart(true);
                getNewMinePosition();
              } 
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
    if (gameFinished || mines <= 0) return;
    if (board) {
      const updateBoard = board.map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (!cell.status) {
              if (mines > 0) setMines(prev => prev - 1);
              itemCell.status = 'mark';
            } else if (itemCell.status === 'mark') {
              setMines(prev => prev + 1);
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

  const finishGame = () => {
    const updateBoard = board?.map((itemRow: ICell[]) => {
      return itemRow.map((itemCell: ICell) => {
        if (itemCell.isMine && itemCell.status !== 'mineActive') {
          itemCell.status = 'mineUnactive';
        }
        return itemCell;
      })
    })
    setBoard(updateBoard);
  }

  return (
    <div className='app'>
      <div className='app__game'>
        <GameMines mines={mines.toString().padStart(2, '0')}/>
        <ul className='app__fields'>
          <BoardMain
            board={board as ICell[][]}
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
          />
        </ul>
      </div>
    </div>
  )
}

export default App