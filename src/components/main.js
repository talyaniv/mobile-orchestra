// import Audio from './Audio'
import '../App.css'
import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import Start from './start'
import Messages from './messages'
import Grid from './animations/grid'
import Playing from './animations/playing'
import Thanks from './thanks'

const Main = () => {

  const [playerStatus, setPlayerStatus] = useState('idle')
  const [playTrack, setPlayTrack] = useState('idle')
  
  const audioPlayer = useRef()
  const trackColors = JSON.parse(process.env.REACT_APP_TRACK_COLORS)

  const play = () => {
    audioPlayer.current.play()
    setPlayerStatus('ready')
    // hacking some browser permisssions
    // starting audio and immediately pausing,
    // so the actual music starts playing programatically via socket.io message
    setTimeout( () => audioPlayer.current.pause(), 10)
  }

  const [socket, setSocket] = useState(null);
  const [bgColor, setBgColor] = useState('#000')

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket, playerStatus]);

  const socketMessage = ({message, track}) => {
    if (track && playTrack === 'idle') {
      setBgColor(trackColors[track - 1])
      setPlayTrack(`/track-${track}.mp3`)
    }
    if (message === 'play') {
      // here we actually start playing the sound
      setPlayerStatus('playing')
      audioPlayer.current.play()
    }
  }

  return (
    <div className='App-header' style={ { backgroundColor: bgColor }}>
      <Start show={ playerStatus === 'idle' } callback={ play } />

      <Grid show={ playerStatus === 'ready' } />
      <Playing show={ playerStatus === 'playing' } />
      <Thanks show={ playerStatus === 'done' } />

      <audio
        style={ { display: ['standby', 'play'].includes(playerStatus) ? 'block' : 'none' }}
        ref = { audioPlayer }
        crossOrigin="anonymous"
        id="audio"
        preload="auto"
        src={playTrack}
        title={playTrack}
        // onPlay={ () => setPlayerStatus('playing') }
        onEnded={ () => {
          setPlayerStatus('done')
        } }
        >
        <p>Your browser does not support the <code>audio</code> element.</p>
      </audio>
      { socket ? 
        <Messages socket={socket} onMessage={message => socketMessage(message)}></Messages>
        : <></>
      }
    </div>
  )
}

export default Main