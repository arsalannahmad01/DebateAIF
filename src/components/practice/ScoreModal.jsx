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
  const [isLoadingScores, setIsLoadingScores] = useState(true);

  useEffect(() => {
    const fetchScoresAndFeedback = async () => {
      if (!debateId || !isOpen) return;

      try {
        setIsLoadingScores(true);
        const scoresData = await debateService.getDebateScores(debateId);
        setScores(scoresData.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch debate results:', error);
        setError('Failed to load debate results');
      } finally {
        setIsLoadingScores(false);
      }
    };

    if (isOpen && debateId) {
      fetchScoresAndFeedback();
    }
  }, [debateId, isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
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
            <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-gray-900 p-6 shadow-xl transition-all">
              <div className="absolute right-4 top-4">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <Dialog.Title className="text-2xl font-bold text-white mb-6">
                Debate Results
              </Dialog.Title>

              {isLoadingScores ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce [animation-delay:-.3s]" />
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce [animation-delay:-.5s]" />
                  </div>
                  <p className="text-gray-400">Calculating your debate performance...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-400">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : scores ? (
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
              ) : null}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScoreModal; 