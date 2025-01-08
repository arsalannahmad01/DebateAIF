import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  UserCircleIcon, 
  DocumentTextIcon,
  ServerIcon 
} from '@heroicons/react/24/outline';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: UserCircleIcon,
      title: "Information We Collect",
      content: [
        "Name and email address when you create an account",
        "Profile information you choose to share",
        "Authentication data when using Google Sign-In",
        "Profile pictures and customization preferences",
        "Debate history and performance metrics",
        "Practice session recordings and transcripts",
        "Usage patterns and interaction data"
      ]
    },
    {
      icon: DocumentTextIcon,
      title: "How We Use Your Data",
      content: [
        "Provide and improve our debate practice services",
        "Personalize your learning experience",
        "Analyze and enhance AI debate responses",
        "Send important service updates and notifications",
        "Track and improve platform performance",
        "Research and development of new features"
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Data Protection",
      content: [
        "End-to-end encryption for sensitive data",
        "Regular security audits and updates",
        "Secure data storage with regular backups",
        "Strict access controls and authentication",
        "Industry-standard security protocols",
        "Regular vulnerability assessments"
      ]
    },
    {
      icon: ServerIcon,
      title: "Your Rights",
      content: [
        "Access and download your personal data",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Control your privacy preferences",
        "Data portability options"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Learn how we protect your privacy and handle your data at DebateAI."
        keywords={[
          'privacy policy',
          'data protection',
          'user privacy',
          'data handling',
          'security measures'
        ]}
      />
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
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Policy</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <p className="mt-4 text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
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

                <div className="relative bg-gray-800/50 backdrop-blur-xl h-full p-8 rounded-xl border border-gray-700/50 
                              hover:border-primary-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2 bg-primary-500/10 rounded-lg">
                      <section.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400">
                        <span className="text-primary-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Questions About Our Privacy Policy?</h2>
            <p className="text-gray-400 mb-6">
              If you have any questions or concerns about our privacy practices, please contact us at{' '}
              <a 
                href="mailto:call.arsalan11@gmail.com"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                call.arsalan11@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 