import { FC, FormEvent } from 'react'
import { getCellClass } from '../helpers/getCellClass';
import { ICell } from '../types/types';

interface BoardFieldsProps {
  field: ICell
  handleLeftClick: (cell: ICell) => void;
  handleRightClick: (e: FormEvent<HTMLElement>, cell: ICell) => void;
}

const BoardFields:FC<BoardFieldsProps> = ({handleLeftClick, handleRightClick, field}) => {
  return (
    <li
      onClick={(e) => handleLeftClick(field)}
      onContextMenu={(e) => handleRightClick(e, field)}
      style={{backgroundPosition: field.nearbyMines ? `-${16 * field.nearbyMines - 16 + field.nearbyMines - 1}px 16px` : ''}}
      className={`app__field ${field.status ? getCellClass(field.status) : ''}`}>
    </li>
  )
}

export default BoardFields