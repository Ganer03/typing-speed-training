import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { textExamples } from '../constants'

export interface TextStateStats {
  time: number
  totalChars: number
  correctChars: number
  incorrectChars: number
  wpm: number
  accuracy: number
  raw: number
}

export interface TextState {
  originalText: string
  userInput: string
  startTime: number | null
  endTime: number | null
  wpm: number
  raw: number
  accuracy: number
  stats: TextStateStats[]
  correct: number
  incorrect: number
  allSymbols: number
}

const initialState: TextState = {
  originalText:
    'This is a sample text for typing test. This is a sample text for typing test. This is a sample text for typing test. This is a sample text for typing test.',
  userInput: '',
  startTime: null,
  endTime: null,
  wpm: 0,
  raw: 0,
  accuracy: 0,
  stats: [],
  correct: 0,
  incorrect: 0,
  allSymbols: 0
}

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setText: (state) => {
      state.originalText =
        textExamples[Math.floor(Math.random() * (textExamples.length - 1))]
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      if (state.startTime === null) {
        state.startTime = Date.now()
      }

      const currentTime = Math.floor((Date.now() - state.startTime) / 1000)

      if (
        state.stats.length === 0 ||
        state.stats[state.stats.length - 1].time !== currentTime
      ) {
        state.stats.push({
          time: currentTime,
          totalChars: 0,
          correctChars: 0,
          incorrectChars: 0,
          wpm: 0,
          accuracy: 0,
          raw: 0
        })
      }

      if (
        action.payload.length != state.userInput.length &&
        state.stats.length !== 0
      ) {
        state.stats[state.stats.length - 1].totalChars += 1
        if (
          action.payload.slice(-1) ===
          state.originalText[action.payload.length - 1]
        ) {
          state.stats[state.stats.length - 1].correctChars += 1
        } else {
          state.stats[state.stats.length - 1].incorrectChars += 1
        }
      }

      const newUserInput = action.payload
      state.userInput = newUserInput

      if (action.payload.length === state.originalText.length) {
        state.endTime = Date.now()
        let correct = 0
        let incorrect = 0
        let sumArray = 0
        let sumArrayWpm = 0
        for (let index = 0; index < state.stats.length; index++) {
          const char = state.stats[index]

          sumArray += char.totalChars
          correct += char.correctChars
          incorrect += char.incorrectChars

          if (char.incorrectChars === 0) {
            sumArrayWpm += char.totalChars
          }
          state.stats[index].wpm = sumArrayWpm / ((index + 1) / 12)
          state.stats[index].accuracy = (correct / sumArray) * 100
          state.stats[index].raw = sumArray / ((index + 1) / 12)
        }
        state.correct = correct
        state.incorrect = incorrect
        state.allSymbols = sumArray
        state.wpm = state.stats[state.stats.length - 1].wpm
        state.raw = state.stats[state.stats.length - 1].raw
        state.accuracy = state.stats[state.stats.length - 1].accuracy
      }
    },
    resetTest: (state) => {
      state.userInput = ''
      state.startTime = null
      state.endTime = null
      state.wpm = 0
      state.accuracy = 0
      state.stats = []
      state.correct = 0
      state.incorrect = 0
      state.allSymbols = 0
      state.raw = 0
    }
  }
})

export const { setUserInput, resetTest, setText } = textSlice.actions

export default textSlice.reducer
