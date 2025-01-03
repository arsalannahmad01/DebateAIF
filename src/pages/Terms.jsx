import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
              <p>
                Welcome to DebateAI. By accessing or using our platform, you agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">2. Platform Description</h2>
              <p>
                DebateAI is an AI-powered debate practice platform that provides:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Interactive debate sessions with AI opponents</li>
                <li>Real-time feedback and performance analysis</li>
                <li>Customizable practice scenarios</li>
                <li>Progress tracking and skill development tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">3. User Accounts</h2>
              <div className="space-y-4">
                <p>When creating an account, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly update any changes to your information</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">4. User Conduct</h2>
              <div className="space-y-4">
                <p>When using DebateAI, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Engage in respectful and constructive debate practices</li>
                  <li>Use the platform for its intended educational purpose</li>
                  <li>Respect intellectual property rights</li>
                  <li>Follow all applicable laws and regulations</li>
                </ul>

                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the platform for any unlawful purpose</li>
                  <li>Harass, abuse, or discriminate against others</li>
                  <li>Attempt to manipulate or exploit the AI system</li>
                  <li>Share inappropriate or harmful content</li>
                  <li>Interfere with the platform's operation</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">5. Intellectual Property</h2>
              <div className="space-y-4">
                <p>
                  All content and materials available on DebateAI, including but not limited to text, 
                  graphics, website name, code, images, and logos are the intellectual property of 
                  DebateAI. These materials are protected by copyright and trademark laws.
                </p>
                <p>
                  While using our platform, you retain ownership of your debate content but grant us 
                  a license to use it for service improvement and research purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">6. Limitation of Liability</h2>
              <p>
                DebateAI is provided "as is" without any warranty. We are not responsible for any 
                indirect, incidental, special, or consequential damages arising from your use of 
                the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or platform notification. Continued use of the platform 
                after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">8. Contact Information</h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at{' '}
                <a 
                  href="mailto:ghazi@edgescale.tech" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  ghazi@edgescale.tech
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms; 