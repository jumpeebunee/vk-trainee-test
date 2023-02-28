import { useEffect, useState } from 'react'


const App = () => {

  const TOTAL__FIELDS = 16;
  const TOTAL__MINES = 40;

  const [board, setBoard] = useState<any>();

  const getMines = () => {
    const mines:any = [];

    while (mines.length < TOTAL__MINES) {
      const newMine = {x: getRandomNumber(TOTAL__FIELDS), y: getRandomNumber(TOTAL__FIELDS)};
      const isAdded = mines.find((item:any) => {
        return item.x === newMine.x && item.y === newMine.y;
      })
      if (!isAdded) mines.push(newMine);
    }
    return mines;
  }

  useEffect(() => {
    getFields();
  },[])

  const getFields = () => {
    const gameBoard = [];
    for (let x = 0; x < TOTAL__FIELDS; x += 1) {
      const row = [];
      for (let y = 0; y < TOTAL__FIELDS; y += 1) {
        const cell = {
          x,
          y,
          isMine: getMines().find((mine: any) => mine.x === x && mine.y === y) ? true : false,
          isMark: '',
        }
        row.push(cell);
      }
      gameBoard.push(row);
    }
    setBoard(gameBoard);
    return gameBoard;
  }

  const getRandomNumber = (max: number) => {
    return Math.floor(Math.random() * (max - 0) + 0);
  }

  const handleLeftClick = (elem: any) => {
    console.log(elem)
  }

  const handleRightClick = (e: any, elem: any) => {
    e.preventDefault();
    handleMark(elem);
  }

  const handleMark = (elem: any) => {
    const updateBoard = board.map((item: any) => {
      return item.map((cell: any) => {
        if (cell.x === elem.x && cell.y === elem.y) {
          if (!elem.isMark) {
            cell.isMark = 'mark';
          } else if (cell.isMark === 'mark') {
            cell.isMark = 'question';
          } else if (cell.isMark === 'question') {
            cell.isMark = '';
          }
        }
        return cell;
      })
    })
    setBoard(updateBoard)
  }

  function getClass(field: any) {
    if (field.isMark === 'mark') {
      return 'mark';
    } else if (field.isMark === 'question') {
      return 'question'
    } else if (field.isMine) {
      return 'mine'
    }
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
                className={`app__field ${getClass(field) ? getClass(field) : ''}`}>
                {field.elem}
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