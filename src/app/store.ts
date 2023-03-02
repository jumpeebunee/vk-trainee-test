import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import StatusReducer from '../features/StatusSlice';

export const store = configureStore({
  reducer: {
    status: StatusReducer,
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
