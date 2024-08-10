import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { words } from '../constants'
import { TextState, TextStateParams } from './textSliceInterface'

function initializeWordLengthsArray(originalText: string): number[] {
  const words = originalText.split(' ')
  const lengthsArray: number[] = []

  let cumulativeLength = 0

  words.forEach((word, index) => {
    cumulativeLength += word.length
    lengthsArray.push(cumulativeLength)

    if (index < words.length - 1) {
      cumulativeLength += 1
    }
  })
  return lengthsArray
}

function statsCorrect(state: TextState, action: PayloadAction<string>) {
  switch (
    action.payload.slice(-1) === state.originalText[action.payload.length - 1]
  ) {
    case true:
      state.stats[state.stats.length - 1].correctChars += 1
      break
    case false:
      state.stats[state.stats.length - 1].incorrectChars += 1
      break
  }
}

function statsLength(
  state: TextState,
  action: PayloadAction<string>,
  currentTime: number
) {
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
    statsCorrect(state, action)
  }
}

function updateCounter(state: TextState, currentTime: number) {
  switch (state.counter.flag) {
    case true:
      if (
        state.stats.length < 1 ||
        state.stats[state.stats.length - 1].time !== currentTime
      ) {
        state.counter.count -= 1
      }
      if (state.counter.count == 0) {
        state.flag = false
      }
      break
    case false:
      if (
        state.counter.wordslength[state.counter.count - 1] >
          state.userInput.length &&
        state.counter.count != 0
      ) {
        state.counter.count -= 1
      } else if (
        state.counter.wordslength[state.counter.count] == state.userInput.length
      ) {
        state.counter.count += 1
      }

      if (
        state.userInput.length ==
        state.counter.wordslength[state.counter.wordslength.length]
      ) {
        state.flag = false
      }
      break
  }
}

function endInput(state: TextState) {
  state.flag = false
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

const initialState: TextState = {
  counter: {
    timer: 0,
    count: 0,
    flag: false,
    wordslength: []
  },
  paramsText: {
    lengthText: '30',
    lengthWords: ['2', '3', '4', '5', '6', '7', '8']
  },
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
  allSymbols: 0,
  flag: true
}

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setCounter: (state, action: PayloadAction<number>) => {
      if (action.payload != 0) {
        state.counter.timer = action.payload
        state.counter.count = action.payload
        state.counter.flag = true
      } else {
        state.counter.timer = 0
        state.counter.count = 0
        state.counter.flag = false
        state.counter.wordslength = initializeWordLengthsArray(
          state.originalText
        )
      }
    },
    setText: (state, action: PayloadAction<TextStateParams>) => {
      const numWords = parseInt(action.payload.lengthText, 10)
      const generatedWords: string[] = []

      for (let index = 0; index < numWords; index++) {
        const randomLength = action.payload.lengthWords[
          Math.floor(Math.random() * action.payload.lengthWords.length)
        ] as keyof typeof words
        const wordArray = words[randomLength]
        const randomWord =
          wordArray[Math.floor(Math.random() * wordArray.length)]

        generatedWords.push(randomWord)
      }
      state.paramsText.lengthText = action.payload.lengthText
      state.paramsText.lengthWords = action.payload.lengthWords
      state.originalText = generatedWords.join(' ')
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      if (state.startTime === null) {
        state.startTime = Date.now()
      }

      const currentTime = Math.floor((Date.now() - state.startTime) / 1000)

      updateCounter(state, currentTime)
      statsLength(state, action, currentTime)
      state.userInput = action.payload

      if (action.payload.length === state.originalText.length || !state.flag) {
        endInput(state)
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
      state.flag = true
    }
  }
})

export const { setUserInput, resetTest, setText, setCounter } =
  textSlice.actions

export default textSlice.reducer
