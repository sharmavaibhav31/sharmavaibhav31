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
            {/* Clean engineering grid background (low opacity) */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-20 dark:opacity-10" aria-hidden="true">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400 dark:text-slate-600" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>
            </div>

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
                    <div className="reveal flex items-center gap-2 mb-6">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent dark:bg-[#61dca3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent dark:bg-[#61dca3]"></span>
                        </span>
                        <span className="text-xs font-semibold tracking-wide text-secondary dark:text-white/90 uppercase">
                            Available for Backend Roles
                        </span>
                    </div>

                    {/* Name */}
                    <h1
                        className="reveal font-display font-extrabold text-primary dark:text-white leading-none tracking-tight mb-4"
                        style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)', letterSpacing: '-0.04em' }}
                    >
                        VAIBHAV<br />SHARMA
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="reveal text-secondary dark:text-white/75 font-bold mb-4 tracking-widest uppercase"
                        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
                    >
                        Systems / Backend Engineer
                    </p>

                    {/* Positioning statement */}
                    <p
                        className="reveal text-secondary dark:text-white/90 leading-relaxed mb-8 max-w-xl"
                        style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
                    >
                        Backend engineer building scalable APIs, ML pipelines, and distributed systems.
                    </p>

                    {/* CTAs */}
                    <div className="reveal flex flex-wrap gap-4 mt-2">
                        <a
                            href="#work"
                            id="hero-cta-work"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary dark:bg-white text-white dark:text-primary text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                        >
                            View Projects
                        </a>
                        <a
                            href="/resume.pdf"
                            id="hero-cta-resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary/20 dark:border-white/30 text-primary dark:text-white text-sm font-bold hover:border-primary dark:hover:border-white hover:bg-primary/5 dark:hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>

                {/* Right Side: Architecture Diagram */}
                <div className="hidden lg:flex w-full lg:w-1/2 relative min-h-[600px] pointer-events-none items-center justify-center">
                    <ArchitectureDiagram />
                </div>
            </div>
        </section>
    );
};
