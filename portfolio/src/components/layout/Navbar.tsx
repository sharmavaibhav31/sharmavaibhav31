import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Menu, X } from 'lucide-react';
import resumeData from '../../data/resume.json';

export const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { href: 'Vaibhav_Sharma_resume.pdf', icon: <FileText size={18} />, label: 'Resume', external: false },
        { href: resumeData.socials.github, icon: <Github size={18} />, label: 'GitHub', external: true },
        { href: resumeData.socials.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn', external: true },
    ];

    return (
        <nav
            className="fixed top-0 right-0 left-0 lg:left-72 xl:left-80 h-16 flex items-center justify-between lg:justify-end px-4 lg:px-8 z-20 bg-gradient-to-b from-blueprint-dark via-blueprint-dark/80 to-transparent"
            aria-label="Main navigation"
        >
            {/* Mobile brand */}
            <div className="lg:hidden font-mono text-sm text-slate-100 tracking-wider font-bold">
                VS
            </div>

            {/* Mobile hamburger */}
            <button
                className="lg:hidden p-2 text-text-dim hover:text-accent-cyan transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
            >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-5">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-2 text-text-dim hover:text-accent-cyan transition-colors font-mono text-sm group"
                        aria-label={link.label}
                    >
                        <span className="group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
                        <span>{link.label}</span>
                    </a>
                ))}
                <a
                    href={resumeData.socials.email}
                    className="flex items-center gap-2 px-4 py-1.5 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-all font-mono text-sm rounded-sm hover:border-accent-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                >
                    <Mail size={15} />
                    <span>Contact</span>
                </a>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 right-0 bg-blueprint-dark/95 backdrop-blur border-b border-line-blueprint p-4 space-y-3">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            className="flex items-center gap-3 text-text-dim hover:text-accent-cyan transition-colors font-mono text-sm p-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </a>
                    ))}
                    <a
                        href={resumeData.socials.email}
                        className="flex items-center gap-3 text-accent-cyan font-mono text-sm p-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Mail size={18} />
                        <span>Contact</span>
                    </a>
                </div>
            )}
        </nav>
    );
};
