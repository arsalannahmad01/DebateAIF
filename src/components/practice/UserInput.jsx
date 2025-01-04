import { useState } from 'react';
import VoiceInput from './VoiceInput';

const UserInput = ({ onSubmit, disabled, timeRemaining }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !disabled) {
      onSubmit(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-start gap-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "Wait for your turn..." : "Type your argument..."}
          className="w-full p-3 pr-24 border rounded-lg resize-none h-24
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <div className="flex flex-col gap-2">
          <VoiceInput
            onTranscript={setInputText}
            isEnabled={!disabled}
          />
          <button
            type="submit"
            disabled={disabled || !inputText.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg
              hover:bg-primary-600 focus:outline-none focus:ring-2
              focus:ring-primary-500 focus:ring-offset-2
              disabled:bg-gray-300 disabled:cursor-not-allowed
              h-10 whitespace-nowrap"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserInput; 