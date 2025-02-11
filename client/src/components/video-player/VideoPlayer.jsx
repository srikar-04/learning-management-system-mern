import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Slider } from '../ui/slider';

function VideoPlayer({width = '100%', height='100%', url}) {

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [showControls, setShowControls] = useState(true)

    const playerRef = useRef(null)
    const playerContainerRef = useRef(null)
    const controlsTimeoutRef = useRef(null)

    const handlePlayAndPause = () => {
        setPlaying(prev => !prev)
    }

    const handleProgress = () => {

    }

  return (
    <div 
        ref={playerContainerRef}
        className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out 
        ${fullScreen ? 'w-screen h-screen' : '' }`}

        style={{width, height}}
    >
        <ReactPlayer 
            ref={playerRef}
            className='absolute top-0 left-0'
            width='100%'
            height='100%'
            url={url}
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
        />
        {
            showControls && ( <div className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0' }`}>
                <Slider
                    value={[played*100]}
                    max={100}
                    step={0.1}
                    onValueChange={}
                    onValueCommit={}
                    className='w-full mb-4'
                />
            </div> )
        }
    </div>
  )
}

export default VideoPlayer