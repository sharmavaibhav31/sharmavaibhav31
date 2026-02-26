import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import resumeData from '../../data/resume.json';

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

export const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-canvas border-b border-border" role="banner">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 h-14 flex items-center justify-between">
                {/* Logotype */}
                <a
                    href="#hero"
                    className="font-display text-sm font-bold text-primary tracking-widest uppercase link-underline"
                    aria-label="Vaibhav Sharma – home"
                >
                    VS
                </a>

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
