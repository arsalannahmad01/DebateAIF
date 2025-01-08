import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  UserGroupIcon, 
  ScaleIcon,
  ExclamationTriangleIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import SEO from '../components/common/SEO';

const Terms = () => {
  const sections = [
    {
      icon: DocumentTextIcon,
      title: "Agreement to Terms",
      content: [
        "By accessing DebateAI, you agree to be bound by these Terms of Service",
        "You must be at least 13 years old to use our services",
        "You are responsible for maintaining the security of your account",
        "You agree to provide accurate and complete information"
      ]
    },
    {
      icon: UserGroupIcon,
      title: "User Responsibilities",
      content: [
        "Engage in respectful and constructive debates",
        "Do not share harmful or inappropriate content",
        "Maintain the confidentiality of your account",
        "Report any violations or suspicious activities"
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Platform Rules",
      content: [
        "No hate speech or discriminatory content",
        "No spamming or automated access",
        "No interference with platform security",
        "No unauthorized data collection"
      ]
    },
    {
      icon: ScaleIcon,
      title: "Intellectual Property",
      content: [
        "All platform content is owned by DebateAI",
        "Users retain ownership of their debate content",
        "Limited license granted for platform use",
        "Respect copyright and trademark rights"
      ]
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Limitations",
      content: [
        "Service provided 'as is' without warranty",
        "Not responsible for third-party content",
        "Right to modify or terminate service",
        "No liability for service interruptions"
      ]
    },
    {
      icon: DocumentDuplicateIcon,
      title: "Changes to Terms",
      content: [
        "Terms may be updated periodically",
        "Users will be notified of significant changes",
        "Continued use implies acceptance of changes",
        "Previous versions may be archived"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Terms of Service"
        description="Read our terms of service to understand the rules and guidelines for using DebateAI's platform."
        keywords={[
          'terms of service',
          'user agreement',
          'legal terms',
          'platform rules',
          'usage guidelines'
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
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Service</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Please read these terms carefully before using our platform.
              </p>
              <p className="mt-4 text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <h2 className="text-2xl font-semibold text-white mb-4">Questions About Our Terms?</h2>
            <p className="text-gray-400 mb-6">
              If you have any questions about these Terms of Service, please contact us at{' '}
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

export default Terms; 