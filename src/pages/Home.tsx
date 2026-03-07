import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { CapabilitiesSection } from '../components/sections/CapabilitiesSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { AboutSection } from '../components/sections/AboutSection';
import { CertificationsSection } from '../components/sections/CertificationsSection';
import { useIntersectionObserver } from '../hooks/useScrollReveal';
import { ShootingStars } from '../components/ui/ShootingStars';
import { useTheme } from '../context/ThemeContext';
import { ArchitectureSection } from '../components/sections/ArchitectureSection';

const PortfolioContent: React.FC = () => {
    useIntersectionObserver();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen" style={{ backgroundColor: isDark ? '#000000' : '#F8FAFC', color: isDark ? '#fff' : '#0F172A' }}>

            {/* Shooting stars — dark mode only, behind all content */}
            {isDark && <ShootingStars />}

            <Header />
            <main id="main-content">
                <HeroSection />
                <ArchitectureSection />
                <ProjectsSection />
                <ExperienceSection />
                <CapabilitiesSection />
                <CertificationsSection />
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
};

export const Home: React.FC = () => (
    <ThemeProvider>
        <PortfolioContent />
    </ThemeProvider>
);

