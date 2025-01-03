// import { useState, useEffect, useCallback, useRef } from 'react';
// import { toast } from 'react-hot-toast';

// const useSpeechSynthesis = () => {
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isSupported, setIsSupported] = useState(false);
//   const synth = useRef(window.speechSynthesis);

//   // Initialize speech synthesis
//   useEffect(() => {
//     if (!synth.current) {
//       toast.error('Speech synthesis is not supported in your browser');
//       return;
//     }

//     setIsSupported(true);

//     const loadVoices = () => {
//       return new Promise((resolve) => {
//         let voices = synth.current.getVoices();
//         if (voices.length > 0) {
//           resolve(voices);
//         } else {
//           synth.current.onvoiceschanged = () => {
//             voices = synth.current.getVoices();
//             resolve(voices);
//           };
//         }
//       });
//     };

//     const initializeVoices = async () => {
//       try {
//         const availableVoices = await loadVoices();
//         const englishVoices = availableVoices
//           .filter(voice => voice.lang.startsWith('en'))
//           .sort((a, b) => {
//             if (a.name.includes('Google')) return -1;
//             if (b.name.includes('Google')) return 1;
//             return 0;
//           });

//         if (englishVoices.length > 0) {
//           console.log('Available voices:', englishVoices);
//           setVoices(englishVoices);
//           setSelectedVoice(englishVoices[0]);
          
//           // Test voice immediately
//           const testUtterance = new SpeechSynthesisUtterance('Voice system initialized');
//           testUtterance.voice = englishVoices[0];
//           synth.current.speak(testUtterance);
//         } else {
//           toast.error('No English voices found');
//         }
//       } catch (error) {
//         console.error('Error loading voices:', error);
//         toast.error('Failed to load voices');
//       }
//     };

//     initializeVoices();

//     return () => {
//       synth.current.cancel();
//     };
//   }, []);

//   const speak = useCallback((text) => {
//     if (!text || !selectedVoice) return;

//     // Cancel any ongoing speech
//     synth.current.cancel();

//     try {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.voice = selectedVoice;
//       utterance.volume = 1;
//       utterance.rate = 0.9; // Slightly slower for better clarity
//       utterance.pitch = 1;

//       utterance.onstart = () => {
//         console.log('Started speaking:', text);
//         setIsSpeaking(true);
//       };

//       utterance.onend = () => {
//         console.log('Finished speaking');
//         setIsSpeaking(false);
//       };

//       utterance.onerror = (event) => {
//         console.error('Speech error:', event);
//         setIsSpeaking(false);
//       };

//       synth.current.speak(utterance);
//     } catch (error) {
//       console.error('Speech synthesis error:', error);
//       toast.error('Failed to speak');
//       setIsSpeaking(false);
//     }
//   }, [selectedVoice]);

//   const stop = useCallback(() => {
//     synth.current.cancel();
//     setIsSpeaking(false);
//   }, []);

//   const changeVoice = useCallback((voice) => {
//     if (!voice) return;
    
//     setSelectedVoice(voice);
//     synth.current.cancel();
    
//     // Test new voice
//     const utterance = new SpeechSynthesisUtterance('Voice changed');
//     utterance.voice = voice;
//     synth.current.speak(utterance);
//   }, []);

//   return {
//     voices,
//     selectedVoice,
//     isSpeaking,
//     isSupported,
//     speak,
//     stop,
//     changeVoice
//   };
// };

// export default useSpeechSynthesis; 



import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-hot-toast';

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const synth = useRef(window.speechSynthesis);

  // Initialize speech synthesis
  useEffect(() => {
    if (!synth.current) {
      toast.error('Speech synthesis is not supported in your browser');
      return;
    }

    setIsSupported(true);

    const loadVoices = () => {
      return new Promise((resolve) => {
        let voices = synth.current.getVoices();
        if (voices.length > 0) {
          resolve(voices);
        } else {
          synth.current.onvoiceschanged = () => {
            voices = synth.current.getVoices();
            resolve(voices);
          };
        }
      });
    };

    const initializeVoices = async () => {
      try {
        const availableVoices = await loadVoices();
        const englishVoices = availableVoices
          .filter(voice => voice.lang.startsWith('en'))
          .sort((a, b) => {
            if (a.name.includes('Google')) return -1;
            if (b.name.includes('Google')) return 1;
            return 0;
          });

        if (englishVoices.length > 0) {
          console.log('Available voices:', englishVoices);
          setVoices(englishVoices);
          setSelectedVoice(englishVoices[0]);
          
          // Test voice immediately
          const testUtterance = new SpeechSynthesisUtterance('Voice system initialized');
          testUtterance.voice = englishVoices[0];
          synth.current.speak(testUtterance);
        } else {
          toast.error('No English voices found');
        }
      } catch (error) {
        console.error('Error loading voices:', error);
        toast.error('Failed to load voices');
      }
    };

    initializeVoices();

    return () => {
      synth.current.cancel();
    };
  }, []);

  const speak = useCallback((text) => {
    if (!text || !selectedVoice) {
      toast.error('No voice selected or text provided');
      return;
    }

    if (synth.current.speaking) {
      console.log('Currently speaking, waiting for it to finish');
      synth.current.cancel(); // Stop ongoing speech
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.volume = 1;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      console.log('Speech started:', text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      console.log('Speech ended');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      toast.error('An error occurred during speech synthesis');
    };

    synth.current.speak(utterance);
  }, [selectedVoice]);

  const stop = useCallback(() => {
    synth.current.cancel();
    setIsSpeaking(false);
  }, []);

  const changeVoice = useCallback((voice) => {
    if (!voice) return;

    setSelectedVoice(voice);
    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance('Voice changed');
    utterance.voice = voice;
    synth.current.speak(utterance);
  }, []);

  return {
    voices,
    selectedVoice,
    isSpeaking,
    isSupported,
    speak,
    stop,
    changeVoice
  };
};

export default useSpeechSynthesis;
