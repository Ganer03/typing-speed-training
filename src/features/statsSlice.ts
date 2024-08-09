import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StatsState {
  wpm: number
  accuracy: number
}

const initialState: StatsState = {
  wpm: 0,
  accuracy: 0
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updateStats: (
      state,
      action: PayloadAction<{ wpm: number; accuracy: number }>
    ) => {
      state.wpm = action.payload.wpm
      state.accuracy = action.payload.accuracy
    }
  }
})

export const { updateStats } = statsSlice.actions

export default statsSlice.reducer
