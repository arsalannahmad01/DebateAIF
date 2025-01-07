import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { SparklesIcon } from '@heroicons/react/24/outline';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-primary-900/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -top-6 -left-6 w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center"
              >
                <SparklesIcon className="w-6 h-6 text-primary-400" />
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                Ready to Become a Better Debater?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users who are already improving their debate skills with AI-powered practice sessions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  onClick={() => navigate('/practice/setup')}
                  className="text-lg px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                >
                  Start Free Practice
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/about')}
                  className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800"
                alt="Debate Practice"
                className="rounded-xl shadow-2xl shadow-primary-500/20"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-xl" />
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Fast', description: 'Instant AI responses' },
            { title: 'Smart', description: 'Adaptive feedback system' },
            { title: 'Effective', description: 'Proven learning method' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700/50 group-hover:border-primary-500/50 transition-all">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-2">
                  {stat.title}
                </div>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection; 