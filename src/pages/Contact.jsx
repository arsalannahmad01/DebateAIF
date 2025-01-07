import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  UserIcon, 
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Logo from '../components/common/Logo';
import { contactService } from '../services/contactService';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First try API
      await contactService.sendMessage(formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error('API failed, falling back to mailto:', error);
      // Fallback to mailto if API fails
      try {
        const mailtoLink = `mailto:call.arsalan11@gmail.com?subject=${formData.subject} - Contact from ${formData.name}&body=${formData.message}`;
        window.location.href = mailtoLink;
        toast.success('Email client opened successfully!');
      } catch (mailtoError) {
        toast.error('Failed to send message. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.subject.trim() !== '' && 
           formData.message.trim() !== '';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Header with Logo */}
      <header className="w-full py-6 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Logo />
        </div>
      </header>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full 
                     bg-gradient-to-b from-primary-500/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full 
                     bg-gradient-to-t from-secondary-500/30 to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Contact Card */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 
                       overflow-hidden relative">
            {/* Card gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-transparent" />

            {/* Card Content */}
            <div className="relative p-8 sm:p-10">
              {/* Header */}
              <div className="text-center mb-10">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-3"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r 
                               from-primary-400 via-primary-200 to-secondary-400">
                    Get in Touch
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-lg"
                >
                  We'd love to hear from you
                </motion.p>
              </div>

              {/* Contact Form */}
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Name <span className="text-primary-400">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-4 py-3.5 rounded-xl bg-gray-800/30 border border-gray-700/50 
                               text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 
                               focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Email <span className="text-primary-400">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-4 py-3.5 rounded-xl bg-gray-800/30 border border-gray-700/50 
                               text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 
                               focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Subject <span className="text-primary-400">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg 
                        className="h-5 w-5 text-gray-500 group-focus-within:text-primary-400 transition-colors"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="4" y1="9" x2="20" y2="9" />
                        <line x1="4" y1="15" x2="20" y2="15" />
                        <line x1="10" y1="3" x2="8" y2="21" />
                        <line x1="16" y1="3" x2="14" y2="21" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-4 py-3.5 rounded-xl bg-gray-800/30 border border-gray-700/50 
                               text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 
                               focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Message subject"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Message <span className="text-primary-400">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="block w-full pl-10 pr-4 py-3.5 rounded-xl bg-gray-800/30 border border-gray-700/50 
                               text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 
                               focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Your message"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
                  whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                  className={`relative w-full py-4 rounded-xl text-white font-medium text-lg
                             ${isFormValid() 
                               ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600' 
                               : 'bg-gray-600 cursor-not-allowed'}
                             focus:outline-none focus:ring-2 focus:ring-primary-500/50 
                             shadow-lg shadow-primary-500/25 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             overflow-hidden group transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-white/20 opacity-0 
                                 ${isFormValid() ? 'group-hover:opacity-100' : ''} 
                                 transition-opacity`} 
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? 'Sending...' : 'Send Message'}
                    <PaperAirplaneIcon className={`w-5 h-5 ${
                      isFormValid() ? 'group-hover:translate-x-1' : ''
                    } transition-transform`} />
                  </span>
                </motion.button>
              </motion.form>

              {/* Alternative Contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center text-sm text-gray-400"
              >
                Or email us directly at{' '}
                <a 
                  href="mailto:call.arsalan11@gmail.com"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  call.arsalan11@gmail.com
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Contact; 