import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  status: 'playing',
}

const StatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    changeStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    }
  }
})

export default StatusSlice.reducer;
export const status = ((state: RootState) => state.status.status);
export const {changeStatus} = StatusSlice.actions;