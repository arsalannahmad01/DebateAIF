import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

const actions = [
  {
    title: 'Start Practice',
    description: 'Begin a new debate practice session',
    icon: AcademicCapIcon,
    href: '/practice/setup',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Trending Topics',
    description: 'Explore the most debated topics of the week',
    icon: ArrowTrendingUpIcon,
    href: '/topics/trending',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Progress Report',
    description: 'Track your improvement over time',
    icon: ChartBarIcon,
    href: '/analytics',
    color: 'from-green-500 to-emerald-500'
  }
];

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <Link
          key={action.title}
          to={action.href}
          className="group block"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow p-6"
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-4`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600">
              {action.description}
            </p>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions; 