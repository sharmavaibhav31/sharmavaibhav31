import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
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
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen relative" style={{ backgroundColor: isDark ? '#07090f' : '#F8FAFC', color: isDark ? '#fff' : '#0F172A' }}>

            {isDark && (
                <>
                    {/* 1 — solid very-dark base (always behind everything) */}
                    <div
                        className="fixed inset-0 pointer-events-none"
                        style={{ zIndex: 0, backgroundColor: '#07090f' }}
                        aria-hidden="true"
                    />

                    {/* 2 — LetterGlitch at 18% opacity: visible but never overwhelming */}
                    <div
                        className="fixed inset-0 pointer-events-none"
                        style={{ zIndex: 1, opacity: 0.18 }}
                        aria-hidden="true"
                    >
                        <LetterGlitch
                            glitchSpeed={50}
                            centerVignette={false}
                            outerVignette={false}
                            smooth={true}
                        />
                    </div>
                </>
            )}

            {/* All page content sits above both layers */}
            <div className="relative" style={{ zIndex: 10 }}>

                {/* Fixed Bottom-Right Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    id="fixed-theme-toggle"
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="fixed bottom-6 right-6 z-[60] p-3.5 rounded-full bg-canvas dark:bg-[#07090f] border border-border dark:border-white/20 text-primary dark:text-white shadow-card hover:scale-110 hover:shadow-card-hover hover:border-border-hover dark:hover:border-[#61dca3] transition-all duration-300"
                >
                    {isDark ? <Sun size={20} className="text-[#61dca3]" /> : <Moon size={20} className="text-primary" />}
                </button>

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
