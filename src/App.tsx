import React from 'react'

const App = () => {

  const TOTAL__FIELDS = 16;

  const getFields = () => {
    const board = [];
    for (let x = 0; x < TOTAL__FIELDS; x += 1) {
      const row = [];
      for (let y = 0; y < TOTAL__FIELDS; y += 1) {
        const cell = {
          elem: <li className='app__field'></li>,
          x,
          y,
        }
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }
  
  return (
    <div className='app'>
      <div className='app__game'>
        <ul className='app__fields'>
          {getFields().map(board =>
            board.map(field => 
              <>{field.elem}</>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default App