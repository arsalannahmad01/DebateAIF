import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600">
            Transforming debate practice through AI innovation
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p>
              At DebateAI, we believe that the art of debate is more crucial than ever in today's world. 
              Our mission is to make debate practice accessible to everyone, regardless of their location, 
              schedule, or experience level. We're committed to helping individuals develop critical thinking 
              skills, articulate their thoughts clearly, and engage in constructive dialogue.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Sets Us Apart</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Personalized Learning:</strong> Our AI adapts to your skill level, providing 
                increasingly challenging debates as you improve.
              </li>
              <li>
                <strong>Immediate Feedback:</strong> Receive detailed analysis of your arguments, 
                logical reasoning, and persuasion techniques after each debate.
              </li>
              <li>
                <strong>Flexible Practice:</strong> Practice any time, anywhere, with debates 
                spanning various topics and formats.
              </li>
              <li>
                <strong>Safe Learning Environment:</strong> Experiment with different debate styles 
                and arguments without the pressure of public speaking.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Looking Forward</h2>
            <p>
              As we continue to grow, we're excited about the possibilities ahead. We're constantly 
              working on improving our AI's capabilities, expanding our topic database, and developing 
              new features to enhance the learning experience. Our goal is to create a global community 
              of skilled debaters who can engage in meaningful discussions and contribute to public 
              discourse in a constructive way.
            </p>

            <p>
              Whether you're a student preparing for debate competitions, a professional looking to 
              improve your argumentation skills, or simply someone interested in engaging in thoughtful 
              discussions, DebateAI is here to help you grow. Join us in our mission to make the art 
              of debate accessible to everyone.
            </p>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <blockquote className="italic text-gray-700">
                "The true art of debate lies not in winning arguments, but in the pursuit of truth 
                through reasoned discussion. That's the principle that guides everything we do at DebateAI."
              </blockquote>
              <p className="mt-2 text-sm text-gray-600">
                - The DebateAI Team
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 