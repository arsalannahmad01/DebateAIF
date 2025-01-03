import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
              <p>
                At DebateAI, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our debate practice platform. 
                Please read this privacy policy carefully. By using DebateAI, you consent to the data 
                practices described in this statement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address when you create an account</li>
                  <li>Profile information you choose to share</li>
                  <li>Authentication data when using Google Sign-In</li>
                  <li>Profile pictures and customization preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800">Debate Activity Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your debate history and performance metrics</li>
                  <li>Practice session recordings and transcripts</li>
                  <li>Feedback and ratings you provide</li>
                  <li>Topic preferences and debate style choices</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800">Technical Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device and browser information</li>
                  {/* <li>IP address and location data</li> */}
                  <li>Usage patterns and interaction data</li>
                  <li>Performance and error reporting data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              <p>
                We use the collected information for various purposes focused on providing and 
                improving our services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Delivery:</strong> To operate, maintain, and provide you with all 
                  the features of our debate practice platform.
                </li>
                <li>
                  <strong>Personalization:</strong> To understand your preferences and optimize your 
                  learning experience.
                </li>
                <li>
                  <strong>Communication:</strong> To respond to your inquiries and send important 
                  service updates.
                </li>
                <li>
                  <strong>Analytics:</strong> To analyze usage patterns and improve our AI debate system.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Data Protection</h2>
              <p>
                We implement robust security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for all sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Secure data storage with regular backups</li>
                <li>Strict access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Your Rights and Choices</h2>
              <p>
                You have several rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and download your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Control cookie preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please 
                contact us at{' '}
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

export default PrivacyPolicy; 