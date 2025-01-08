import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Innovation",
      description: "Leveraging cutting-edge artificial intelligence to provide dynamic and adaptive debate practice experiences."
    },
    {
      icon: UserGroupIcon,
      title: "Inclusive Learning",
      description: "Making debate practice accessible to everyone, from students to professionals, anywhere in the world."
    },
    {
      icon: LightBulbIcon,
      title: "Skill Development",
      description: "Focused on developing critical thinking, argumentation, and persuasion skills through structured practice."
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: "Real-time Feedback",
      description: "Providing instant, detailed feedback to help users improve their debating techniques continuously."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">DebateAI</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming debate practice through AI innovation and making quality debate training accessible to everyone.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r rounded-xl p-[2px]"
                   style={{ background: `linear-gradient(45deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})` }}>
                <div className="h-full w-full bg-gray-900 rounded-[10px]" />
              </div>

              <div className="relative bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-gray-700/50 
                            hover:border-primary-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-primary-500/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
            Our Mission
          </h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300">
              At DebateAI, we believe that the art of debate is more crucial than ever in today's world. 
              Our mission is to democratize access to high-quality debate practice, enabling individuals 
              to develop their critical thinking and argumentation skills regardless of their location or resources.
            </p>
            <p className="text-gray-300">
              Through our AI-powered platform, we're creating an environment where users can practice 
              debate techniques, receive instant feedback, and track their progress over time. We're 
              committed to fostering a community of skilled debaters who can engage in constructive 
              dialogue and contribute meaningfully to public discourse.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 