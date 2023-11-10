import React, { useEffect, useRef, useState } from 'react';
import { IoPauseSharp, IoPlaySharp, IoPlaySkipBackOutline, IoPlaySkipForwardOutline } from "react-icons/io5";
import { PiRepeatOnceLight, PiRepeatLight } from "react-icons/pi"
import './MusicPlayer.css'

const MusicPlayer = ({ src, onListen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', () => {
      console.log(audioRef.current.currentTime)
      setCurrentTime(audioRef.current.currentTime);
      onListen(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);

      if (isRepeating && audioRef.current.currentTime >= audioRef.current.duration) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    });
  }, [isRepeating]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const toggleSkipBack = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(event.target.value);
  };

  const handleTimeChange = (event) => {
    audioRef.current.currentTime = event.target.value;
    setCurrentTime(event.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={src} onTimeUpdate={(e) => onListen(e.timeStamp)} />
      <div className="controls">
        <IoPlaySkipBackOutline className='icon' onClick={toggleSkipBack} />
        {isPlaying ? <IoPauseSharp className='icon' onClick={togglePlay} /> : <IoPlaySharp className='icon' onClick={togglePlay} />}
        <IoPlaySkipForwardOutline className='icon' />
        {isRepeating ?
          <PiRepeatOnceLight onClick={toggleRepeat} className={isRepeating ? 'icon active' : 'icon'} />
          :
          <PiRepeatLight onClick={toggleRepeat} className={isRepeating ? 'icon active' : 'icon'} />
        }
      </div>
      <div className="progress-bar">
        <input
          class="range"
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleTimeChange}
        />
        <div className="time-display">
          {currentTime ?
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            :
            <span>0:00 / {formatTime(duration)}</span>
          }
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;