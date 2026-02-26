import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import resumeData from '../../data/resume.json';
import CardNav from '../ui/CardNav';

const NAV_LINKS = [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
];

const SOCIAL_LINKS = [
    { href: resumeData.socials.github, icon: <Github size={16} />, label: 'GitHub', external: true },
    { href: resumeData.socials.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn', external: true },
    { href: resumeData.socials.email, icon: <Mail size={16} />, label: 'Email', external: false },
];

// The three cards shown in the CardNav when VS logo is clicked
const CARD_NAV_ITEMS = [
    {
        label: 'Work',
        bgColor: '#0D0716',
        textColor: '#fff',
        links: [
            { label: 'Systems Built', href: '#work', ariaLabel: 'View projects' },
            { label: 'Capabilities', href: '#capabilities', ariaLabel: 'Core competencies' },
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

export const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cardNavOpen, setCardNavOpen] = useState(false);

    const handleVSClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setCardNavOpen((prev) => !prev);
    };

    return (
        <header className="sticky top-0 z-40 bg-canvas border-b border-border" role="banner">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 h-14 flex items-center justify-between">
                {/* VS Logotype — triggers CardNav */}
                <div className="relative">
                    <button
                        onClick={handleVSClick}
                        className="font-display text-sm font-bold text-primary tracking-widest uppercase transition-opacity hover:opacity-60"
                        aria-label="Open navigation card"
                        aria-expanded={cardNavOpen}
                        id="vs-logo-btn"
                    >
                        VS
                    </button>

                    {/* CardNav — anchored below the VS button */}
                    {cardNavOpen && (
                        <div
                            className="absolute top-[calc(100%+10px)] left-0"
                            style={{ width: 'min(88vw, 720px)' }}
                        >
                            <CardNav
                                logoContent={
                                    <button
                                        onClick={handleVSClick}
                                        className="font-display text-sm font-bold text-primary tracking-widest uppercase"
                                        aria-label="Close navigation card"
                                    >
                                        VS
                                    </button>
                                }
                                items={CARD_NAV_ITEMS}
                                baseColor="#FFFFFF"
                                menuColor="#0F172A"
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
                            className="text-xs font-medium text-secondary hover:text-primary tracking-wider uppercase transition-colors duration-150 link-underline"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop right: socials + resume */}
                <div className="hidden lg:flex items-center gap-4">
                    {SOCIAL_LINKS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target={s.external ? '_blank' : undefined}
                            rel={s.external ? 'noopener noreferrer' : undefined}
                            className="text-muted hover:text-primary transition-colors duration-150"
                            aria-label={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-4 py-1.5 border border-primary text-primary text-xs font-semibold tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-200"
                        id="header-resume-btn"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="lg:hidden p-1.5 text-secondary hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-border bg-canvas px-6 py-4 space-y-3">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block text-sm font-medium text-secondary hover:text-primary tracking-wider uppercase py-1"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-medium text-accent py-1"
                        onClick={() => setMobileOpen(false)}
                    >
                        Download Resume →
                    </a>
                </div>
            )}
        </header>
    );
};
