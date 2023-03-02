import { FormEvent, useEffect, useMemo, useState } from 'react'
import BoardMain from './components/BoardMain';
import GameControl from './components/GameControl';
import GameMines from './components/GameMines';
import GameTimer from './components/GameTimer';
import { getRandomNumber } from './helpers/getRandomNumber';
import { ICell, IMine } from './types/types';
import { changeStatus } from './features/StatusSlice';
import { useDispatch } from 'react-redux';


const App = () => {
  const [board, setBoard] = useState<ICell[][]>();
  const [mines, setMines] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [mineDetected, setMineDetected] = useState(0);

  const GAME_CONFIG = {
    fields: 16,
    mines: 40,
  }

  useEffect(() => {
    createFields();
  },[])

  useMemo(() => {
    if (mineDetected === GAME_CONFIG.mines) {
      alert('Win')
    }
  },[mineDetected])

  const dispatch = useDispatch();

  const createFields = () => {
    setBoard([]);
    dispatch(changeStatus('playing'));
    setIsStart(false);
    setGameFinished(false);

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

  const getNewMinePosition = (cell: ICell) => {
    let finded = false;
    const updateBoard = board?.map((itemRow: ICell[], indexRow) => {
      return itemRow.map((itemCell: ICell, indexCell) => {
        if (!itemCell.isMine && !finded && !itemCell.status) {
          itemCell.isMine = true;
          finded = true;
        }
        if (indexRow === cell.x && indexCell === cell.y) {
          itemCell.isMine = false;
        }
        return itemCell;
      })
    })
    setBoard(updateBoard);
  }
  
  const handleLeftClick = (cell: ICell) => {
    
    if (cell.status || gameFinished) return;

    let nearbyCells = getNearbyCells(cell);
    let nearbyMines = nearbyCells.filter(item => item.isMine);

    if (board) {
      const updateBoard = board.map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (cell.isMine && isStart) {
              itemCell.status = 'mineActive';
              setGameFinished(true);
              finishGame();
            } else {
              if (cell.isMine)  {
                getNewMinePosition(cell);
                itemCell.nearbyMines -= 1;
                nearbyCells = getNearbyCells(cell);
                nearbyMines = nearbyCells.filter(item => item.isMine);
              }
              itemCell.status = 'open';
              if (nearbyMines.length) itemCell.nearbyMines += nearbyMines.length;
            }
          }
          if (!isStart) setIsStart(true);
          return itemCell;
        })
      })

      setBoard(updateBoard);

      if (nearbyMines.length === 0) nearbyCells.map(item => handleLeftClick(item))
    } 
  }

  const handleRightClick = (e: FormEvent<HTMLElement>, cell: ICell) => {
    e.preventDefault();
    if (gameFinished || cell.status === 'open') return;

    if (cell.isMine && !cell.status) {
      setMineDetected(prev => prev + 1);
    } else if (cell.isMine && cell.status === 'mark') {
      setMineDetected(prev => prev - 1);
    } 

    if (board) {
      const updateBoard = board.map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (!cell.status && mines > 0) {
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
      setBoard(updateBoard);
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
    dispatch(changeStatus('loose'));
    setIsStart(false);
    setBoard(updateBoard);
  }
  
  return (
    <div className='app'>
      <div className='app__game'>
        <div className='app__game-info'>
          <GameMines mines={mines.toString().padStart(3, '0')}/>
          <GameControl createFields={createFields}/>
          <GameTimer isStart={isStart} gameFinished={gameFinished}/>
        </div>
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