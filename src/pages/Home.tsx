import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { AboutSection } from '../components/sections/AboutSection';
import { useIntersectionObserver } from '../hooks/useScrollReveal';

export const Home: React.FC = () => {
    // Wire scroll-reveal observer for all sections
    useIntersectionObserver();

    return (
        <div className="min-h-screen bg-canvas text-primary">
            <Header />
            <main id="main-content">
                <HeroSection />
                <ProjectsSection />
                <CapabilitiesSection />
                <ExperienceSection />
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
};
