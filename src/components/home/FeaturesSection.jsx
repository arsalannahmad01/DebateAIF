import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  ChatBubbleBottomCenterTextIcon,
  AcademicCapIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: SparklesIcon,
    title: "AI-Powered Debates",
    description: "Engage in real-time debates with our advanced AI system that adapts to your skill level and debate style."
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: "Real-time Feedback",
    description: "Receive instant analysis of your arguments, logical fallacies, and rhetorical techniques."
  },
  {
    icon: AcademicCapIcon,
    title: "Personalized Learning",
    description: "Custom-tailored debate topics and difficulty levels based on your interests and progress."
  },
  {
    icon: ChartBarIcon,
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics and performance metrics."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            <span className="gradient-text">Revolutionary Features</span>
          </motion.h2>
          <p className="text-xl text-gray-600">
            Experience the future of debate training with cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-r from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 