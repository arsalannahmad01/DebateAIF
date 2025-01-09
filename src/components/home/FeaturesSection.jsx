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
    description: "Engage in real-time debates with our advanced AI system that adapts to your skill level.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: "Real-time Feedback",
    description: "Get instant analysis of your arguments and rhetorical techniques.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: AcademicCapIcon,
    title: "Structured Learning",
    description: "Follow a proven path to improve your debate skills systematically.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: ChartBarIcon,
    title: "Track Progress",
    description: "Monitor your improvement with detailed performance metrics.",
    gradient: "from-orange-500 to-amber-500"
  }
];

const FeaturesSection = () => {
  return (
    <section 
      id="features" 
      className="py-20 relative overflow-hidden bg-gray-900 scroll-mt-16"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-primary-900/95" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full mix-blend-overlay animate-blob" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-secondary-500/10 rounded-full mix-blend-overlay animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-overlay animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary-400 font-semibold tracking-wider uppercase">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">DebateGPT</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of debate practice with our cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r rounded-xl p-[2px] cursor-pointer transform transition-all duration-300 group-hover:scale-[1.02]"
                   style={{ background: `linear-gradient(45deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})` }}>
                <div className="h-full w-full bg-gray-900 rounded-[10px]" />
              </div>

              <div className="relative bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-gray-700/50 
                            hover:border-primary-500/50 transition-all duration-300 h-full">
                <div className={`w-14 h-14 mb-6 rounded-lg bg-gradient-to-r ${feature.gradient} 
                                p-[1px] group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent 
                             group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 
                             group-hover:to-secondary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 
                              rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/50 to-secondary-500/50 
                              rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 