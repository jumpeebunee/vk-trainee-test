import { FC, FormEvent } from 'react'
import { ICell } from '../types/types';
import { getCellClass } from '../helpers/getCellClass';

interface BoardFieldsProps {
  field: ICell;
  handleLeftClick: (cell: ICell) => void;
  handleRightClick: (e: FormEvent<HTMLElement>, cell: ICell) => void;
}

const BoardFields:FC<BoardFieldsProps> = ({handleLeftClick, handleRightClick, field}) => {
  return (
    <button
      onClick={(e) => handleLeftClick(field)}
      onContextMenu={(e) => handleRightClick(e, field)}
      style={{backgroundPosition: field.nearbyMines ? `-${16 * field.nearbyMines - 16 + field.nearbyMines - 1}px 16px` : ''}}
      className={`app__field ${field.status ? getCellClass(field.status) : ''}`}>
    </button>
  )
}

export default BoardFields