import SEO from '../components/common/SEO';

const Analytics = () => {
  return (
    <>
      <SEO 
        title="Analytics"
        description="View detailed analytics and insights about your debate performance and progress."
        keywords={[
          'debate analytics',
          'performance metrics',
          'progress tracking',
          'debate statistics',
          'improvement insights'
        ]}
      />
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="mt-4 text-gray-600">Analytics section coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default Analytics; 