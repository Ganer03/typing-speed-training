import { configureStore } from '@reduxjs/toolkit'
import textReducer, { TextState } from '../features/textSlice'

export interface RootState {
  text: TextState
}

export const store = configureStore({
  reducer: {
    text: textReducer
  }
})
