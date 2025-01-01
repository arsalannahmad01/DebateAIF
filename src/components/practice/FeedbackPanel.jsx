import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const CircularProgress = ({ value, label, color }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${value}, 100`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
        {value}%
      </div>
    </div>
    <div className="mt-2 text-sm font-medium text-gray-600">{label}</div>
  </div>
);

const FeedbackPanel = ({ feedback, isOpen, onToggle }) => {
  return (
    <div className="fixed top-32 right-0 h-[calc(100vh-8rem)] z-10 flex">
      <button
        onClick={onToggle}
        className="h-10 bg-white shadow-lg p-2 rounded-l-lg"
      >
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </motion.div>
      </button>

      <motion.div
        className="h-full bg-white shadow-lg"
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 384 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 h-full overflow-y-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Feedback</h2>

              {/* Progress Indicators */}
              <div className="flex justify-between mb-8">
                <CircularProgress
                  value={feedback.scores.logic}
                  label="Logic"
                  color="#4F46E5"
                />
                <CircularProgress
                  value={feedback.scores.persuasion}
                  label="Persuasion"
                  color="#7C3AED"
                />
                <CircularProgress
                  value={feedback.scores.structure}
                  label="Structure"
                  color="#2563EB"
                />
              </div>

              {/* Feedback Cards */}
              <div className="space-y-4">
                {feedback.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      suggestion.type === 'strength'
                        ? 'bg-green-50 border border-green-100'
                        : 'bg-blue-50 border border-blue-100'
                    }`}
                  >
                    <h3 className="font-medium mb-2">
                      {suggestion.type === 'strength' ? '💪 Strength' : '💡 Improvement'}
                    </h3>
                    <p className="text-gray-700">{suggestion.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FeedbackPanel; 