import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { resetTest, setCounter, setText } from '../../features/textSlice'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ComposedChart
} from 'recharts'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'

export const Stats = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { wpm, raw, accuracy, flag, stats, paramsText, counter } = useSelector(
    (state: RootState) => state.text
  )
  const [activeGraph, setActiveGraph] = useState(false)

  useEffect(() => {
    if (!flag) {
      onOpen()
    }
  }, [flag])

  const toggleGraph = () => {
    setActiveGraph(!activeGraph)
  }

  const handleReset = () => {
    dispatch(resetTest())
    dispatch(setText(paramsText))
    dispatch(setCounter(counter.timer))
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        shadow="md"
        radius="md"
        backdrop="blur"
        style={{ background: '#282c34' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={'text-xl text-white'}>
                Results
              </ModalHeader>
              <ModalBody>
                <div className={'flex flex-col pb-4'}>
                  <div
                    className={'grid grid-cols-3  pb-4 justify-items-center'}
                  >
                    <p className={'text-xl text-white'}>
                      WPM: {wpm.toFixed(2)}
                    </p>
                    <p className={'text-xl text-white'}>
                      Accuracy: {accuracy.toFixed(2)}%
                    </p>
                    <p className={'text-xl text-white'}>
                      Raw: {raw.toFixed(0)}
                    </p>
                  </div>
                  <Button color="primary" onClick={toggleGraph}>
                    Change Graph
                  </Button>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={400}>
                    {activeGraph ? (
                      <ComposedChart data={stats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="" />
                        <YAxis tickCount={4} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#f5f5f5' }}
                          formatter={(value: unknown) => `${value}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="wpm" stroke="#00FF00" />
                        <Line type="monotone" dataKey="raw" stroke="#8884d8" />
                        <Scatter
                          dataKey="incorrectChars"
                          fill="red"
                          shape="circle"
                        />
                      </ComposedChart>
                    ) : (
                      <LineChart data={stats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#f5f5f5' }}
                          formatter={(value: unknown, name: string) =>
                            `${name}: ${value}`
                          }
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="totalChars"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                        <Line
                          type="monotone"
                          dataKey="correctChars"
                          stroke="#00FF00"
                          fill="#00FF00"
                        />
                        <Line
                          type="monotone"
                          dataKey="incorrectChars"
                          stroke="#FF0000"
                          fill="#FF0000"
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleReset()
                    onClose()
                  }}
                >
                  Reset
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
