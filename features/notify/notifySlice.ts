import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface NotifyState {
  isNotify: boolean;
}

const initialState: NotifyState = {
  isNotify: true,
};

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotify: (state, action: PayloadAction<boolean>) => {
      state.isNotify = action.payload;
    },
  },
});

export const {setNotify} = notifySlice.actions;

export default notifySlice.reducer;
