import { useIntersectionObserver } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
import { useTheme } from '../../context/ThemeContext';
import { ArchitectureDiagram } from './ArchitectureSection';

const DOT_POSITIONS = [
    { cx: 16.7, cy: 14.3 }, { cx: 33.3, cy: 28.6 }, { cx: 50.0, cy: 42.9 },
    { cx: 66.7, cy: 57.1 }, { cx: 83.3, cy: 71.4 }, { cx: 16.7, cy: 57.1 },
    { cx: 33.3, cy: 71.4 }, { cx: 50.0, cy: 85.7 }, { cx: 66.7, cy: 14.3 },
    { cx: 83.3, cy: 28.6 }, { cx: 50.0, cy: 14.3 }, { cx: 33.3, cy: 57.1 },
];

export const HeroSection: React.FC = () => {
    useIntersectionObserver();
    const { isDark } = useTheme();

    // SVG grid drifts slower than the page — classic parallax depth
    const gridOffset = useParallax(0.25);
    // Hero text floats very subtly upward — understated depth
    const textOffset = useParallax(0.08);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center border-b border-border dark:border-white/10 overflow-hidden"
            aria-label="Hero"
        >
            {/* Structural grid — visible in light mode, hidden in dark (LetterGlitch takes over) */}
            <div
                className="absolute inset-0 pointer-events-none select-none"
                aria-hidden="true"
                style={{
                    transform: `translateY(${gridOffset}px)`,
                    willChange: 'transform',
                }}
            >
                <svg
                    className="absolute right-0 top-0 h-full w-1/2 animate-[gridDrift_20s_ease-in-out_infinite_alternate]"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" opacity="1" />
                    {DOT_POSITIONS.map((dot, i) => (
                        <circle key={i} cx={`${dot.cx}%`} cy={`${dot.cy}%`} r="2.5" fill="#2563EB" opacity="0.35" />
                    ))}
                    <line x1="16.7%" y1="14.3%" x2="33.3%" y2="28.6%" stroke="#2563EB" strokeWidth="1" opacity="0.28" />
                    <line x1="33.3%" y1="28.6%" x2="50%" y2="14.3%" stroke="#2563EB" strokeWidth="1" opacity="0.28" />
                    <line x1="50%" y1="42.9%" x2="66.7%" y2="57.1%" stroke="#2563EB" strokeWidth="1" opacity="0.28" />
                    <line x1="66.7%" y1="14.3%" x2="83.3%" y2="28.6%" stroke="#2563EB" strokeWidth="1" opacity="0.28" />
                    <line x1="16.7%" y1="57.1%" x2="33.3%" y2="71.4%" stroke="#2563EB" strokeWidth="1" opacity="0.28" />
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
                    <div className="reveal flex items-center gap-2.5 mb-10">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#61dca3]" />
                        <span className="text-xs font-medium tracking-widest-plus text-secondary dark:text-white/90 uppercase">
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
                        className="reveal text-secondary dark:text-white/75 font-medium mb-8 tracking-widest-plus uppercase"
                        style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)' }}
                    >
                        Systems / Backend Engineer
                    </p>

                    {/* Positioning statement */}
                    <p
                        className="reveal text-secondary dark:text-white/90 leading-relaxed mb-12 max-w-xl"
                        style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                    >
                        I design reliable backend systems and production-grade architecture.
                    </p>

                    {/* CTAs */}
                    <div className="reveal flex flex-wrap gap-4">
                        <a
                            href="#work"
                            id="hero-cta-work"
                            className="inline-flex items-center px-7 py-3.5 bg-accent dark:bg-[#61dca3] text-white dark:text-black text-sm font-semibold hover:bg-accent-hover dark:hover:bg-[#4ec994] transition-colors duration-200"
                        >
                            View Work
                        </a>
                        <a
                            href="/resume.pdf"
                            id="hero-cta-resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-7 py-3.5 border border-border dark:border-white/20 text-primary dark:text-white text-sm font-semibold hover:border-border-hover dark:hover:border-white/50 hover:shadow-card transition-all duration-200"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>

                {/* Right Side: Architecture Diagram (Only visible in Light Mode) */}
                {!isDark && (
                    <div className="hidden lg:flex w-full lg:w-1/2 relative min-h-[600px] pointer-events-none items-center justify-end">
                        <ArchitectureDiagram />
                    </div>
                )}
            </div>
        </section>
    );
};
