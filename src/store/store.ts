import { configureStore } from '@reduxjs/toolkit'
import { TextState } from '../features/textSliceInterface'
import textReducer from '../features/textSlice'

export interface RootState {
  text: TextState
}

export const store = configureStore({
  reducer: {
    text: textReducer
  }
})
