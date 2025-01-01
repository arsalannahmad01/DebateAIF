import { useState } from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const UserInput = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const maxLength = 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice input functionality
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Character count */}
      <div className="absolute right-20 top-3 text-sm text-gray-400">
        {content.length}/{maxLength}
      </div>

      <div className="flex space-x-2">
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setContent(e.target.value);
            }
          }}
          placeholder="Type your argument here..."
          className="flex-1 min-h-[100px] p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />

        <div className="flex flex-col space-y-2">
          <motion.button
            type="button"
            onClick={handleVoiceInput}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg ${
              isRecording
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </motion.button>

          <motion.button
            type="submit"
            disabled={!content.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default UserInput; 