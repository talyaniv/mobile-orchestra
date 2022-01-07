import React, { useRef } from 'react'

export default ({src, show, playCallback, endCallback }) => {
  const audioPlayer = useRef()
  return <audio
    style={ { display: show ? 'block' : 'none' }}
    ref = { audioPlayer }
    controls
    crossOrigin="anonymous"
    id="audio"
    preload="auto"
    src={src}
    title={src}
    onPlay={ playCallback }
    onEnded={ endCallback }
    play = { audioPlayer.current.play() }
    >
      <p>Your browser does not support the <code>audio</code> element.</p>
  </audio>
}