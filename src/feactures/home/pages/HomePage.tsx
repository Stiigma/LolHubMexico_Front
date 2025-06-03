import React from 'react';
import Header from '../components/HeaderComponent';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#0c1445] via-[#131a66] to-[#192276] text-white min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
