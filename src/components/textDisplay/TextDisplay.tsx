import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './textDisplay.css'

export const TextDisplay: React.FC = () => {
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

  return <div className={'text-view break-words'}>{getHighlightedText()}</div>
}
