import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { resetTest, TextStateStats } from '../features/textSlice'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Scatter, ComposedChart } from 'recharts'

export const Stats: React.FC = () => {
  const dispatch = useDispatch()
  const { wpm, accuracy, endTime, stats } = useSelector(
    (state: RootState) => state.text
  )
  const [activeGraph, setActiveGraph] = useState(0);

  const toggleGraph = () => {
    setActiveGraph((prev) => (prev === 0 ? 1 : 0));
  };

  const handleReset = () => {
    dispatch(resetTest())
  }

  return (
    <div>
      {endTime && (
        <div>
          <p>WPM: {wpm.toFixed(2)}</p>
          <p>Accuracy: {accuracy.toFixed(2)}%</p>
          <div>
            <button onClick={toggleGraph}>
              {activeGraph === 0 ? 'Switch to Total/Correct/Incorrect Chars' : 'Switch to WPM/Accuracy/Incorrect Chars'}
            </button>

            <ResponsiveContainer width="100%" height={400}>
              {activeGraph === 0 ? (
                <ComposedChart  data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="" />
                  <YAxis tickCount={4} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#f5f5f5' }}
                    formatter={(value: unknown) => `${value}`} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
                  <Line type="monotone" dataKey="raw" stroke="#FF0000" />
                  <Scatter dataKey="incorrectChars" fill="red"  shape="circle" />
                </ComposedChart>
              ) : (
                <LineChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#f5f5f5' }}
                    formatter={(value: unknown, name: string) => `${name}: ${value}`} 
                  />
                  <Line type="monotone" dataKey="totalChars" stroke="#8884d8" fill="#8884d8" />
                  <Line type="monotone" dataKey="correctChars" stroke="#00FF00" fill="#00FF00" />
                  <Line type="monotone" dataKey="incorrectChars" stroke="#FF0000" fill="#FF0000" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
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
