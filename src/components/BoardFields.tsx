import { FC, FormEvent, useState, MouseEvent, memo } from 'react'
import { ICell } from '../types/types';
import { getCellClass } from '../helpers/getCellClass';
import { useSelector, useDispatch } from 'react-redux';
import { status, changeStatus } from '../features/StatusSlice';
interface BoardFieldsProps {
  field: ICell;
  handleLeftClick: (cell: ICell) => void;
  handleRightClick: (e: FormEvent<HTMLElement>, cell: ICell) => void;
}

const BoardFields:FC<BoardFieldsProps> = ({handleLeftClick, handleRightClick, field}) => {
  const dispatch = useDispatch();
  const statusS = useSelector(status);

  const [isActive, setIsActive] = useState(false);

  const handleMouseHover = (cell: ICell) => {
    if (cell.status !== '' && statusS === 'scared') {
      dispatch(changeStatus('playing'));
    } else if  (cell.status === '' && statusS === 'scared') {
      setIsActive(true);
    }
  }

  const handleMouseUp = (e: MouseEvent<HTMLButtonElement>, field: ICell) => {
    if (e.button !== 2 && statusS === 'scared') {
      handleLeftClick(field);
    }
  }

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>, cell: ICell) => {
    if (e.button === 2) handleRightClick(e, field);
    if (cell.status === '') setIsActive(true);
  }

  return (
    <button
      onContextMenu={(e) => e.preventDefault()}
      onMouseOver={() => handleMouseHover(field)}
      onMouseLeave={() => setIsActive(false)}
      onMouseDown={(e) => handleMouseDown(e, field)}
      onMouseUp={(e) => handleMouseUp(e, field)}
      style={{backgroundPosition: field.nearbyMines ? `-${16 * field.nearbyMines - 16 + field.nearbyMines - 1}px 16px` : ''}}
      className={`app__field ${field.status ? getCellClass(field.status) : ''}${isActive ? 'active' : ''}`}>
    </button>
  )
}


export default BoardFields