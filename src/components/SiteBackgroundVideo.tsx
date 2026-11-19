import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Video, Sparkles } from 'lucide-react';
import { heroImg } from '../data/campsiteData';

interface SiteBackgroundVideoProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export const SiteBackgroundVideo: React.FC<SiteBackgroundVideoProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Synchronize playback state with the video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented or interrupted', err);
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Synchronize mute state
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <>
      {/* Fixed Full-Viewport Background Video Container */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster={heroImg}
          className="w-full h-full object-cover object-center transform scale-105"
        >
          {/* Universal fast-start web MP4 first, followed by original MOV */}
          <source src="/assets/corbett_retreat_background.mp4" type="video/mp4" />
          <source src="/assets/aistudio/fc3de1dc-a7a2-4411-a564-18a17a522a0b_a8203b5c.mov" type="video/quicktime" />
          {/* Fallback image */}
          <img
            src={heroImg}
            alt="Corbett Nature Retreat Aerial View"
            className="w-full h-full object-cover object-center"
          />
        </video>

        {/* Global atmospheric tinted scrim to keep site content legible while letting video shine */}
        <div className="absolute inset-0 bg-stone-950/45 backdrop-contrast-105 pointer-events-none" />
      </div>

      {/* Floating Global Audio & Video Controller (Bottom Right) */}
      <aside 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 pointer-events-auto"
        aria-label="Background video controls"
      >
        <div className="bg-stone-950/85 hover:bg-stone-950/95 backdrop-blur-md border border-white/15 rounded-full p-1.5 shadow-2xl flex items-center gap-1.5 transition-all text-xs text-stone-200">
          
          {/* Status Label (desktop) */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              {isPlaying && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="tracking-wide">Kyari Aerial View</span>
          </div>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={onTogglePlay}
            className={`p-2 rounded-full transition-all flex items-center justify-center ${
              isPlaying
                ? 'bg-stone-850 hover:bg-stone-800 text-stone-200 hover:text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold'
            }`}
            title={isPlaying ? 'Pause background video' : 'Play background video'}
            aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Sound Mute / Unmute Button */}
          <button
            onClick={onToggleMute}
            className={`px-2.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              !isMuted
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white'
            }`}
            title={isMuted ? 'Turn on retreat acoustic music' : 'Mute music'}
            aria-label={isMuted ? 'Unmute retreat music' : 'Mute music'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Sound Off</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
