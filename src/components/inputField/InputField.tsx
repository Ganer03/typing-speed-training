import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetTest,
  setCounter,
  setText,
  setUserInput
} from '../../features/textSlice'
import { RootState } from '../../store/store'
import { TextDisplay } from '../textDisplay/TextDisplay'
import './inputField.css'
import { Button } from '@nextui-org/button'
import { FilterText } from '../FilterText/FilterText'
export const InputField = () => {
  const dispatch = useDispatch()
  const { userInput, paramsText, flag, counter } = useSelector(
    (state: RootState) => state.text
  )
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (flag && userInput != '') {
      intervalId = setInterval(() => {
        dispatch(setUserInput(userInput))
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [dispatch, isFocused, userInput])

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

  const handleReset = () => {
    dispatch(resetTest())
    dispatch(setText(paramsText))
    dispatch(setCounter(counter.timer))
    handleClick()
  }

  return (
    <>
      <div className={'items-center justify-start pt-8 md:justify-center md:pt-0 flex flex-col block-typing'}>
        <div className={`w-full flex flex-col pb-4`}>
          <div className={`w-full pb-0 md:pb-4 order-2 md:order-1`}>
            <FilterText />
          </div>
          <div
            className={`text-class mb-4 md:mb-0 order-1 md:order-2 ${isFocused ? '' : 'background-blurred'}`}
            onClick={handleClick}
          >
            <div className={`m-auto ${isFocused ? '' : 'blurred'}`}>
              <TextDisplay />
            </div>
            <div className={`text-large md:text-3xl change-class ${!isFocused ? '' : 'unlook'}`}>
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
              readOnly={!isFocused ? true : false}
            />
          </div>
        </div>
        <Button color="primary" onClick={() => handleReset()}>
          Reset
        </Button>
      </div>
    </>
  )
}
