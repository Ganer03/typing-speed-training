import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setText, setUserInput } from '../../features/textSlice'
import { RootState } from '../../store/store'
import { TextDisplay } from '../textDisplay/TextDisplay'
import './inputField.css'
export const InputField: React.FC = () => {
  const dispatch = useDispatch()
  const userInput = useSelector((state: RootState) => state.text.userInput)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const endTime = useSelector((state: RootState) => state.text.endTime)

  useEffect(() => {
    dispatch(setText())
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (!endTime && userInput != '' && isFocused) {
      intervalId = setInterval(() => {
        dispatch(setUserInput(userInput))
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [dispatch, userInput, endTime, isFocused])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserInput(event.target.value))
  }

  const handleFocus = () => {
    setIsFocused(!isFocused)
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
    }
  }

  return (
    <div
      className={`text-class ${isFocused ? '' : 'background-blurred'}`}
      onClick={handleClick}
    >
      <div className={`${isFocused ? '' : 'blurred'}`}>
        <TextDisplay />
      </div>
      <div className={`change-class ${!isFocused ? '' : 'unlook'}`}>
        Click here or press any key to focus
      </div>
      <input
        ref={inputRef}
        className={`input-class`}
        type="text"
        value={userInput}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleFocus}
        autoFocus
        readOnly={endTime? true: false}
      />
    </div>
  )
}
