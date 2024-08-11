import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './textDisplay.css'

export const TextDisplay = () => {
  const originalText = useSelector(
    (state: RootState) => state.text.originalText
  )
  const userInput = useSelector((state: RootState) => state.text.userInput)

  const getHighlightedText = () => {
    const result: JSX.Element[] = []
    let indexOriginal = 0

    for (let indexUser = 0; indexUser < userInput.length; indexUser++) {
      const userChar = userInput[indexUser]
      const originalChar = originalText[indexOriginal]

      if (userChar === originalChar) {
        result.push(<span className="correct">{originalChar}</span>)
        indexOriginal++
      } else if (userChar !== originalChar && originalChar === ' ') {
        result.push(<span className="incorrect-space">{userChar}</span>)
        indexOriginal++
      } else if (userChar !== originalChar) {
        result.push(<span className="incorrect">{originalChar}</span>)
        indexOriginal++
      }
    }
    if (indexOriginal < originalText.length) {
      result.push(
        <span key={indexOriginal} className="non-active">
          <span className={'active'}></span>
          {originalText[indexOriginal]}
        </span>
      )
      indexOriginal++
    }
    while (indexOriginal < originalText.length) {
      result.push(
        <span key={indexOriginal} className="non-active">
          {originalText[indexOriginal]}
        </span>
      )
      indexOriginal++
    }

    return result
  }

  return (
    <div
      className={'text-view break-words text-medium md:text-3xl font-light'}
      style={{ fontFamily: 'monospace' }}
    >
      {getHighlightedText()}
    </div>
  )
}
