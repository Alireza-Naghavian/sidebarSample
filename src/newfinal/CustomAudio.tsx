'use client';

import secondsToTimeString from '@/utils/SecondToTimeString';
import { useWavesurfer } from '@wavesurfer/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
type TelegramVoicePlayerProps = {
  src: string; // URL یا Blob ویس
  isOutgoing?: boolean; // برای تعیین رنگ پس‌زمینه (پیام فرستنده یا گیرنده)
};

const VoicePlayer: React.FC<TelegramVoicePlayerProps> = ({ src, isOutgoing = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // وضعیت پخش و زمان
  const [duration, setDuration] = useState(0);

  const {wavesurfer,currentTime,isPlaying,isReady} = useWavesurfer({
    container: containerRef,
    waveColor: '#E1E3E6',
    
    progressColor: isOutgoing ? '#0088cc' : '#4CAF50',
    cursorWidth: 0, // نبودن نشانگر متحرک
    barWidth: 2, // ضخامت هر ستون موج
    barRadius: 1,
    height: 30, // ارتفاع موج در پیکسل
    normalize: true, // نرمال‌سازی سطح صدا
    hideScrollbar: true,
    url:src,
    backend: 'MediaElement',
  });

  useEffect(()=>{
    if(isReady && wavesurfer){
        const total = wavesurfer.getDuration();
        setDuration(total)
    }
  },[isReady,wavesurfer])

  const onPlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  }, [wavesurfer]);






  // وقتی کاربر در نوار پیشرفت seek می‌کند
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ws = wavesurfer;
    if (!ws) return;
    const newTime = Number(e.target.value);
    const positionFraction = newTime / duration; // مقدار بین 0 و 1
    console.log(positionFraction)
    ws.seekTo(positionFraction);
  };
  console.log(duration)
  return (
    <div
      className={`flex items-center gap-x-2 px-3 py-2 rounded-lg
        ${isOutgoing ? 'bg-blue-50' : 'bg-green-50'} 
        max-w-full w-[300px]`}
    >
      {/* دکمه Play / Pause */}
      <button
        onClick={onPlayPause}
        className={`flex-none p-2 rounded-full 
          ${isPlaying ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} 
          hover:opacity-90 transition-opacity duration-150`}
      >
        {isPlaying ? <FaPause className="size-4" /> : <FaPlay className="size-4" />}
      </button>

      {/* کانتینر موج صوتی */}
      <div className="relative flex-1">
        <div ref={containerRef} className="w-full" />
        {/* نوار معمولی Seek برای قابلیت جا‌به‌جایی دقیق */}
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={handleSeek}
          className="absolute bottom-0 left-0 w-full h-1 opacity-0 cursor-pointer"
        />
      </div>

      {/* نمایش زمان جاری / کل */}
      <span className="flex-none text-xs font-mono text-gray-600">
        {secondsToTimeString(currentTime)} / {secondsToTimeString(duration)}
      </span>
    </div>
  );
};

export default VoicePlayer;
