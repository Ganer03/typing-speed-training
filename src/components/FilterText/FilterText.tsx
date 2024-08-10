import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Selection } from '@nextui-org/react'
import {
  labelCountWords,
  labelCountText,
  labelCountTime
} from '../../constants'
import { resetTest, setCounter, setText } from '../../features/textSlice'
import { SelectCustom } from './SelectCustom/SelectCustom'
export const FilterText = () => {
  const dispatch = useDispatch()
  const { paramsText, counter } = useSelector((state: RootState) => state.text)
  const [lengthWords, setLengthWords] = useState<Selection>(
    new Set(paramsText.lengthWords)
  )
  const [lengthText, setLengthText] = useState<Selection>(
    new Set([paramsText.lengthText])
  )
  const [counterTime, setCounterTime] = useState<Selection>(
    new Set([String(counter.count)])
  )

  useEffect(() => {
    dispatch(resetTest())
    dispatch(
      setText({
        lengthText: Array.from(lengthText, (key) => String(key))[0],
        lengthWords: Array.from(lengthWords, (key) => String(key))
      })
    )
    dispatch(setCounter(Array.from(counterTime, (key) => Number(key))[0]))
  }, [lengthWords, lengthText, counterTime])

  return (
    <div className={'pb-4 flex flex-col md:flex-row'}>
        <div className={"order-2 md:order-1 flex flex-col md:flex-row md:basis-4/5"}>
            <SelectCustom
                length={lengthWords}
                setLength={setLengthWords}
                paramSelection={'multiple'}
                lableInterface={labelCountWords}
                about={'Length word'}
            />
            <SelectCustom
                length={lengthText}
                setLength={setLengthText}
                paramSelection={'single'}
                lableInterface={labelCountText}
                about={'Length text'}
            />
            <SelectCustom
                length={counterTime}
                setLength={setCounterTime}
                paramSelection={'single'}
                lableInterface={labelCountTime}
                about={'timer'}
            />
        </div>
        <div className={"order-1 md:order-2 md:basis-1/5"}>
            {counter.flag? 'time': 'words'}: {counter.count}
        </div>
    </div>
  )
}
