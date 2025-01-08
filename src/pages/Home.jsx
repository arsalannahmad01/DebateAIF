import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CTASection from '../components/home/CTASection';
import SEO from '../components/common/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Practice Debates with AI"
        description="Master the art of debate with AI-powered practice sessions. Get real-time feedback, track your progress, and improve your debating skills."
        keywords={[
          'debate practice',
          'AI debate',
          'debate skills',
          'public speaking',
          'argumentation',
          'debate training'
        ]}
      />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </>
  );
};

export default Home; 