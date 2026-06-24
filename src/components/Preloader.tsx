import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress loading state from 0% to 100% over approximately 2.7s
    const duration = 2600;
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    // After 3000ms, start the exit sliding animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center select-none"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Brand logo block */}
      <div className="flex flex-col items-center space-y-6">
        {/* Logo Image */}
        <motion.div
          className="w-24 h-24 overflow-hidden rounded-full border border-gray-100 flex items-center justify-center shadow-md bg-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/logo_icon_1782246015172.jpg`}
            alt="Mercier Chiropractic Logo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Minimalist modern progress bar */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mt-4 relative">
          <motion.div
            className="h-full bg-[#15803d] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Elegant status text */}
        <motion.span
          className="font-mono text-[10px] text-gray-400 font-bold tracking-widest mt-2 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4 }}
        >
          Loading Practice {Math.round(progress)}%
        </motion.span>
      </div>
    </motion.div>
  );
}
