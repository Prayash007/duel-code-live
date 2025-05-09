
import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedChallenges from '../components/home/FeaturedChallenges';
import Leaderboard from '../components/home/Leaderboard';
import CTA from '../components/home/CTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedChallenges />
      <HowItWorks />
      <Leaderboard />
      <CTA />
    </Layout>
  );
};

export default Index;
