"use client"

import secondsToTimeString from '@/utils/secondTimeToString';
import { Typography, useTheme } from '@mui/material';
import { useWavesurfer } from '@wavesurfer/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa6';
type VoicePlayerProps = {
    src:string,
    isOutGoing:boolean  //check role flag
}

function VoicePlayer({isOutGoing,src}: VoicePlayerProps) {
  // states
  const [duration, setDuration] = useState(0);

  // hooks
const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentTime, isPlaying, isReady, wavesurfer } = useWavesurfer({
    container: containerRef,
    waveColor: theme.palette.common.white,
    progressColor: isOutGoing ? theme.palette.primary.light : theme.palette.primary.main,
    cursorWidth: 0,
    barWidth: 3,
    barRadius: .5,
    height: 30,
    normalize: true,
    hideScrollbar: true,
    url: src,
    backend: 'MediaElement',
  });

  useEffect(() => {
    if (isReady && wavesurfer) {
      const total = wavesurfer.getDuration();
      setDuration(total);
    }
  }, [isReady, wavesurfer]);


//   controll pause play
const onPlayPause = useCallback(()=>{
    if(wavesurfer){
        wavesurfer.playPause();
    }
},[wavesurfer])


//seek playing progress

const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(!wavesurfer) return;

  const newTime = Number(e.target.value);
  const positionFraction = newTime / duration;
  wavesurfer.seekTo(positionFraction);
};

  return (
    <div
      className={`flex items-center gap-x-2 rounded-md px-3 py-2 ${isOutGoing ? 'bg-secondary-main' : 'bg-green-50'} w-[300px] max-w-full`}
    >
      {/*  Play / Pause */}
      <button
        onClick={onPlayPause}
        className={`flex size-10 items-center justify-center !rounded-full border-none !bg-common-white shadow-none outline-none ${isPlaying ? '!bg-primary-main !text-common-white' : '!bg-common-white !text-primary-main'} `}
      >
        {isPlaying ? <FaPause className="size-4 pl-1" /> : <FaPlay className="size-4 pl-1" />}
      </button>

      {/* main container */}
      <div className="relative flex-1">
        <div ref={containerRef} className="w-full" />
        {/* seek progress visuall */}
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={handleSeek}
          className="absolute bottom-0 left-0 h-1 w-full cursor-pointer opacity-0"
        />
      </div>

      <span className="text-gray-600 flex-none font-mono text-xs">
        <Typography variant="body1" color="common.white">
          {secondsToTimeString(currentTime)} / {secondsToTimeString(duration)}
        </Typography>
      </span>
    </div>
  );
}

export default VoicePlayer