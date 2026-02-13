import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

const LoadingScreen = ({ text = "GENERATE..." }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- 1. CHROMA KEY LOGIC (Tetap dipertahankan) ---
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;

    const processFrame = () => {
      if (video.paused || video.ended) {
         animationFrameId = requestAnimationFrame(processFrame);
         return;
      }

      // Sync size
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Draw & Chroma Key
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      try {
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Optimization: Loop with slightly less checks if possible
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Simple Green Screen Logic
          if (g > 100 && g > r * 1.4 && g > b * 1.4) {
            data[i + 3] = 0; // Alpha 0
          }
        }
        ctx.putImageData(frame, 0, 0);
      } catch (e) {
        // Silent catch
      }

      animationFrameId = requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', processFrame);
    return () => {
        cancelAnimationFrame(animationFrameId);
        video.removeEventListener('play', processFrame);
    };
  }, []);

  // --- 2. PROGRESS SIMULATION ---
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 5));
    }, 150);
    
    // Ensure canvas shows after 1 second even if video hasn't loaded
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden font-mono"
    >
        {/* --- BACKGROUND EFFECTS --- */}
        
        {/* Vignette (Gelap di pinggir) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,#000_100%)] pointer-events-none" />

        {/* --- HIDDEN VIDEO SOURCE --- */}
        <video 
            ref={videoRef}
            src="/loading.mp4" 
            autoPlay loop muted playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlay={() => setIsVideoLoaded(true)}
            onCanPlay={() => setIsVideoLoaded(true)}
            className="absolute opacity-0 pointer-events-none w-1 h-1"
        />

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
            
            {/* CANVAS CONTAINER WITH SCANLINE */}
            <div className="relative w-full aspect-video flex items-center justify-center mb-8">
                {/* The Character/Video */}
                <canvas 
                    ref={canvasRef}
                    className={`w-full h-full object-contain transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-50'}`}
                />
                
                {/* Loading Indicator when Video Not Ready */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block w-8 h-8 border-2 border-white border-t-yellow-400 rounded-full animate-spin"></div>
                      <p className="text-white text-xs mt-2">Loading Animation...</p>
                    </div>
                  </div>
                )}
                
                {/* Scanline Effect (Garis berjalan turun) */}
                <div className="absolute inset-0 h-[20%] w-full animate-scan pointer-events-none" />
            </div>

            {/* TEXT & LOADING BAR */}
            <div className="w-full space-y-2">
                <div className="flex justify-between items-end">
                    <h2 className="font-['Bangers'] text-4xl text-white tracking-wider animate-pulse uppercase">
                        {text}
                    </h2>
                    <span className="text-xs text-yellow-400 font-bold mb-1">
                        {Math.floor(progress)}%
                    </span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-4 border-2 border-white bg-gray-900 relative overflow-hidden shadow-[4px_4px_0_#000]">
                    {/* Animated Fill */}
                    <motion.div 
                        className="h-full bg-white relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    >
                        {/* Striped Texture on Bar */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 5px, transparent 5px, transparent 10px)' }} />
                    </motion.div>
                </div>

                {/* Random Tech Text */}
                <div className="flex justify-between text-[10px] text-gray-500 uppercase mt-2">
                    <span className="animate-bounce">Encrypting...</span>
                </div>
            </div>
        </div>

    </motion.div>,
    document.body
  );
};

export default LoadingScreen;