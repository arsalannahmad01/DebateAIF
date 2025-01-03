import { motion } from 'framer-motion';
import Button from '../common/Button';

const WelcomeCard = ({ user }) => {
  const lastPractice = '3 days ago'; // This should come from your backend

  return (
    <motion.div
      className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white p-8 shadow-xl"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-primary-100 mb-6">
          Turn Ideas Into Impact. Perfect Your Debates with AI.
        </p>
        {/* <Button
          variant="white"
          className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
        >
          Start a Debate
        </Button> */}
      </div>
    </motion.div>
  );
};

export default WelcomeCard; 