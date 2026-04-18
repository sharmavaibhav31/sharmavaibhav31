import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import resumeData from '../../data/resume.json';
import { ThemeToggle } from '../ui/theme-toggle';

const NAV_LINKS = [
    { label: 'WORK', href: '#work' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#capabilities' },
    { label: 'ABOUT', href: '#about' },
];

const SOCIAL_LINKS = [
    { href: resumeData.socials.github, icon: <Github size={14} />, label: 'GitHub', external: true },
    { href: resumeData.socials.linkedin, icon: <Linkedin size={14} />, label: 'LinkedIn', external: true },
    { href: resumeData.socials.email, icon: <Mail size={14} />, label: 'Email', external: false },
];

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-[100] w-full h-[48px] bg-bg-primary border-b-[0.5px] border-border-default px-4 md:px-8 flex items-center justify-between">
            
            {/* Left: Logo */}
            <div className="font-mono text-[12px] tracking-[0.1em] shrink-0">
                <span className="text-white/20">// SHARMA, </span>
                <span className="text-white/[0.85] font-bold">VAIBHAV</span>
            </div>

            {/* Center: Nav links (Hidden on small screens) */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/25 hover:text-white/70 transition-colors duration-150"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* Right: Icons + Resume + Theme */}
            <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-3">
                    {SOCIAL_LINKS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target={s.external ? '_blank' : undefined}
                            rel={s.external ? 'noopener noreferrer' : undefined}
                            className="text-white/30 hover:text-white/70 transition-colors duration-150"
                            aria-label={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                <a
                    href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[9px] tracking-[0.12em] px-[14px] py-[5px] bg-transparent text-white/50 border-[0.5px] border-white/20 hover:text-[#ff5050]/80 hover:border-[#ff5050]/30 transition-all duration-150 uppercase"
                >
                    RESUME
                </a>

                {/* Theme Toggle styled specifically */}
                <div className="flex items-center">
                    <div className="[&>button]:!bg-white/[0.04] [&>button]:!border-[0.5px] [&>button]:!border-white/[0.08] [&>button]:!text-white/30 [&>button]:!rounded-none [&>button]:!p-1">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};
