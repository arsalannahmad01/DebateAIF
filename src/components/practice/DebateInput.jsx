import { useState, useEffect } from 'react';
import { MicrophoneIcon, PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/outline';

const DebateInput = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        if (finalTranscript) {
          setInput(prev => prev + ' ' + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, []);

  // Stop recording when input is disabled
  useEffect(() => {
    if (disabled && isRecording && recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  }, [disabled, isRecording, recognition]);

  const toggleRecording = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      // Stop recording if active before submitting
      if (isRecording && recognition) {
        recognition.stop();
        setIsRecording(false);
      }
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your response or use voice input..."
        disabled={disabled}
        className="flex-1 w-full bg-transparent text-white placeholder:text-gray-500 
                 resize-none focus:outline-none font-mono mb-4 scrollbar-custom"
      />
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
        <button
          onClick={toggleRecording}
          disabled={disabled}
          className={`p-2 rounded-full transition-colors ${
            isRecording 
              ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
              : disabled
                ? 'bg-gray-700/20 text-gray-600 cursor-not-allowed'
                : 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
          }`}
        >
          {isRecording ? (
            <StopIcon className="w-5 h-5" />
          ) : (
            <MicrophoneIcon className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 
                   text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
          <PaperAirplaneIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DebateInput; 