import React, { useEffect, useRef } from 'react';
import { useAudio } from './AudioContext';

const Visualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPlaying, isBuffering, analyserRef, currentTrack } = useAudio();
  const animationRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth || 300;
        canvas.height = canvas.parentElement.clientHeight || 56;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const renderFrame = () => {
      animationRef.current = requestAnimationFrame(renderFrame);

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // If not playing, draw an elegant resting line
      if (!isPlaying) {
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(width, midY);
        ctx.strokeStyle = 'rgba(87, 91, 95, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return;
      }

      phaseRef.current += 0.05;

      let hasRealAudioData = false;
      let dataArray: Uint8Array | null = null;
      let bufferLength = 64;

      if (analyserRef.current) {
        try {
          bufferLength = analyserRef.current.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          analyserRef.current.getByteTimeDomainData(dataArray);

          // Check if data is not flat 128
          for (let i = 0; i < bufferLength; i += 4) {
            if (Math.abs(dataArray[i] - 128) > 2) {
              hasRealAudioData = true;
              break;
            }
          }
        } catch {
          hasRealAudioData = false;
        }
      }

      // Draw active glow backdrop
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#00f0ff');
      gradient.addColorStop(0.5, '#12B5CB');
      gradient.addColorStop(1, '#a855f7');

      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = isBuffering ? 4 : 8;

      ctx.beginPath();

      if (hasRealAudioData && dataArray) {
        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
      } else {
        // High-end multi-harmonic synthetic waveform
        const points = 60;
        const bpmSpeed = (currentTrack.bpm || 100) / 100;
        const sliceWidth = width / points;

        for (let i = 0; i <= points; i++) {
          const x = i * sliceWidth;
          const progress = i / points;
          const envelope = Math.sin(progress * Math.PI); // Pin to ends

          const wave1 = Math.sin(progress * 8 + phaseRef.current * bpmSpeed * 1.5) * 0.35;
          const wave2 = Math.sin(progress * 14 - phaseRef.current * bpmSpeed * 2.2) * 0.25;
          const wave3 = Math.cos(progress * 22 + phaseRef.current * 0.8) * 0.15;

          const amplitude = (wave1 + wave2 + wave3) * envelope * (height * 0.42);
          const y = midY + amplitude;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    };

    renderFrame();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isBuffering, analyserRef, currentTrack]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl opacity-90 block" />;
};

export default Visualizer;