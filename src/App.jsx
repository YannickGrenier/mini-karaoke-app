import { useState } from 'react'
import { music } from './assets/music.js';
import MusicPlayer from './MusicPlayer.jsx';
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <>
      <MusicPlayer src={music.russianSpies.mp3} onListen={(e) => setCurrentTime(e)} />
      <Lyrics currentTime={currentTime} />
    </>
  )
}

const Lyrics = ({ currentTime }) => {
  return (
    <div className='lyrics'>
      {music.russianSpies.json.map((line, i) => {
        if (Array.isArray(line)) {
          return (
            <p key={i}>
              {
                line.map((subline, x) => {
                  return <span key={x} id={subline.startTimeMs} className={subline.startTimeMs - 500 <= currentTime * 1000 && "passed"}> {subline.words}</span>
                })
              }
            </p>
          )
        }
        else {
          return <p key={i} id={line.startTimeMs} className={line.startTimeMs - 500 <= currentTime * 1000 && "passed"}>{line.words}</p>
        }
      })
      }
    </div>
  )
}

export default App
