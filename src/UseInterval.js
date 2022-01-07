import { useEffect, useRef } from 'react'

const UseInterval = (callback, delay) => {
  const intervalRef = useRef()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(() => callbackRef.current(), delay)

      return () => window.clearInterval(intervalRef.current)
    }
  }, [delay])
  
  // Returns a ref to the interval ID in case you want to clear it manually:
  return intervalRef
}

export default UseInterval
