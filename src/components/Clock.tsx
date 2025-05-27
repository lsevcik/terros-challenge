import { useEffect, useState } from 'react'
import type { Color } from '../types'

type Props = {
  currentMove: Color
  gameHasStarted: boolean
}

export function Clock({ currentMove, gameHasStarted }: Props) {
  const [whiteTime, setWhiteTime] = useState(0)
  const [blackTime, setBlackTime] = useState(0)

  useEffect(() => {
    if (!gameHasStarted) return
    const i = setInterval(() => {
      if (currentMove === 'white') {
        setWhiteTime((prevTime) => prevTime + 100)
      } else {
        setBlackTime((prevTime) => prevTime + 100)
      }
    }, 100)
    return () => clearInterval(i)
  }, [currentMove, gameHasStarted])

  return (
    <div className="flex gap-5 justify-center">
      <span>{formatTime(whiteTime)}</span>
      <span>{formatTime(blackTime)}</span>
    </div>
  )
}

function formatTime(milliseconds: number): string {
  const secs = Math.floor(milliseconds / 1000) % 60
  const minutes = Math.floor(milliseconds / 60000)
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}
