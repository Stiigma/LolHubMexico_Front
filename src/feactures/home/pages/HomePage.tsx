import Header from '../../../shared/components/Header'; // o desde shared
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../../../shared/components/Footer';

const HomePage: React.FC = () => {
    return (
      <>
        <Header />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <Footer/>
      </>
    );
  };
  
  export default HomePage;
