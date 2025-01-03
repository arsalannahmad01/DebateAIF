import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import useAISpeech from '../../hooks/useAISpeech';

const AIVoiceControls = ({ onVoiceChange }) => {
  const {
    voices,
    selectedVoice,
    isSpeaking,
    isSupported,
    changeVoice,
    stop,
    speak
  } = useAISpeech();

  const handleVoiceChange = (e) => {
    const voice = voices.find(v => v.name === e.target.value);
    if (voice) {
      changeVoice(voice);
      onVoiceChange(voice);
    }
  };

  const handleTestVoice = () => {
    speak('This is a test of the selected voice.');
  };

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500 bg-yellow-50 p-2 rounded">
        Please use Chrome or Edge browser for voice features
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg">
      <select
        value={selectedVoice?.name || ''}
        onChange={handleVoiceChange}
        className="text-sm border rounded-lg px-3 py-1.5 bg-white shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button
        onClick={isSpeaking ? stop : handleTestVoice}
        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors
          ${isSpeaking 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          }`}
      >
        {isSpeaking ? (
          <>
            <SpeakerXMarkIcon className="w-4 h-4" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <SpeakerWaveIcon className="w-4 h-4" />
            <span>Test</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AIVoiceControls; 