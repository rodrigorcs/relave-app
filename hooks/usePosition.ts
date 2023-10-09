import { useRef, useState, useEffect } from 'react'
import { View } from 'react-native'

interface IPosition {
  startPosX: number | null
  startPosY: number | null
  endPosX: number | null
  endPosY: number | null
  width: number | null
  height: number | null
}

export const usePosition = () => {
  const ref = useRef<View>(null)
  const [position, setPosition] = useState<IPosition>({
    startPosX: null,
    startPosY: null,
    endPosX: null,
    endPosY: null,
    width: null,
    height: null,
  })

  const updatePosition = () => {
    if (ref.current) {
      ref.current.measure((_fx, _fy, w, h, px, py) => {
        setPosition({
          startPosX: px,
          startPosY: py,
          endPosX: px + w,
          endPosY: py + h,
          width: w,
          height: h,
        })
      })
    }
  }

  useEffect(() => {
    updatePosition()
  }, [ref])

  return { ref, position } as const
}
