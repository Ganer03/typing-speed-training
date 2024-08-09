import { configureStore } from '@reduxjs/toolkit'
import textReducer, { TextState } from '../features/textSlice'
import statsReducer, { StatsState } from '../features/statsSlice'

export interface RootState {
  text: TextState
  stats: StatsState
}

export const store = configureStore({
  reducer: {
    text: textReducer,
    stats: statsReducer
  }
})
