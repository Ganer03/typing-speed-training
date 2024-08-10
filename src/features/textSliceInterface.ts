export interface TextStateParams {
  lengthText: string
  lengthWords: string[]
}

export interface CountStateParams {
  timer: number
  count: number
  flag: boolean
  wordslength: number[]
}

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
  counter: CountStateParams
  paramsText: TextStateParams
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
  flag: boolean
}
