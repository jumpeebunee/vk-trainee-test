import React, { FC } from 'react'

interface MineTableProps {
  pos: number;
}

const MineTable:FC<MineTableProps> = ({pos}) => {
  return (
    <div 
      style={{backgroundPosition: `${pos}px 0px`}}
      className='game__mines-table'>
    </div>
  )
}

export default MineTable