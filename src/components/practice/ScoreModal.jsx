import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { debateService } from '../../services/debateService';
import toast from 'react-hot-toast';

const ScoreCard = ({ title, score, maxScore = 10 }) => (
  <div className="bg-gray-800/50 rounded-lg p-4">
    <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold text-white">{score}</span>
      <span className="text-gray-500 text-sm">/ {maxScore}</span>
    </div>
  </div>
);

const FeedbackList = ({ title, items, icon: Icon }) => (
  <div className="space-y-2">
    <h3 className="text-gray-300 font-medium flex items-center gap-2">
      <Icon className="w-5 h-5" />
      {title}
    </h3>
    <ul className="space-y-1 text-sm text-gray-400">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-gray-500">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ScoreModal = ({ isOpen, onClose, debateId, isLoading }) => {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScoresAndFeedback = async () => {
      if (!debateId || !isOpen) return;

      try {
        const scoresData = await debateService.getDebateScores(debateId);

        setScores(scoresData.data);
      } catch (error) {
        console.error('Failed to fetch debate results:', error);
        setError('Failed to load debate results');
      }
    };

    fetchScoresAndFeedback();
  }, [debateId, isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900 p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-medium text-white">
                    Debate Performance
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-8">{error}</div>
                ) : scores && (
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="text-center p-6 bg-gray-800/30 rounded-xl">
                      <h2 className="text-gray-400 mb-2">Overall Score</h2>
                      <div className="text-4xl font-bold text-primary-500">
                        {scores.score}
                        <span className="text-lg text-gray-500">/100</span>
                      </div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="grid grid-cols-3 gap-4">
                      <ScoreCard title="Logic" score={scores.feedback.logicScore} />
                      <ScoreCard title="Persuasion" score={scores.feedback.persuasionScore} />
                      <ScoreCard title="Structure" score={scores.feedback.structureScore} />
                    </div>

                    {/* Feedback */}
                    <div className="space-y-6 border-t border-gray-800 pt-6">
                      {scores.feedback.comments.length > 0 && (
                        <FeedbackList
                          title="Strengths"
                          items={scores.feedback.comments}
                          icon={(props) => (
                            <svg {...props} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        />
                      )}

                      {scores.feedback.improvements.length > 0 && (
                        <FeedbackList
                          title="Areas for Improvement"
                          items={scores.feedback.improvements}
                          icon={(props) => (
                            <svg {...props} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          )}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScoreModal; 