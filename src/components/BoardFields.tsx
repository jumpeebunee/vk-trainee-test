import { FC, FormEvent, useState, MouseEvent } from 'react'
import { ICell } from '../types/types';
import { getCellClass } from '../helpers/getCellClass';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../features/StatusSlice';
import { GAME_CONFIG, GAME_STATUSES } from '../app/data/config';
interface BoardFieldsProps {
  field: ICell;
  handleLeftClick: (cell: ICell) => void;
  handleRightClick: (e: FormEvent<HTMLElement>, cell: ICell) => void;
}

const BoardFields:FC<BoardFieldsProps> = ({handleLeftClick, handleRightClick, field}) => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);

  const handleMouseUp = (e: MouseEvent<HTMLButtonElement>, field: ICell) => {
    if (e.button !== 2) {
      handleLeftClick(field);
    }
  }

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>, cell: ICell) => {
    if (e.button === 2) handleRightClick(e, field);
    if (cell.status === '' && e.button !== 2) {
      setIsActive(true);
    }
  }

  const handleMouseHover = (e:any,cell: ICell) => {
    if (e.buttons === 2 && e.buttons === 0) return;
    if (cell.status !== '' && e.buttons === 1) {
      dispatch(changeStatus(GAME_STATUSES.playing));
    } else if (cell.status === '' && e.buttons === 1) {
      setIsActive(true);
      dispatch(changeStatus(GAME_STATUSES.scared));
    }
  }

  return (
    <button
        onContextMenu={(e) => e.preventDefault()}
        onMouseMove={(e) => handleMouseHover(e,field)}
        onMouseLeave={() =>  setIsActive(false)}
        onMouseDown={(e) => handleMouseDown(e, field)}
        onMouseUp={(e) => handleMouseUp(e, field)}
      style={
        {
          backgroundPosition: field.nearbyMines 
            ? `-${GAME_CONFIG.fields * field.nearbyMines - GAME_CONFIG.fields + field.nearbyMines - 1}px 16px` 
            : ''
        }
      }
      className={`app__field ${field.status ? getCellClass(field.status) : ''}${isActive ? 'active' : ''}`}>
    </button>
  )
}


export default BoardFields