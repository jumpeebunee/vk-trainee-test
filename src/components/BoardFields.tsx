import { FC, FormEvent, useState, MouseEvent } from 'react'
import { ICell } from '../types/types';
import { getCellClass } from '../helpers/getCellClass';
import { useSelector } from 'react-redux';
import { status } from '../features/StatusSlice';
interface BoardFieldsProps {
  field: ICell;
  handleLeftClick: (cell: ICell) => void;
  handleRightClick: (e: FormEvent<HTMLElement>, cell: ICell) => void;
}

const BoardFields:FC<BoardFieldsProps> = ({handleLeftClick, handleRightClick, field}) => {
  
  const statusS = useSelector(status);

  const [isActive, setIsActive] = useState(false);

  const checkMouseOn = () => {
    if (statusS === 'scared') setIsActive(true);
  }

  const checkMouseHold = (e: MouseEvent<HTMLButtonElement>, field: ICell) => {
    if (e.button === 2) return;
    handleLeftClick(field)
  }

  return (
    <button
      onClick={(e) => handleLeftClick(field)}
      onContextMenu={(e) => handleRightClick(e, field)}
      onMouseOver={checkMouseOn}
      onMouseLeave={() => setIsActive(false)}
      onMouseUp={(e: any) => checkMouseHold(e, field)}
      style={{backgroundPosition: field.nearbyMines ? `-${16 * field.nearbyMines - 16 + field.nearbyMines - 1}px 16px` : ''}}
      className={`app__field ${field.status ? getCellClass(field.status) : ''}${isActive ? 'active' : ''}`}>
    </button>
  )
}

export default BoardFields