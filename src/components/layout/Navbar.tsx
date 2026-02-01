import React from 'react';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import resumeData from '../../data/resume.json';

export const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 right-0 left-0 lg:left-80 h-20 flex items-center justify-end px-8 z-20 bg-gradient-to-b from-blueprint-dark to-transparent pointer-events-none">
            <div className="flex items-center gap-6 pointer-events-auto">
                <a href="/resume.pdf" className="flex items-center gap-2 text-text-dim hover:text-accent-cyan transition-colors font-mono text-sm group">
                    <FileText size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Resume</span>
                </a>
                <a href={resumeData.socials.github} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-accent-cyan transition-colors">
                    <Github size={20} className="hover:scale-110 transition-transform" />
                </a>
                <a href={resumeData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-accent-cyan transition-colors">
                    <Linkedin size={20} className="hover:scale-110 transition-transform" />
                </a>
                <a href={resumeData.socials.email} className="flex items-center gap-2 px-5 py-2 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-all font-mono text-sm rounded-sm hover:border-accent-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <Mail size={16} />
                    <span>Contact</span>
                </a>
            </div>
        </nav>
    );
};
