import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { debateService } from '../services/debateService';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, UserIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import DebateInput from '../components/practice/DebateInput';
import Timer from '../components/practice/Timer';
import ScoreModal from '../components/practice/ScoreModal';

const Practice = () => {
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState('');
  const [debateId, setDebateId] = useState(null);
  const [debateData, setDebateData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const aiResponseRef = useRef(null);
  const debateIdRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isAIResponding, setIsAIResponding] = useState(true);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [totalTimeLeft, setTotalTimeLeft] = useState(null);
  const [turnTimeLeft, setTurnTimeLeft] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [isLastTurn, setIsLastTurn] = useState(false);

  useEffect(() => {
    const initializeDebate = async () => {
      try {
        const setupDataString = localStorage.getItem('debateSetupData');
        if (!setupDataString) {
          toast.error('No debate setup data found');
          navigate('/dashboard');
          return;
        }

        const setupData = JSON.parse(setupDataString);
        setTotalTimeLeft(setupData.totalDuration);
        setTurnTimeLeft(setupData.turnDuration);
        localStorage.removeItem('debateSetupData');
        setDebateData(setupData);

        const response = await debateService.initiateDebate(setupData);
        
        if (response.stream) {
          handleAIStream(response.stream);
        } else {
          console.error('No stream available from response');
        }
      } catch (error) {
        console.error('Failed to initialize debate:', error);
        toast.error('Failed to start debate');
        navigate('/dashboard');
      }
    };

    initializeDebate();
  }, [navigate]);

  const handleAIStream = async (reader) => {
    if (!reader) {
      console.error('No stream reader available');
      return;
    }

    let accumulatedResponse = '';
    let isFirstChunk = true;
    setIsAIResponding(true);
    setIsUserTurn(false);

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        console.log('Received chunk:', chunk);

        const lines = chunk.split('\n');
        for (const line of lines) {
          if (!line.trim()) continue;

          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(5).trim();
              if (jsonStr === '[DONE]') {
                console.log('Stream completed');
                await debateService.saveAIResponse(debateIdRef.current, accumulatedResponse);
                setMessages(prev => [...prev, { type: 'ai', content: accumulatedResponse }]);
                setAiResponse('');
                setIsAIResponding(false);
                setIsUserTurn(true);
                break;
              }

              const jsonData = JSON.parse(jsonStr);
              
              if (isFirstChunk && jsonData.debateId) {
                console.log("Debate ID received:", jsonData.debateId);
                debateIdRef.current = jsonData.debateId;
                setDebateId(jsonData.debateId);
                isFirstChunk = false;
                continue;
              }

              if (jsonData.content) {
                accumulatedResponse += jsonData.content;
                setAiResponse(accumulatedResponse);
              }
            } catch (e) {
              console.error('Error parsing JSON:', e, 'Line:', line);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error reading stream:', error);
      toast.error('Error receiving AI response');
      setIsAIResponding(false);
      setIsUserTurn(true);
    } finally {
      if (reader && typeof reader.releaseLock === 'function') {
        reader.releaseLock();
      }
    }
  };

  useEffect(() => {
    if (aiResponseRef.current) {
      requestAnimationFrame(() => {
        const element = aiResponseRef.current;
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }, [aiResponse]);

  const handleUserInput = async (content) => {
    try {
      setIsUserTurn(false);
      setIsAIResponding(true);
      setMessages(prev => [...prev, { type: 'user', content }]);
      
      await debateService.saveUserArgument(debateIdRef.current, content);

      if (isLastTurn) {
        setShowScoreModal(true);
        setIsAIResponding(false);
      } else {
        const aiReader = await debateService.getAIResponse(debateIdRef.current, { content });
        if (aiReader) {
          handleAIStream(aiReader);
        }
      }
    } catch (error) {
      console.error('Error handling user input:', error);
      toast.error('Failed to send your response');
      setIsAIResponding(false);
      setIsUserTurn(!isLastTurn);
    }
  };

  useEffect(() => {
    console.log("Debate ID state updated:", debateId);
  }, [debateId]);

  const handleTotalTimeUp = () => {
    toast.success('Debate time is up!');
    debateService.completeDebate(debateId);
    navigate('/dashboard');
  };

  const handleTurnTimeUp = () => {
    if (isLastTurn) {
      setShowScoreModal(true);
      if (userInput.trim()) {
        handleUserInput(userInput);
      }
    } else if (userInput.trim()) {
      handleUserInput(userInput);
    }
  };

  useEffect(() => {
    if (totalTimeLeft && turnTimeLeft) {
      setIsLastTurn(totalTimeLeft - turnTimeLeft <= 0 && isUserTurn);
    }
  }, [totalTimeLeft, turnTimeLeft, isUserTurn]);

  useEffect(() => {
    if (messages.length > 0 && totalTimeLeft && turnTimeLeft) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage) {
        const newTotalTime = Math.max(0, totalTimeLeft - turnTimeLeft);
        setTotalTimeLeft(newTotalTime);
      }
    }
  }, [messages.length]);

  return (
    <div className="min-h-screen h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Dashboard
            </button>

            {totalTimeLeft && (
              <Timer 
                seconds={totalTimeLeft}
                isCountdown={false}
                label="Debate Time"
              />
            )}

            {debateData && (
              <div className="text-white font-medium">
                {debateData.name}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex h-[calc(100vh-4rem)]">
        <div className="w-1/2 border-r border-gray-800 p-6 flex flex-col h-full">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <ComputerDesktopIcon className="w-6 h-6 text-primary-400" />
              <h2 className="text-lg font-semibold text-white">AI's Stance</h2>
            </div>
            {!isUserTurn && turnTimeLeft && (
              <Timer 
                seconds={turnTimeLeft}
                isCountdown={true}
                onTimeUp={handleTurnTimeUp}
                label="Time"
              />
            )}
          </div>
          
          <div className="flex-1 bg-gray-800/40 backdrop-blur-xl rounded-xl border border-gray-700/50 flex flex-col max-h-[calc(100vh-10rem)]">
            <div 
              ref={aiResponseRef}
              className="flex-1 p-6 overflow-y-auto scrollbar-custom h-full"
            >
              {messages.map((msg, index) => (
                msg.type === 'ai' && (
                  <div key={index} className="mb-4 text-white whitespace-pre-wrap font-mono">
                    {msg.content}
                    <div className="border-b border-gray-700/50 my-4" />
                  </div>
                )
              ))}
              {aiResponse && (
                <div className="text-white whitespace-pre-wrap font-mono">
                  {aiResponse}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/2 p-6 flex flex-col h-full">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <UserIcon className="w-6 h-6 text-secondary-400" />
              <h2 className="text-lg font-semibold text-white">
                Your Response
                {isLastTurn && (
                  <span className="ml-2 text-sm text-red-500 font-normal">
                    (Final Turn)
                  </span>
                )}
              </h2>
            </div>
            {isUserTurn && turnTimeLeft && (
              <Timer 
                seconds={turnTimeLeft}
                isCountdown={true}
                onTimeUp={handleTurnTimeUp}
                label="Time"
              />
            )}
          </div>
          
          <div className="flex-1 bg-gray-800/40 backdrop-blur-xl rounded-xl border border-gray-700/50 flex flex-col max-h-[calc(100vh-10rem)]">
            <div className="flex-1 p-6 overflow-y-auto scrollbar-custom h-full flex flex-col">
              <div className="flex-1">
                {messages.map((msg, index) => (
                  msg.type === 'user' && (
                    <div key={index} className="mb-4 text-white whitespace-pre-wrap font-mono">
                      {msg.content}
                      <div className="border-b border-gray-700/50 my-4" />
                    </div>
                  )
                ))}
              </div>
              
              <DebateInput 
                onSubmit={handleUserInput}
                disabled={!isUserTurn || isAIResponding}
              />
            </div>
          </div>
        </div>
      </div>
      
      <ScoreModal
        isOpen={showScoreModal}
        onClose={() => {
          setShowScoreModal(false);
          navigate('/dashboard');
        }}
        debateId={debateId}
      />
    </div>
  );
};

export default Practice; 