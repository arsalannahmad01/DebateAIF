import { useState } from 'react';
import { motion } from 'framer-motion';
import AIResponse from './AIResponse';
import UserInput from './UserInput';

const DebateSection = ({ 
  currentSpeaker, 
  timeRemaining, 
  isRunning, 
  onTurnEnd, 
  isInputEnabled,
  onUserSubmit,
  waitingForAIResponse,
  messages
}) => {
  // Separate messages by side
  const aiMessages = messages.filter(msg => msg.side === 'ai');
  const userMessages = messages.filter(msg => msg.side === 'user');

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 gap-6">
        {/* AI Side */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <span className="mr-2">🤖</span>
              AI's Arguments
            </h2>
          </div>
          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {aiMessages.map((message, index) => (
              <AIResponse 
                key={index} 
                message={message} 
                isStreaming={message.isStreaming}
              />
            ))}
            {/* Show loading state only when waiting for AI and no streaming message */}
            {waitingForAIResponse && !messages.some(m => m.isStreaming) && (
              <div className="flex items-center space-x-2 text-gray-500 p-4">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              </div>
            )}
          </div>
        </div>

        {/* User Side */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <span className="mr-2">👤</span>
              Your Arguments
            </h2>
          </div>
          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {userMessages.map((message, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1 bg-primary-50 p-4 rounded-lg">
                  <p className="text-gray-800">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section - Full Width */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <UserInput 
          onSubmit={onUserSubmit}
          disabled={!isInputEnabled || !isRunning}
        />
      </div>
    </div>
  );
};

export default DebateSection; 