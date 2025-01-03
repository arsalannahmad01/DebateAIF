import { motion } from 'framer-motion';

const PracticeHeader = ({title, topic, timeRemaining, currentSpeaker, isRunning, onTimerToggle }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-16 left-0 right-0 bg-white shadow-sm z-40 h-16">
      <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">
            {title}
          </h1>
          <span className="text-gray-500">|</span>
          <div className="text-gray-600">
            Remaining Time: {formatTime(timeRemaining.total)}
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Current Speaker Timer */}
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500">
              {currentSpeaker === 'ai' ? 'AI Speaking' : 'Your Turn'}
            </div>
            <div className="text-2xl font-mono text-gray-700">
              {formatTime(timeRemaining[currentSpeaker])}
            </div>
          </div>

          {/* Timer Controls */}
          <button
            onClick={onTimerToggle}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isRunning 
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeHeader; 