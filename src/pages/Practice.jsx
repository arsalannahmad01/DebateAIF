import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PracticeHeader from '../components/practice/PracticeHeader';
import DebateSection from '../components/practice/DebateSection';
import FeedbackPanel from '../components/practice/FeedbackPanel';
import { debateService } from '../services/debateService';

const Practice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const debateConfig = location.state?.debateConfig;

  // Core debate state
  const [debate, setDebate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentSpeaker, setCurrentSpeaker] = useState('ai');
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [waitingForAIResponse, setWaitingForAIResponse] = useState(false);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState({
    total: debateConfig?.totalDuration || 1800,
    user: debateConfig?.turnDuration || 300,
    ai: debateConfig?.turnDuration || 300
  });
  const [isRunning, setIsRunning] = useState(true);
  const [isDebateCompleted, setIsDebateCompleted] = useState(false);

  // Feedback state
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({
    scores: { logic: 0, persuasion: 0, structure: 0 },
    suggestions: []
  });

  const startDebate = async () => {
    console.log('Starting debate');
    try {
      setWaitingForAIResponse(true);
      const stream = await debateService.initiateDebate(debateConfig);
      await handleAIStream(stream);
    } catch (error) {
      console.error('Failed to start debate:', error);
      toast.error('Failed to start debate');
      navigate('/practice/setup');
    }
  };
  // Initialize debate
  useEffect(() => {
    if (!debateConfig) {
      navigate('/practice/setup');
      return;
    }
    
    console.log("WE ARE HERE")
    startDebate();
  }, []); // Run once on mount

  // Modified timer effect to only count down turn time
  useEffect(() => {
    let timer;
    if (isRunning && !isDebateCompleted) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newSpeakerTime = prev[currentSpeaker] - 1;

          // Check if speaker's time is up
          if (newSpeakerTime <= 0) {
            handleTurnEnd();
            return prev;
          }

          return {
            ...prev,
            [currentSpeaker]: newSpeakerTime
          };
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, currentSpeaker, isDebateCompleted]);

  // Handle turn change and deduct time from total
  const handleTurnChange = (from, to) => {
    const turnDuration = debateConfig.turnDuration;
    
    setTimeRemaining(prev => {
      const newTotal = prev.total - turnDuration;
      
      // Check if debate should end
      if (newTotal <= 0) {
        handleDebateComplete();
        return prev;
      }

      return {
        total: newTotal,
        user: to === 'user' ? turnDuration : prev.user,
        ai: to === 'ai' ? turnDuration : prev.ai
      };
    });

    setCurrentSpeaker(to);
  };

  // Modified argument submit handler
  const handleArgumentSubmit = async (content) => {
    if (!isInputEnabled || waitingForAIResponse) return;

    try {
      setIsInputEnabled(false);
      setWaitingForAIResponse(true);

      // Handle turn change from user to AI
      handleTurnChange('user', 'ai');

      // Update debate with user's argument
      await debateService.updateDebate(debateConfig.debateId, {
        userArgument: {
          content,
          type: 'rebuttal'
        }
      });

      // Update UI
      setMessages(prev => [...prev, {
        type: 'user',
        content,
        side: 'user'
      }]);

      // Get AI's response
      const stream = await debateService.getAIResponse(debateConfig.debateId, { content });
      await handleAIStream(stream);

    } catch (error) {
      console.error('Failed to submit argument:', error);
      toast.error('Failed to submit argument');
      setIsInputEnabled(true);
    }
  };

  // Modified AI stream handler
  const handleAIStream = async (stream) => {
    const reader = stream.getReader();
    let aiResponse = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const isDone = line.split(" ")[1] === '[DONE]';
            
            if (isDone) {
              // Handle turn change from AI to user
              handleTurnChange('ai', 'user');

              // Update debate with AI's argument
              await debateService.updateDebate(debateConfig.debateId, {
                aiArgument: {
                  content: aiResponse,
                  type: messages.length === 0 ? 'opening' : 'rebuttal'
                }
              });

              setIsInputEnabled(true);
              setWaitingForAIResponse(false);
              return aiResponse;
            }

            const data = JSON.parse(line.slice(5));
            
            if (data.debateId) {
              debateConfig.debateId = data.debateId;
              continue;
            }
            
            if (data.content !== undefined) {
              aiResponse += data.content;
              // Update streaming UI
              setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg?.type === 'ai' && lastMsg.isStreaming) {
                  return [...prev.slice(0, -1), {
                    ...lastMsg,
                    content: aiResponse
                  }];
                }
                return [...prev, {
                  type: 'ai',
                  content: aiResponse,
                  side: 'ai',
                  isStreaming: true
                }];
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream handling error:', error);
      throw error;
    }
  };

  // Modified turn end handler
  const handleTurnEnd = () => {
    if (currentSpeaker === 'user') {
      handleArgumentSubmit('Time expired - no argument submitted');
    } else {
      // For AI turn timeout
      handleTurnChange('ai', 'user');
    }
  };

  // Handle debate completion
  const handleDebateComplete = async () => {
    setIsRunning(false);
    setIsDebateCompleted(true);
    try {
      await debateService.completeDebate(debateConfig.debateId);
      toast.success('Debate completed!');
    } catch (error) {
      console.error('Error completing debate:', error);
      toast.error('Failed to complete debate');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PracticeHeader 
        title={debateConfig?.name}
        topic={debateConfig?.topic}
        timeRemaining={timeRemaining}
        currentSpeaker={currentSpeaker}
        isRunning={isRunning}
        onTimerToggle={() => setIsRunning(prev => !prev)}
        waitingForAIResponse={waitingForAIResponse}
      />
      
      <main className="pt-32">
        <div className="relative">
          <DebateSection 
            currentSpeaker={currentSpeaker}
            timeRemaining={timeRemaining}
            isRunning={isRunning}
            onTurnEnd={handleTurnEnd}
            isInputEnabled={isInputEnabled}
            onUserSubmit={handleArgumentSubmit}
            waitingForAIResponse={waitingForAIResponse}
            messages={messages}
          />
          <FeedbackPanel 
            feedback={feedback}
            isOpen={showFeedback}
            onToggle={() => setShowFeedback(!showFeedback)}
          />
        </div>
      </main>
    </div>
  );
};

export default Practice; 