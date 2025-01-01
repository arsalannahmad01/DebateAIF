import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Debate Team Captain",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "DebateAI has transformed how our team prepares for competitions. The AI feedback is incredibly insightful."
  },
  {
    name: "Michael Rodriguez",
    role: "Public Speaking Coach",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "The personalized feedback and adaptive learning system have helped my students improve faster than ever."
  },
  {
    name: "Emily Thompson",
    role: "Law Student",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "Practicing with DebateAI has significantly improved my argumentation skills for moot court competitions."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">What Our Users Say</span>
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied users who have improved their debate skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 