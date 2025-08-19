import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import FeaturesSection from '../../components/home/FeaturesSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import StatsSection from '../../components/home/StatsSection';
import PricingSection from '../../components/home/PricingSection';
import AboutSection from '../../components/home/AboutSection';
import CTASection from '../../components/home/CTASection';
import InteractiveDemo from '../../components/home/InteractiveDemo';
import FamilyAcademySection from '../../components/home/FamilyAcademySection';
import KidsAcademySection from '../../components/home/KidsAcademySection';
import ContactSection from '../../components/home/ContactSection';


const Home = () => {
    return (
        <div className="overflow-hidden">
            <HeroSection />
            <FeaturesSection />
            <FamilyAcademySection />
            <KidsAcademySection />
            <InteractiveDemo />
            <PricingSection />
            {/* <StatsSection /> */}   
            <CTASection /> 
            <AboutSection />
            <TestimonialsSection />
            <ContactSection />
          
        </div>
    );
};

export default Home;