import React from 'react'


const App = () => {

  const TOTAL__FIELDS = 16;
  const TOTAL__MINES = 40;

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

  const getFields = () => {
    const mines = getMines();
    console.log(mines)
    const board = [];
    for (let x = 0; x < TOTAL__FIELDS; x += 1) {
      const row = [];
      for (let y = 0; y < TOTAL__FIELDS; y += 1) {
        const cell = {
          elem: <li className='app__field'></li>,
          x,
          y,
          isMine: mines.find((mine: any) => mine.x === x && mine.y === y),
        }
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }

  const getRandomNumber = (max: number) => {
    return Math.floor(Math.random() * (max - 0) + 0);
  }

  return (
    <div className='app'>
      <div className='app__game'>
        <ul className='app__fields'>
          {getFields().map(board =>
            board.map(field => 
              <div className={field.isMine ? 'mine' : ''}>{field.elem}</div>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default App