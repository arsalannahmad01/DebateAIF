import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

// Constants moved outside component
const DURATION_OPTIONS = [
  { value: 30, label: '30 minutes' },   // 15-15 split
  { value: 60, label: '1 hour' },       // 30-30 split
  { value: 90, label: '1.5 hours' },    // 45-45 split
  { value: 120, label: '2 hours' }      // 60-60 split
];

const topics = [
  {
    id: 1,
    name: 'Technology & AI',
  },
  {
    id: 2,
    name: 'Social Media & Society',
  },
  {
    id: 3,
    name: 'Privacy & Surveillance',
  },
  {
    id: 4,
    name: 'Future of Work & Automation',
  },
  {
    id: 5,
    name: 'Religion & Faith',
  },
  {
    id: 6,
    name: 'Science & Research',
  },
  {
    id: 7,
    name: 'Climate Change',
  },
  {
    id: 8,
    name: 'Education Systems',
  },
  {
    id: 9,
    name: 'Healthcare & Medicine',
  },
  {
    id: 10,
    name: 'Politics & Democracy',
  },
  {
    id: 11,
    name: 'Economics & Inequality',
  },
  {
    id: 12,
    name: 'Ethics & Philosophy',
  },
  {
    id: 13,
    name: 'Culture & Entertainment',
  },
  {
    id: 14,
    name: 'Sports & Competition',
  },
  {
    id: 15,
    name: 'Gender & Equality',
  },
  {
    id: 16,
    name: 'Immigration & Borders',
  },
  {
    id: 17,
    name: 'War & Peace',
  },
  {
    id: 18,
    name: 'Space Exploration',
  },
  {
    id: 19,
    name: 'Genetic Engineering',
  },
  {
    id: 20,
    name: 'Food & Agriculture',
  },
  {
    id: 21,
    name: 'Mental Health',
  },
  {
    id: 22,
    name: 'Urban Development',
  },
  {
    id: 23,
    name: 'Transportation',
  },
  {
    id: 24,
    name: 'Energy & Resources',
  }
];

const DebateSetup = () => {
  const navigate = useNavigate();
  
  // Form state
  const [debateName, setDebateName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [totalDuration, setTotalDuration] = useState(30);
  const [turnDuration, setTurnDuration] = useState(5);
  const [aiStance, setAiStance] = useState('');

  // UI state
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);

  // Add new state for search
  const [searchQuery, setSearchQuery] = useState('');

  // Add function to filter topics based on search
  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate available turn durations based on total duration
  const getAvailableTurnDurations = useCallback(() => {
    const participantTime = totalDuration / 2;
    const possibleDurations = [];
    
    for (let i = 2; i <= participantTime; i++) {
      if (participantTime % i === 0 && i >= 2 && i <= 15) {
        possibleDurations.push({
          value: i,
          label: `${i} minutes`
        });
      }
    }

    return possibleDurations;
  }, [totalDuration]);

  // Adjust turn duration when total duration changes
  useEffect(() => {
    const availableDurations = getAvailableTurnDurations();
    if (!availableDurations.find(option => option.value === turnDuration)) {
      const defaultDuration = availableDurations.find(option => option.value === 5) 
        || availableDurations[Math.floor(availableDurations.length / 2)];
      setTurnDuration(defaultDuration?.value || availableDurations[0]?.value);
    }
  }, [totalDuration, turnDuration, getAvailableTurnDurations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTopic || !debateName || !aiStance) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const debateConfig = {
        name: debateName,
        topic: selectedTopic,
        aiStance,
        totalDuration: totalDuration * 60, 
        turnDuration: turnDuration * 60
      };

      navigate('/practice', { 
        state: { debateConfig },
        replace: true
      });
    } catch (error) {
      toast.error('Failed to create debate session');
      console.error('Debate setup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h1 className="text-2xl font-bold mb-6">Set Up Your Debate</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Debate Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Debate Title
              </label>
              <input
                type="text"
                value={debateName}
                onChange={(e) => setDebateName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter a title for your debate"
                required
              />
            </div>

            {/* Topic Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Topic
              </label>
              <button
                type="button"
                onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                className="w-full px-4 py-2 border rounded-lg flex items-center justify-between bg-white hover:bg-gray-50"
              >
                <span>{selectedTopic ? selectedTopic.name : 'Choose a topic'}</span>
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </button>
              {/* Topic Dropdown with Search */}
              {isTopicDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg"
                >
                  {/* Search Input */}
                  <div className="p-2 border-b">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search topics..."
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                  </div>
                  
                  {/* Topics List */}
                  <div className="max-h-60 overflow-auto">
                    {filteredTopics.length === 0 ? (
                      <div className="px-4 py-2 text-gray-500 text-center">
                        No topics found
                      </div>
                    ) : (
                      filteredTopics.map(topic => (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => {
                            setSelectedTopic(topic);
                            setIsTopicDropdownOpen(false);
                            setSearchQuery(''); // Clear search when topic is selected
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {topic.name}
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* AI Stance Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI's Position/Instructions
              </label>
              <textarea
                value={aiStance}
                onChange={(e) => setAiStance(e.target.value)}
                placeholder="Describe AI's stance or give specific instructions (e.g., 'Argue that social media has a negative impact on mental health')"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none h-24"
              />
              <p className="mt-1 text-sm text-gray-500">
                Provide a clear stance or specific instructions for the AI debater
              </p>
            </div>

            {/* Time Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Duration
                </label>
                <select
                  value={totalDuration}
                  onChange={(e) => setTotalDuration(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {DURATION_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turn Duration
                </label>
                <select
                  value={turnDuration}
                  onChange={(e) => setTurnDuration(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {getAvailableTurnDurations().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // onClick={handleSubmit}
              disabled={!selectedTopic || !debateName || !aiStance}
              className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg font-medium 
                hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Debate
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DebateSetup; 