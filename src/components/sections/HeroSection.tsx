import { useIntersectionObserver } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
import { useTheme } from '../../context/ThemeContext';
import { ArchitectureDiagram } from './ArchitectureSection';

export const HeroSection: React.FC = () => {
    useIntersectionObserver();
    const { isDark } = useTheme();

    // Hero text floats very subtly upward — understated depth
    const textOffset = useParallax(0.08);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center border-b border-border dark:border-white/10 overflow-hidden"
            aria-label="Hero"
        >
            {/* Removed noisy background grid based on feedback */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true"></div>

            {/* Content — gentle upward drift on scroll */}
            <div
                className="relative z-20 w-full max-w-screen-2xl mx-auto px-8 lg:px-12 py-32 lg:py-0 flex flex-col lg:flex-row items-center justify-between pointer-events-none"
                style={{
                    transform: `translateY(${-textOffset}px)`,
                    willChange: 'transform',
                }}
            >
                {/* Left Side: Hero Text */}
                <div className="max-w-3xl lg:w-1/2 relative pointer-events-auto">
                    {/* Status label */}
                    <div className="reveal flex items-center gap-3 mb-8">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent dark:bg-[#61dca3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent dark:bg-[#61dca3]"></span>
                        </span>
                        <span className="text-sm font-semibold tracking-wide text-secondary dark:text-white/90 uppercase">
                            Available for Backend Roles
                        </span>
                    </div>

                    {/* Name */}
                    <h1
                        className="reveal font-display font-extrabold text-primary dark:text-white leading-none tracking-tight mb-6"
                        style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', letterSpacing: '-0.04em' }}
                    >
                        VAIBHAV<br />SHARMA
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="reveal text-secondary dark:text-white/75 font-bold mb-6 tracking-widest uppercase"
                        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
                    >
                        Systems / Backend Engineer
                    </p>

                    {/* Positioning statement */}
                    <p
                        className="reveal text-secondary dark:text-white/90 leading-relaxed mb-10 max-w-xl"
                        style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)' }}
                    >
                        Architecting high-performance backend systems focused on scale, resilience, and measurable business impact.
                    </p>

                    {/* CTAs */}
                    <div className="reveal flex flex-wrap gap-5 mt-4">
                        <a
                            href="#work"
                            id="hero-cta-work"
                            className="inline-flex items-center px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            View Engineering Work
                        </a>
                        <a
                            href="/resume.pdf"
                            id="hero-cta-resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 border-2 border-primary/20 dark:border-white/30 text-primary dark:text-white text-base font-bold hover:border-primary dark:hover:border-white hover:bg-primary/5 dark:hover:bg-white/5 transition-all duration-300"
                        >
                            Review Architecture Resume
                        </a>
                    </div>
                </div>

                {/* Right Side: Architecture Diagram (Only visible in Light Mode) */}
                {!isDark && (
                    <div className="hidden lg:flex w-full lg:w-1/2 relative min-h-[600px] pointer-events-none items-center justify-center">
                        <ArchitectureDiagram />
                    </div>
                )}
            </div>
        </section>
    );
};
