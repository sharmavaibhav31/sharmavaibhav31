import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import resumeData from '../../data/resume.json';
import CardNav from '../ui/CardNav';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ui/theme-toggle';

const NAV_LINKS = [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#capabilities' },
    { label: 'About', href: '#about' },
];

const SOCIAL_LINKS = [
    { href: resumeData.socials.github, icon: <Github size={16} />, label: 'GitHub', external: true },
    { href: resumeData.socials.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn', external: true },
    { href: resumeData.socials.email, icon: <Mail size={16} />, label: 'Email', external: false },
];

const CARD_NAV_ITEMS = [
    {
        label: 'Work',
        bgColor: '#0D0716',
        textColor: '#fff',
        links: [
            { label: 'Systems Built', href: '#work', ariaLabel: 'View projects' },
            { label: 'Skills', href: '#capabilities', ariaLabel: 'Core competencies' },
        ],
    },
    {
        label: 'Experience',
        bgColor: '#170D27',
        textColor: '#fff',
        links: [
            { label: 'Timeline', href: '#experience', ariaLabel: 'View experience timeline' },
            { label: 'Philosophy', href: '#about', ariaLabel: 'Engineering philosophy' },
        ],
    },
    {
        label: 'Contact',
        bgColor: '#271E37',
        textColor: '#fff',
        links: [
            { label: 'Email', href: resumeData.socials.email, ariaLabel: 'Send an email' },
            { label: 'GitHub', href: resumeData.socials.github, ariaLabel: 'GitHub profile' },
            { label: 'LinkedIn', href: resumeData.socials.linkedin, ariaLabel: 'LinkedIn profile' },
        ],
    },
];

const Monogram = ({ inverted = false }: { inverted?: boolean }) => {
    const heavyColor = inverted ? "text-white dark:text-primary" : "text-primary dark:text-white";
    const lightColor = inverted ? "text-white/70 dark:text-primary/70" : "text-secondary dark:text-white/70";
    const dotColor = "bg-accent dark:bg-[#61dca3]";

    return (
        <span className="flex items-baseline tracking-tighter">
            <span className={`font-display font-black text-2xl leading-none ${heavyColor}`}>
                V
            </span>
            <span className={`font-display font-light text-2xl leading-none ${lightColor}`} style={{ marginLeft: '-0.05em' }}>
                S
            </span>
            <span className={`w-1.5 h-1.5 ml-1 mb-0.5 ${dotColor}`} />
        </span>
    );
};

export const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cardNavOpen, setCardNavOpen] = useState(false);
    const { isDark } = useTheme();

    const handleVSClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setCardNavOpen((prev) => !prev);
    };

    return (
        <header
            className="sticky top-0 z-40 bg-canvas dark:bg-black/70 dark:backdrop-blur-md border-b border-border dark:border-white/10 transition-colors duration-200"
            role="banner"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">

                {/* VS Logotype — triggers CardNav */}
                <div className="relative">
                    <button
                        onClick={handleVSClick}
                        className="transition-opacity hover:opacity-60"
                        aria-label="Open navigation card"
                        aria-expanded={cardNavOpen}
                        id="vs-logo-btn"
                    >
                        <Monogram />
                    </button>

                    {cardNavOpen && (
                        <div
                            className="absolute top-[calc(100%+10px)] left-0"
                            style={{ width: 'min(88vw, 720px)' }}
                        >
                            <CardNav
                                logoContent={
                                    <button
                                        onClick={handleVSClick}
                                        className="transition-opacity hover:opacity-60"
                                        aria-label="Close navigation card"
                                    >
                                        <Monogram inverted />
                                    </button>
                                }
                                items={CARD_NAV_ITEMS}
                                baseColor={isDark ? '#111111' : '#FFFFFF'}
                                menuColor={isDark ? '#ffffff' : '#0F172A'}
                                ease="circ.out"
                                autoOpen
                                onClose={() => setCardNavOpen(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-semibold text-secondary dark:text-white/80 hover:text-primary dark:hover:text-white tracking-wider uppercase transition-colors duration-150 link-underline"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right: socials + theme toggle + resume */}
                <div className="hidden lg:flex items-center gap-4">
                    {SOCIAL_LINKS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target={s.external ? '_blank' : undefined}
                            rel={s.external ? 'noopener noreferrer' : undefined}
                            className="text-muted dark:text-white/65 hover:text-primary dark:hover:text-white transition-colors duration-150"
                            aria-label={s.label}
                        >
                            {React.cloneElement(s.icon as React.ReactElement<{ size?: number }>, { size: 20 })}
                        </a>
                    ))}

                    <a
                        href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 px-5 py-2 border border-primary dark:border-white/40 text-primary dark:text-white text-sm font-semibold tracking-wider uppercase hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                        id="header-resume-btn"
                    >
                        Resume
                    </a>

                    <div className="pl-2 ml-2 border-l border-border dark:border-white/10 flex items-center">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile hamburger & floating actions */}
                <div className="lg:hidden flex items-center gap-3">
                    <a
                        href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-primary dark:border-white/40 text-primary dark:text-white rounded-sm hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                    >
                        Resume
                    </a>
                    <ThemeToggle className="scale-90" />
                    <button
                        className="p-2 text-secondary dark:text-white/80 hover:text-primary dark:hover:text-white transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="lg:hidden border-t border-border dark:border-white/10 bg-canvas dark:bg-black/80 px-6 py-5 space-y-4">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block text-base font-semibold text-secondary dark:text-white/80 hover:text-primary dark:hover:text-white tracking-wider uppercase py-1"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-base font-semibold text-accent dark:text-[#61dca3] py-1 mt-4"
                        onClick={() => setMobileOpen(false)}
                    >
                        Download Resume →
                    </a>
                </div>
            )}

        </header>
    );
};
