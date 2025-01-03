import { useRef, useEffect } from 'react';
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
  const aiMessages = messages.filter(msg => msg.side === 'ai');
  const userMessages = messages.filter(msg => msg.side === 'user');
  
  const aiMessagesRef = useRef(null);
  const userMessagesRef = useRef(null);

  const scrollToBottom = (containerRef) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(aiMessagesRef);
  }, [aiMessages, waitingForAIResponse]);

  useEffect(() => {
    scrollToBottom(userMessagesRef);
  }, [userMessages]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-4">
      <div className="grid grid-cols-2 gap-6">
        {/* AI Side */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <span className="mr-2">🤖</span>
              AI's Arguments
            </h2>
          </div>
          <div 
            ref={aiMessagesRef}
            className="h-[calc(100vh-16rem)] overflow-y-auto space-y-3 scroll-smooth"
          >
            {aiMessages.map((message, index) => (
              <AIResponse 
                key={index} 
                message={message} 
                isStreaming={message.isStreaming}
              />
            ))}
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
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <span className="mr-2">👤</span>
              Your Arguments
            </h2>
          </div>
          <div 
            ref={userMessagesRef}
            className="h-[calc(100vh-22rem)] overflow-y-auto space-y-3 scroll-smooth"
          >
            {userMessages.map((message, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-1 bg-primary-50 p-4 rounded-lg">
                  <p className="text-gray-800">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Section */}
          <div className="mt-4 pt-4 border-t">
            <UserInput 
              onSubmit={onUserSubmit}
              disabled={!isInputEnabled || currentSpeaker !== 'user'}
              timeRemaining={timeRemaining.user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateSection; 