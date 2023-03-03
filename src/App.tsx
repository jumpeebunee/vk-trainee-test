import { FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeStatus } from './features/StatusSlice';
import { ICell, IMine } from './types/types';
import { getRandomNumber } from './helpers/getRandomNumber';
import { FIELD_STATUSES, GAME_CONFIG, GAME_STATUSES } from './app/data/config';
import BoardMain from './components/BoardMain';
import GameControl from './components/GameControl';
import GameMines from './components/GameMines';
import GameTimer from './components/GameTimer';

const App = () => {

  const [board, setBoard] = useState<ICell[][]>();
  const [mines, setMines] = useState(GAME_CONFIG.mines);
  const [gameFinished, setGameFinished] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const dispatch = useDispatch();
  const fields = GAME_CONFIG.fields;

  useEffect(() => {
    createFields();

  }, [])

  //* create board and add mines;

  const createFields = () => {
    const generatedMines = createMines();

    const updatedBoard = Array.from({ length: fields }, (_, x) =>
      Array.from({ length: fields }, (_, y) => {
        const isMine = generatedMines.some((mine) => mine.x === x && mine.y === y);
        return {
          x,
          y,
          status: '',
          nearbyMines: 0,
          isMine,
        };
      })
    );

    setBoard(updatedBoard);
  };

  //* creating mines
  const createMines = () => {
    const mines = new Set<IMine>();

    while (mines.size < GAME_CONFIG.mines) {
      const x = getRandomNumber(GAME_CONFIG.fields);
      const y = getRandomNumber(GAME_CONFIG.fields);
      const mine = {x, y};
      mines.add(mine);
    }
    
    return Array.from(mines);;
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
  
  //* clicks
  const getNewMinePosition = () => {
    let isFind = false;

    const updateBoard = board?.slice();
    for (let x = 0; x < GAME_CONFIG.fields; x += 1) {
      for (let y = 0; y < GAME_CONFIG.fields; y += 1) {
        if (updateBoard) {
          const boardCell = updateBoard[x][y];
          if (!isFind && !boardCell?.isMine && !boardCell?.status) {
            isFind = true;
            boardCell.isMine = true;
            break;
          }
        }
      }
    }

    setBoard(updateBoard);
  }
  
  const handleLeftClick = (cell: ICell) => {

    if (cell.status || gameFinished) return;

    let nearbyCells = getNearbyCells(cell);
    let nearbyMines = nearbyCells.filter(item => item.isMine);

    if (board) {
      const updateBoard = board.slice().map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (cell.isMine && isStart) {
              itemCell.status = FIELD_STATUSES.mineActive;
              setGameFinished(true);
              finishGame();
            } else {
              if (cell.isMine)  {
                getNewMinePosition();
                itemCell.nearbyMines -= itemCell.nearbyMines === 0 ? 0 : 1;
                itemCell.isMine = false;
                nearbyCells = getNearbyCells(cell);
                nearbyMines = nearbyCells.filter(item => item.isMine);
              }
              if (nearbyMines.length) itemCell.nearbyMines += nearbyMines.length;
              itemCell.status = FIELD_STATUSES.open;
              dispatch(changeStatus('play'))
              checkWin();
            }
          }
          if (!isStart) setIsStart(true);
          return itemCell;
        })
      })

      setBoard(updateBoard);

      //* open nearby empty cells
      if (nearbyMines.length === 0) nearbyCells.map(item => handleLeftClick(item));
    }
  }

  const handleRightClick = (e: FormEvent<HTMLElement>, cell: ICell) => {
    e.preventDefault();

    if (gameFinished || cell.status === FIELD_STATUSES.open) return;

    if (board) {
      const updateBoard = board.slice().map((itemRow: ICell[]) => {
        return itemRow.map((itemCell: ICell) => {
          if (itemCell.x === cell.x && itemCell.y === cell.y) {
            if (!cell.status && mines > 0) {
              if (mines > 0) setMines(prev => prev - 1);
              itemCell.status = FIELD_STATUSES.mark;
            } else if (itemCell.status === FIELD_STATUSES.mark) {
              setMines(prev => prev + 1);
              itemCell.status = FIELD_STATUSES.question;
            } else if (itemCell.status === FIELD_STATUSES.question) {
              itemCell.status = '';
            }
          }
          return itemCell;
        })
      })

      setBoard(updateBoard);
      checkWin();
    }
  }

  //* update game board
  const finishGame = () => {
    const updateBoard = board?.slice().map((itemRow: ICell[]) => {
      return itemRow.map((itemCell: ICell) => {
        if (itemCell.isMine && itemCell.status === FIELD_STATUSES.mark) {
          itemCell.status = FIELD_STATUSES.mineDetected;
        } else if (itemCell.isMine && itemCell.status !== FIELD_STATUSES.mineActive) {
          itemCell.status = FIELD_STATUSES.mineUnactive;
        }
        return itemCell;
      })
    })

    dispatch(changeStatus(GAME_STATUSES.loose));
    setGameFinished(true);
    setBoard(updateBoard);
  }

  const checkWin = () => {
    if (!gameFinished) {
      let openedCells = 0;
      board?.map((item) => {
        item.map((item2) => {
          if (item2.status === '' || item2.status === FIELD_STATUSES.question) {
            openedCells += 1;
          }
        })
      })
      if (openedCells === 0 && isStart) {
        setIsStart(false);
        setGameFinished(true);
        dispatch(changeStatus(GAME_STATUSES.win));
      }
    }
  }

  const clearGameSettings = () => {
    setBoard([]);
    setIsStart(false);
    setGameFinished(false);
    setMines(GAME_CONFIG.mines);
    dispatch(changeStatus(GAME_STATUSES.playing));
    createFields();
  }

  //* a frightened smiley
  const handleDown = (e: any) => {
    if (e.button === 2 || e.target.className !== 'app__field ') return;
    dispatch(changeStatus(GAME_STATUSES.scared));
  }

  const handleLeave = () => {
    dispatch(changeStatus('play'));
  }

  return (
    <div className='app'>
      <div className='app__game'>
        <div className='app__game-info'>
          <GameMines mines={mines.toString().padStart(3, '0')}/>
          <GameControl clearBoard={clearGameSettings}/>
          <GameTimer isStart={isStart} gameFinished={gameFinished}/>
        </div>
        <ul 
          onMouseDown={(e) => handleDown(e)}
          onMouseLeave={handleLeave} 
          className={`app__fields ${gameFinished ? 'app__fields-finish' : ''}`}>
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