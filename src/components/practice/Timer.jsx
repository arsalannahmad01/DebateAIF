import { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const Timer = ({ seconds, isCountdown = false, onTimeUp, label }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setTimeLeft(seconds); // Reset when seconds prop changes
  }, [seconds]);

  useEffect(() => {
    if (!isCountdown) return; // Only countdown if isCountdown is true

    if (timeLeft <= 30) {
      setIsWarning(true);
    }

    if (timeLeft <= 0) {
      onTimeUp && onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isCountdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
      isWarning && isCountdown
        ? 'bg-red-500/20 text-red-500' 
        : 'bg-gray-800/40 text-gray-300'
    }`}>
      <ClockIcon className="w-4 h-4" />
      <span className="text-sm font-medium">
        {label}: {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default Timer; 