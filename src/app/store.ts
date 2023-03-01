import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import BoardReducer from '../features/BoardSlice';

export const store = configureStore({
  reducer: {
    board: BoardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
