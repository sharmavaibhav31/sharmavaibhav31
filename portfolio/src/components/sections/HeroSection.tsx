import { useIntersectionObserver } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
import { ArchitectureDiagram } from './ArchitectureSection';

export const HeroSection: React.FC = () => {
    useIntersectionObserver();

    // Hero text floats very subtly upward — understated depth
    const textOffset = useParallax(0.08);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center border-b border-border/50 dark:border-slate-800/50 bg-slate-50 dark:bg-[#0B1120] overflow-hidden transition-colors duration-300"
            aria-label="Hero"
        >
            {/* Subtle engineering blueprint grid overlay */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-[0.05] dark:opacity-[0.03]" aria-hidden="true">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-900 dark:text-white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>
            </div>

            {/* Content — fluid padding and flexible stacked/row layout */}
            <div
                className="relative z-20 w-full max-w-[1920px] mx-auto px-6 md:px-12 xl:px-16 pt-32 pb-24 lg:py-0 min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between pointer-events-none gap-10 lg:gap-8"
                style={{
                    transform: `translateY(${-textOffset}px)`,
                    willChange: 'transform',
                }}
            >
                {/* Left Side: Hero Text */}
                <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col items-start text-left relative pointer-events-auto shrink-0 z-20">
                    {/* Status label */}
                    <div className="reveal flex items-center gap-2 mb-6">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent dark:bg-[#61dca3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent dark:bg-[#61dca3]"></span>
                        </span>
                        <span className="text-xs font-semibold tracking-wide text-secondary dark:text-white/90">
                            $ system.status
                            <br />
                            ACTIVE — AVAILABLE FOR BACKEND ROLES
                        </span>
                    </div>

                    {/* Name */}
                    <h1
                        className="reveal font-display font-extrabold text-primary dark:text-white leading-none tracking-tight mb-6"
                        style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', letterSpacing: '-0.04em' }}
                    >
                        VAIBHAV<br />SHARMA
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="reveal text-secondary dark:text-white/75 font-bold mb-6 tracking-widest uppercase"
                        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
                    >
                        Backend / Systems Engineering Student
                    </p>

                    {/* Positioning statement */}
                    <p
                        className="reveal text-secondary dark:text-white/90 leading-relaxed mb-10 max-w-xl"
                        style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)' }}
                    >
                        I build reliable backend systems, scalable APIs, and ML-powered applications.                    </p>

                    {/* CTAs */}
                    <div className="reveal flex flex-wrap gap-6 mt-4">
                        <a
                            href="#work"
                            id="hero-cta-work"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary dark:bg-white text-white dark:text-[#0B1120] text-sm font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 dark:hover:bg-slate-100 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto border border-transparent dark:border-white/10"
                        >
                            View Projects
                        </a>
                        <a
                            href="resume.pdf"
                            id="hero-cta-resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary/20 dark:border-white/20 text-primary dark:text-white text-sm font-bold hover:border-primary/50 dark:hover:border-white/50 hover:bg-primary/5 dark:hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>

                {/* Right Side: Architecture Diagram */}
                <div className="w-full lg:w-[50%] xl:w-[55%] relative pointer-events-none flex items-center justify-center mt-4 border-t border-border/50 lg:border-t-0 pt-8 lg:mt-0 lg:pt-0">
                    <ArchitectureDiagram />
                </div>
            </div>
        </section>
    );
};
