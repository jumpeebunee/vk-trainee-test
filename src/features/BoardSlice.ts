import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ICell } from "../types/types";

interface BoardSliceProps {
  board: ICell[][],
}

const initialState:BoardSliceProps = {
  board: [],
}

const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard(state, action:PayloadAction<ICell[][]>) {
      state.board = action.payload;
    },
    updateLeft(state, action:PayloadAction<ICell>) {
      state.board = state.board.filter((itemRow: ICell[]) => {
          return itemRow.filter((itemCell: ICell) => {
            if (itemCell.x === action.payload.x && itemCell.y === action.payload.y) {
              if (action.payload.isMine) {
                itemCell.status = 'mineActive';
              } else {
                itemCell.status = 'open';
              }
            }
            return itemCell;
          })
        })
    }
  }
})

export default BoardSlice.reducer;
export const {addBoard, updateLeft} = BoardSlice.actions;
export const boardSlice = ((state: RootState) => state.board.board);