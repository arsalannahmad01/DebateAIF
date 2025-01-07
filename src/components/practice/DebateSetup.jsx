import { useState, Fragment, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  ChatBubbleBottomCenterTextIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { debateService } from '../../services/debateService';
import toast from 'react-hot-toast';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const topics = [
  {
    "id": 1,
    "name": "Social Media Impact",
    "description": "Discuss the effects of social media on society and mental health",
    "category": "Technology",
    "icon": "🌐"
  },
  {
    "id": 2,
    "name": "Climate Change",
    "description": "Debate environmental policies and sustainable solutions",
    "category": "Environment",
    "icon": "🌍"
  },
  {
    "id": 3,
    "name": "AI Ethics",
    "description": "Explore ethical implications of artificial intelligence",
    "category": "Technology",
    "icon": "🤖"
  },
  {
    "id": 4,
    "name": "Religious Freedom",
    "description": "Discuss religious liberty and secular society",
    "category": "Religion",
    "icon": "🕊️"
  },
  {
    "id": 5,
    "name": "Space Exploration",
    "description": "Debate the future of human space exploration",
    "category": "Universe",
    "icon": "🚀"
  },
  {
    "id": 6,
    "name": "Education Reform",
    "description": "Discuss modernization of education systems and methods",
    "category": "Education",
    "icon": "📚"
  },
  {
    "id": 7,
    "name": "Healthcare Access",
    "description": "Debate universal healthcare implementation and challenges",
    "category": "Healthcare",
    "icon": "🏥"
  },
  {
    "id": 8,
    "name": "Privacy Rights",
    "description": "Explore digital privacy and data protection in modern era",
    "category": "Technology",
    "icon": "🔒"
  },
  {
    "id": 9,
    "name": "Free Speech",
    "description": "Debate the limits of free speech and its implications in society",
    "category": "Society",
    "icon": "🗣️"
  },
  {
    "id": 10,
    "name": "Income Inequality",
    "description": "Discuss the causes and solutions to income inequality",
    "category": "Economy",
    "icon": "💰"
  },
  {
    "id": 11,
    "name": "Climate Change Denial",
    "description": "Discuss the impact of climate change denial on global policies",
    "category": "Environment",
    "icon": "❄️"
  },
  {
    "id": 12,
    "name": "Drone Warfare",
    "description": "Debate the ethics and effectiveness of using drones in military operations",
    "category": "Law",
    "icon": "🚁"
  },
  {
    "id": 13,
    "name": "Food Security",
    "description": "Debate global strategies to ensure food security in the face of growing populations",
    "category": "Environment",
    "icon": "🍞"
  },
  {
    "id": 14,
    "name": "Gender Identity",
    "description": "Discuss the recognition of gender identities beyond the binary system",
    "category": "Society",
    "icon": "⚧️"
  },
  {
    "id": 15,
    "name": "Universal Healthcare",
    "description": "Debate the implementation of universal healthcare across all nations",
    "category": "Healthcare",
    "icon": "🌍"
  },
  {
    "id": 16,
    "name": "Genetic Privacy",
    "description": "Explore the ethical issues surrounding access to genetic information",
    "category": "Science",
    "icon": "🧬"
  },
  {
    "id": 17,
    "name": "Socialism vs. Capitalism",
    "description": "Debate the effectiveness and sustainability of socialism versus capitalism",
    "category": "Economy",
    "icon": "💼"
  },
  {
    "id": 18,
    "name": "Youth Voting Rights",
    "description": "Discuss whether the voting age should be lowered to 16",
    "category": "Politics",
    "icon": "🗳️"
  },
  {
    "id": 19,
    "name": "Globalization of Culture",
    "description": "Debate the influence of globalization on local cultures and traditions",
    "category": "Culture",
    "icon": "🌍"
  },
  {
    "id": 20,
    "name": "Animal Rights vs. Human Needs",
    "description": "Discuss the ethical dilemma between animal rights and human needs",
    "category": "Ethics",
    "icon": "🐕"
  },
  {
    "id": 21,
    "name": "Alternative Medicine",
    "description": "Debate the efficacy and safety of alternative medicine treatments",
    "category": "Healthcare",
    "icon": "💊"
  },
  {
    "id": 22,
    "name": "The Role of Government in Health",
    "description": "Discuss the extent to which the government should be involved in healthcare",
    "category": "Politics",
    "icon": "🏛️"
  },
  {
    "id": 23,
    "name": "Child Labor",
    "description": "Debate the prevalence of child labor and solutions for its abolition",
    "category": "Ethics",
    "icon": "👶"
  },
  {
    "id": 24,
    "name": "Online Privacy",
    "description": "Discuss the balance between online privacy and surveillance for security",
    "category": "Technology",
    "icon": "💻"
  },
  {
    "id": 25,
    "name": "Free Trade Agreements",
    "description": "Debate the pros and cons of free trade agreements between countries",
    "category": "Economy",
    "icon": "🌐"
  },
  {
    "id": 26,
    "name": "Social Media Addiction",
    "description": "Discuss the societal impact of excessive social media usage",
    "category": "Technology",
    "icon": "📱"
  },
  {
    "id": 27,
    "name": "Public Surveillance",
    "description": "Debate the ethics and effectiveness of public surveillance systems",
    "category": "Law",
    "icon": "📷"
  },
  {
    "id": 28,
    "name": "Minimum Wage",
    "description": "Debate the necessity of raising the minimum wage to combat poverty",
    "category": "Economy",
    "icon": "💸"
  },
  {
    "id": 29,
    "name": "Immigration Reform",
    "description": "Discuss policies to address the challenges of immigration reform",
    "category": "Politics",
    "icon": "🌎"
  },
  {
    "id": 30,
    "name": "The Gig Economy",
    "description": "Debate the impact of gig economy jobs on workers and society",
    "category": "Business",
    "icon": "📲"
  },
  {
    "id": 31,
    "name": "Water Conservation",
    "description": "Discuss global strategies for water conservation and management",
    "category": "Environment",
    "icon": "💧"
  },
  {
    "id": 32,
    "name": "Public Education Funding",
    "description": "Debate the allocation of resources and funding for public education",
    "category": "Education",
    "icon": "🏫"
  },
  {
    "id": 33,
    "name": "Defunding the Police",
    "description": "Debate the consequences of reducing police funding and reallocating resources",
    "category": "Law",
    "icon": "🚓"
  },
  {
    "id": 34,
    "name": "Public vs. Private Healthcare",
    "description": "Discuss the advantages and disadvantages of public versus private healthcare systems",
    "category": "Healthcare",
    "icon": "🏥"
  },
  {
    "id": 35,
    "name": "Genetic Engineering",
    "description": "Discuss the ethical implications and potential of genetic modification in humans",
    "category": "Science",
    "icon": "🧬"
  },
  {
    "id": 36,
    "name": "Space Colonization",
    "description": "Debate the feasibility and morality of colonizing other planets",
    "category": "Universe",
    "icon": "🌌"
  },
  {
    "id": 37,
    "name": "Gun Control",
    "description": "Discuss the effectiveness of stricter gun control laws in preventing violence",
    "category": "Politics",
    "icon": "🔫"
  },
  {
    "id": 38,
    "name": "Social Welfare Programs",
    "description": "Debate the role and effectiveness of government welfare programs",
    "category": "Economy",
    "icon": "💵"
  },
  {
    "id": 39,
    "name": "Plastic Packaging",
    "description": "Discuss the environmental impact of plastic packaging and alternatives",
    "category": "Environment",
    "icon": "📦"
  },
  {
    "id": 40,
    "name": "Blockchain Technology",
    "description": "Debate the potential benefits and challenges of blockchain technology in various industries",
    "category": "Technology",
    "icon": "💻"
  },
  {
    "id": 41,
    "name": "Artificial Intelligence in Healthcare",
    "description": "Discuss the pros and cons of using AI in the healthcare industry",
    "category": "Healthcare",
    "icon": "🤖"
  },
  {
    "id": 42,
    "name": "Renewable Energy",
    "description": "Debate the transition to renewable energy sources to combat climate change",
    "category": "Environment",
    "icon": "🌞"
  },
  {
    "id": 43,
    "name": "Veganism vs. Carnivorism",
    "description": "Discuss the environmental and health impacts of vegan vs. carnivorous diets",
    "category": "Health",
    "icon": "🥗"
  },
  {
    "id": 44,
    "name": "Universal Basic Income",
    "description": "Debate the implementation of universal basic income to reduce poverty and inequality",
    "category": "Economy",
    "icon": "💳"
  },
  {
    "id": 45,
    "name": "National Security vs. Personal Freedom",
    "description": "Debate the balance between national security and personal freedoms in a modern society",
    "category": "Law",
    "icon": "🛡️"
  },
  {
    "id": 46,
    "name": "Religion",
    "description": "Debate the role of religion in modern society and its influence on politics and culture",
    "category": "Religion",
    "icon": "⛪"
  }
];

const durations = [
  { 
    id: 1, 
    minutes: 20, 
    seconds: 1200, // 600 seconds (10 minutes) per participant
    label: '20 minutes', 
    description: 'Quick practice session',
    getTurnOptions: () => {
      // Each participant gets 10 minutes (600 seconds)
      return [
        { id: 2, seconds: 120, label: '2 minutes', turns: '5 turns each' },   // 120s × 5 = 600s
      ];
    }
  },
  { 
    id: 2, 
    minutes: 30, 
    seconds: 1800, // 900 seconds (15 minutes) per participant
    label: '30 minutes', 
    description: 'Standard debate length',
    getTurnOptions: () => {
      // Each participant gets 15 minutes (900 seconds)
      return [
        { id: 2, seconds: 180, label: '3 minutes', turns: '5 turns each' },   // 180s × 5 = 900s
        { id: 3, seconds: 300, label: '5 minutes', turns: '3 turns each' },   // 300s × 3 = 900s
      ];
    }
  },
  { 
    id: 3, 
    minutes: 60, 
    seconds: 3600, // 1800 seconds (30 minutes) per participant
    label: '60 minutes', 
    description: 'Extended discussion',
    getTurnOptions: () => {
      // Each participant gets 30 minutes (1800 seconds)
      return [
        { id: 2, seconds: 120, label: '2 minutes', turns: '15 turns each' },   // 120s × 15 = 1800s
        { id: 3, seconds: 180, label: '3 minutes', turns: '10 turns each' },   // 180s × 10 = 1800s
        { id: 4, seconds: 300, label: '5 minutes', turns: '6 turns each' },    // 300s × 6 = 1800s
        { id: 5, seconds: 360, label: '6 minutes', turns: '5 turns each' },    // 360s × 5 = 1800s
      ];
    }
  }
];

const DebateSetup = () => {
  const navigate = useNavigate();
  const [debateTitle, setDebateTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedTurnDuration, setSelectedTurnDuration] = useState(null);
  const [aiStance, setAiStance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const filteredTopics = query === ''
    ? topics
    : topics.filter((topic) => {
        const searchQuery = query.toLowerCase();
        const matchName = topic.name.toLowerCase().includes(searchQuery);
        const matchDescription = topic.description.toLowerCase().includes(searchQuery);
        const matchCategory = topic.category 
          ? topic.category.toLowerCase().includes(searchQuery)
          : false;
        
        return matchName || matchDescription || matchCategory;
      });

  const handleStart = async () => {
    if (!debateTitle || !selectedTopic || !selectedDuration || !selectedTurnDuration || !aiStance) {
      toast.error('Please fill in all fields before starting');
      return;
    }

    // Store debate setup data in localStorage
    const debateSetupData = {
      name: debateTitle,
      topic: selectedTopic.name,
      totalDuration: selectedDuration.seconds,
      turnDuration: selectedTurnDuration.seconds,
      aiStance
    };
    
    localStorage.setItem('debateSetupData', JSON.stringify(debateSetupData));
    
    // Navigate to practice page
    navigate('/practice');
  };

  const TopicSelection = () => (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <span className="p-2 bg-primary-500/10 rounded-lg mr-3">
          <AcademicCapIcon className="w-6 h-6 text-primary-400" />
        </span>
        Choose Topic
      </h2>
      <Combobox value={selectedTopic} onChange={setSelectedTopic}>
        <div className="relative">
          <div className="relative w-full">
            <Combobox.Input
              className="w-full px-4 py-3 rounded-xl bg-gray-800/30 border border-gray-700/50 text-white 
                       placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                       transition-all duration-300"
              displayValue={(topic) => topic?.name || ''}
              onChange={(event) => {
                setQuery(event.target.value);
                if (event.target.value !== selectedTopic?.name) {
                  setSelectedTopic(null);
                }
              }}
              placeholder="Search for a topic..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options 
              className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-gray-800 
                         border border-gray-700/50 py-2 shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
            >
              {filteredTopics.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-400">
                  No topics found.
                </div>
              ) : (
                filteredTopics.map((topic) => (
                  <Combobox.Option
                    key={topic.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                        active ? 'bg-primary-500/30 text-white' : 'text-gray-400'
                      }`
                    }
                    value={topic}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{topic.icon}</span>
                          <div>
                            <span className={`block truncate ${selected ? 'font-medium text-white' : ''}`}>
                              {topic.name}
                            </span>
                            <span className={`block truncate text-sm ${
                              active ? 'text-gray-200' : 'text-gray-500'
                            }`}>
                              {topic.category} • {topic.description}
                            </span>
                          </div>
                        </div>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-primary-400'
                          }`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {selectedTopic && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20"
        >
          <div className="flex items-start">
            <span className="text-2xl mr-3">{selectedTopic.icon}</span>
            <div>
              <h3 className="text-white font-medium mb-1">{selectedTopic.name}</h3>
              <p className="text-sm text-gray-400">{selectedTopic.description}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300">
                {selectedTopic.category}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderTurnDurationSection = () => {
    if (!selectedDuration) return null;

    const turnOptions = selectedDuration.getTurnOptions();

    return (
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <span className="p-2 bg-primary-500/10 rounded-lg mr-3">
            <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-primary-400" />
          </span>
          Turn Duration
        </h2>
        <div className="flex flex-wrap gap-4">
          {turnOptions.map((duration) => (
            <motion.button
              key={duration.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTurnDuration(duration)}
              className={`px-8 py-4 rounded-xl transition-all duration-300 relative group overflow-hidden
                ${
                  selectedTurnDuration?.id === duration.id
                    ? 'bg-primary-500/20 border-primary-500/50 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-gray-800/30 border-gray-700/50 text-gray-400 hover:text-white'
                } border`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-lg font-medium">{duration.label}</div>
                <div className="text-sm text-gray-400">{duration.turns}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setSelectedTurnDuration(null);
  }, [selectedDuration]);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-secondary-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-gray-900 to-gray-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white flex items-center group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </motion.button>
          <SparklesIcon className="w-6 h-6 text-primary-400" />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700/50 p-8 relative overflow-hidden"
        >
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-transparent" />

          <div className="relative">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-2">
              Setup Your Debate
            </h1>
            <p className="text-gray-400 mb-12">Customize your practice session to match your preferences</p>

            {/* Debate Title Input */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="p-2 bg-primary-500/10 rounded-lg mr-3">
                  <PencilSquareIcon className="w-6 h-6 text-primary-400" />
                </span>
                Debate Title
              </h2>
              <input
                type="text"
                value={debateTitle}
                onChange={(e) => setDebateTitle(e.target.value)}
                placeholder="Enter a title for your debate"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/30 border border-gray-700/50 text-white 
                         placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50
                         transition-all duration-300"
              />
            </div>

            {/* Topic Selection */}
            <TopicSelection />

            {/* Total Duration Selection */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="p-2 bg-secondary-500/10 rounded-lg mr-3">
                  <ClockIcon className="w-6 h-6 text-secondary-400" />
                </span>
                Total Duration
              </h2>
              <div className="flex flex-wrap gap-4">
                {durations.map((duration) => (
                  <motion.button
                    key={duration.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDuration(duration)}
                    className={`px-8 py-4 rounded-xl transition-all duration-300 relative group overflow-hidden
                      ${
                        selectedDuration?.id === duration.id
                          ? 'bg-secondary-500/20 border-secondary-500/50 text-white shadow-lg shadow-secondary-500/20'
                          : 'bg-gray-800/30 border-gray-700/50 text-gray-400 hover:text-white'
                      } border`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="text-lg font-medium">{duration.label}</div>
                      <div className="text-sm text-gray-400">{duration.description}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Turn Duration Selection */}
            {renderTurnDurationSection()}

            {/* AI Stance Input */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="p-2 bg-secondary-500/10 rounded-lg mr-3">
                  <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-secondary-400" />
                </span>
                AI Stance
              </h2>
              <textarea
                value={aiStance}
                onChange={(e) => setAiStance(e.target.value)}
                placeholder="Describe the position that AI should take in this debate..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/30 border border-gray-700/50 text-white 
                         placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/50
                         transition-all duration-300 resize-none"
              />
            </div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              disabled={!debateTitle || !selectedTopic || !selectedDuration || !selectedTurnDuration || !aiStance || isLoading}
              className={`w-full py-5 rounded-xl text-lg font-medium transition-all duration-300 relative group overflow-hidden
                ${
                  !debateTitle || !selectedTopic || !selectedDuration || !selectedTurnDuration || !aiStance
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-xl shadow-primary-500/20'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent 
                            opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10">
                {isLoading ? 'Setting up your debate...' : 'Start Debate'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DebateSetup; 