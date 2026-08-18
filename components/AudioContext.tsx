import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '../types';
import { MUSIC_TRACKS } from '../constants';

export const resolveStreamUrl = (url: string): string => {
  if (!url) return '';
  if (url.includes('dropbox.com') || url.includes('dropboxusercontent.com')) {
    return `/api/audio-stream?url=${encodeURIComponent(url)}`;
  }
  return url;
};

interface AudioContextType {
  isPlaying: boolean;
  isBuffering: boolean;
  currentTrack: Track;
  togglePlay: () => void;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  seekTo: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  analyserRef: React.RefObject<AnalyserNode | null>;
  audioContextRef: React.RefObject<AudioContext | null>;
  currentTime: number;
  duration: number;
  playbackError: string | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(MUSIC_TRACKS[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const playRequestIdRef = useRef<number>(0);

  // Set audio source when currentTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;
    const targetSrc = resolveStreamUrl(currentTrack.url);
    
    // Check if the current audio src matches our target URL
    const isCurrentSrc = audio.src && (
      audio.src === targetSrc || 
      audio.src.endsWith(targetSrc) || 
      audio.src.includes(encodeURIComponent(currentTrack.url))
    );

    if (!isCurrentSrc) {
      audio.src = targetSrc;
      audio.load();
    }
  }, [currentTrack]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaybackError(null);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsBuffering(false);
    } else {
      const targetSrc = resolveStreamUrl(currentTrack.url);
      if (!audio.src || audio.src === '' || audio.src === window.location.href || audio.error) {
        audio.src = targetSrc;
        audio.load();
      }

      setIsBuffering(true);
      const requestId = ++playRequestIdRef.current;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (requestId === playRequestIdRef.current) {
              setIsPlaying(true);
              setIsBuffering(false);
            }
          })
          .catch((err) => {
            // Only report if this was the latest play request
            if (requestId === playRequestIdRef.current) {
              setIsBuffering(false);
              // Ignore AbortError caused by rapid user clicks
              if (err.name !== 'AbortError') {
                console.warn('Audio play request notice:', err);
                setIsPlaying(false);
              }
            }
          });
      }
    }
  }, [isPlaying, currentTrack]);

  const playTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaybackError(null);

    const isDifferent = currentTrack.id !== track.id;
    setCurrentTrack(track);

    const targetSrc = resolveStreamUrl(track.url);
    const requestId = ++playRequestIdRef.current;

    const needsLoad = isDifferent || !audio.src || !audio.src.includes(encodeURIComponent(track.url)) || audio.error;
    if (needsLoad) {
      audio.src = targetSrc;
      audio.load();
    }

    setIsBuffering(true);
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (requestId === playRequestIdRef.current) {
            setIsPlaying(true);
            setIsBuffering(false);
          }
        })
        .catch((err) => {
          if (requestId === playRequestIdRef.current) {
            setIsBuffering(false);
            if (err.name !== 'AbortError') {
              console.warn('Track switch play notice:', err);
              // Retry on user gesture context if needed
              setTimeout(() => {
                if (audioRef.current && requestId === playRequestIdRef.current) {
                  audioRef.current.play()
                    .then(() => {
                      setIsPlaying(true);
                      setIsBuffering(false);
                    })
                    .catch(() => {});
                }
              }, 100);
            }
          }
        });
    }
  }, [currentTrack.id]);

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsBuffering(false);
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current && isFinite(time)) {
      try {
        audioRef.current.currentTime = Math.max(0, Math.min(time, duration || time));
        setCurrentTime(time);
      } catch (err) {
        console.warn('Seek error:', err);
      }
    }
  }, [duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsBuffering(false);
    };

    const onCanPlay = () => {
      setIsBuffering(false);
    };

    const onPlay = () => {
      setIsPlaying(true);
      setIsBuffering(false);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onWaiting = () => {
      setIsBuffering(true);
    };

    const onPlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setIsBuffering(false);
      // Auto-advance to next track in catalog
      const currentIndex = MUSIC_TRACKS.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length;
      const nextTrack = MUSIC_TRACKS[nextIndex];
      if (nextTrack) {
        playTrack(nextTrack);
      }
    };

    const onError = (e: Event) => {
      const err = (e.target as HTMLAudioElement)?.error;
      console.warn('Audio stream event notice:', err);
      setIsBuffering(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('durationchange', onLoadedMetadata);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('durationchange', onLoadedMetadata);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentTrack.id, playTrack]);

  return (
    <AudioContext.Provider value={{ 
      isPlaying, 
      isBuffering,
      currentTrack, 
      togglePlay, 
      playTrack, 
      pauseTrack,
      seekTo,
      audioRef, 
      analyserRef,
      audioContextRef,
      currentTime,
      duration,
      playbackError
    }}>
      <audio 
        ref={audioRef} 
        src={resolveStreamUrl(currentTrack.url)} 
        preload="auto"
        playsInline
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
