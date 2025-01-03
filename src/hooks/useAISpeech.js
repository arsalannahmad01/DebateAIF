import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const useAISpeech = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [speechQueue, setSpeechQueue] = useState([]);
  
  const synth = useRef(window.speechSynthesis);
  const currentUtterance = useRef(null);
  const processingTimeout = useRef(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (!synth.current) {
      toast.error('Speech synthesis is not supported in your browser');
      return;
    }

    setIsSupported(true);

    const loadVoices = () => {
      const availableVoices = synth.current.getVoices();
      const englishVoices = availableVoices.filter(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      );

      if (englishVoices.length > 0) {
        console.log('Available voices:', englishVoices);
        setVoices(englishVoices);
        const defaultVoice = englishVoices.find(v => v.name.includes('Google')) || englishVoices[0];
        setSelectedVoice(defaultVoice);
      }
    };

    // Initial load attempt
    loadVoices();
    
    // Handle async voice loading
    synth.current.onvoiceschanged = loadVoices;

    // Cleanup
    return () => {
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
      }
      synth.current.cancel();
    };
  }, []);

  // Process speech queue
  const processNextInQueue = useCallback(() => {
    if (speechQueue.length === 0 || !selectedVoice || isSpeaking) return;

    try {
      const textToSpeak = speechQueue[0];
      
      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.voice = selectedVoice;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Store current utterance
      currentUtterance.current = utterance;

      // Setup handlers
      utterance.onstart = () => {
        console.log('Started speaking:', textToSpeak);
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        console.log('Finished speaking');
        setIsSpeaking(false);
        currentUtterance.current = null;
        // Remove spoken text from queue
        setSpeechQueue(prev => prev.slice(1));
        // Process next item after a short delay
        processingTimeout.current = setTimeout(() => {
          processNextInQueue();
        }, 100);
      };

      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        if (event.error !== 'canceled') {
          toast.error('Speech synthesis error occurred');
        }
        setIsSpeaking(false);
        currentUtterance.current = null;
        // Remove problematic text from queue
        setSpeechQueue(prev => prev.slice(1));
        // Try next item after a delay
        processingTimeout.current = setTimeout(() => {
          processNextInQueue();
        }, 100);
      };

      // Ensure clean state before speaking
      synth.current.cancel();
      
      // Small delay before speaking
      setTimeout(() => {
        if (currentUtterance.current === utterance) {
          synth.current.speak(utterance);
        }
      }, 50);

    } catch (error) {
      console.error('Speech processing error:', error);
      setIsSpeaking(false);
      setSpeechQueue(prev => prev.slice(1));
    }
  }, [speechQueue, selectedVoice, isSpeaking]);

  // Watch queue for changes
  useEffect(() => {
    if (speechQueue.length > 0 && !isSpeaking) {
      processNextInQueue();
    }
  }, [speechQueue, isSpeaking, processNextInQueue]);

  // Add text to queue
  const speak = useCallback((text) => {
    if (!text?.trim() || !isSupported) return;
    
    setSpeechQueue(prev => [...prev, text.trim()]);
  }, [isSupported]);

  // Stop speaking
  const stop = useCallback(() => {
    if (currentUtterance.current) {
      synth.current.cancel();
      currentUtterance.current = null;
    }
    setIsSpeaking(false);
    setSpeechQueue([]);
    if (processingTimeout.current) {
      clearTimeout(processingTimeout.current);
    }
  }, []);

  // Change voice
  const changeVoice = useCallback((voice) => {
    if (!voice) return;
    stop();
    setSelectedVoice(voice);
  }, [stop]);

  return {
    voices,
    selectedVoice,
    isSpeaking,
    isSupported,
    speak,
    stop,
    changeVoice,
    queueLength: speechQueue.length
  };
};

export default useAISpeech; 