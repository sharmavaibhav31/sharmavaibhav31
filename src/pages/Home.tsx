import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { AboutSection } from '../components/sections/AboutSection';
import { useIntersectionObserver } from '../hooks/useScrollReveal';
import LetterGlitch from '../components/ui/LetterGlitch';
import { useTheme } from '../context/ThemeContext';

const PortfolioContent: React.FC = () => {
    useIntersectionObserver();
    const { isDark } = useTheme();

    return (
        <div className="min-h-screen bg-canvas dark:bg-transparent text-primary dark:text-white relative">
            {/* LetterGlitch — fixed full-screen background in dark mode */}
            {isDark && (
                <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
                    <LetterGlitch
                        glitchSpeed={50}
                        centerVignette={true}
                        outerVignette={false}
                        smooth={true}
                    />
                </div>
            )}

            {/* All page content sits above the canvas */}
            <div className="relative z-10">
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
        </div>
    );
};

export const Home: React.FC = () => (
    <ThemeProvider>
        <PortfolioContent />
    </ThemeProvider>
);
