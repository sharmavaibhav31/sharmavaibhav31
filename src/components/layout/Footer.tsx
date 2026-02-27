import React from 'react';
import resumeData from '../../data/resume.json';

export const Footer: React.FC = () => (
    <footer className="py-8 border-t border-border dark:border-white/10" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-muted dark:text-white/60 font-medium">
                © 2026 Vaibhav Sharma. Systems / Backend Engineer.
            </p>
            <div className="flex items-center gap-6">
                <a
                    href={resumeData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-secondary dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors link-underline font-medium"
                >
                    GitHub
                </a>
                <a
                    href={resumeData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-secondary dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors link-underline font-medium"
                >
                    LinkedIn
                </a>
                <a
                    href={resumeData.socials.email}
                    className="text-xs text-secondary dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors link-underline font-medium"
                >
                    Email
                </a>
            </div>
        </div>
    </footer>
);
