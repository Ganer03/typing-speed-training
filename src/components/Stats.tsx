import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { resetTest, TextStateStats } from '../features/textSlice'

export const Stats: React.FC = () => {
  const dispatch = useDispatch()
  const { wpm, accuracy, endTime, stats } = useSelector(
    (state: RootState) => state.text
  )

  const handleReset = () => {
    dispatch(resetTest())
  }

  return (
    <div>
      {endTime && (
        <div>
          <p>WPM: {wpm.toFixed(2)}</p>
          <p>Accuracy: {accuracy.toFixed(2)}%</p>
          {stats.map((char: TextStateStats) => {
            return (
              <p key={char.time}>
                {char.incorrectChars} {char.correctChars} {char.totalChars}{' '}
                {char.time}
              </p>
            )
          })}
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  )
}
