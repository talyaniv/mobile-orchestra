import React, { useEffect, useRef } from 'react'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ socket, onMessage }) => {

  const callback = useRef();
  callback.current = onMessage

  useEffect(() => {

    const messageListener = message => {
      callback.current(message)
    }

    socket.on('message', message => messageListener({message}))
    socket.on('track', track => messageListener({track}))

    return () => {
      socket.off('message', messageListener)
    }
  }, [socket])

  return <></>
}
