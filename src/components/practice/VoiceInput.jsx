import { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInput = ({ onTranscript, isEnabled }) => {
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const previousTranscriptRef = useRef('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && isEnabled) {
      // Get only the new part of the transcript
      const newWords = transcript.slice(previousTranscriptRef.current.length).trim();
      
      if (newWords) {
        onTranscript(current => {
          previousTranscriptRef.current = transcript;
          return current ? `${current} ${newWords}` : newWords;
        });
      }
    }
  }, [transcript, onTranscript, isEnabled]);

  const startListening = async () => {
    try {
      setError('');
      previousTranscriptRef.current = ''; // Reset previous transcript
      resetTranscript(); // Reset current transcript
      await SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    } catch (err) {
      setError('Failed to start voice recognition');
      console.error('Speech recognition error:', err);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    resetTranscript();
    previousTranscriptRef.current = '';
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={listening ? stopListening : startListening}
        disabled={!isEnabled}
        className={`p-2 rounded-full transition-colors ${
          listening 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } ${!isEnabled && 'opacity-50 cursor-not-allowed'}`}
        title={listening ? 'Stop recording' : 'Start recording'}
      >
        {listening ? (
          <StopIcon className="w-5 h-5" />
        ) : (
          <MicrophoneIcon className="w-5 h-5" />
        )}
      </button>
      {error && (
        <div className="absolute top-full mt-1 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default VoiceInput; 