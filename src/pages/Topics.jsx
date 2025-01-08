import SEO from '../components/common/SEO';

const Topics = () => {
  return (
    <>
      <SEO 
        title="Debate Topics"
        description="Explore a wide range of debate topics and choose your next practice session."
        keywords={[
          'debate topics',
          'discussion themes',
          'practice subjects',
          'debate categories',
          'argument topics'
        ]}
      />
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Topics</h1>
          <p className="mt-4 text-gray-600">Topics section coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default Topics; 