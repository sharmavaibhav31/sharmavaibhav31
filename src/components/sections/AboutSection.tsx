import React from 'react';
import resumeData from '../../data/resume.json';

export const AboutSection: React.FC = () => (
    <section id="about" className="py-28 border-b border-border" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="max-w-3xl">
                {/* Section header */}
                <div className="reveal mb-12">
                    <p className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-3">
                        About
                    </p>
                    <h2
                        id="about-heading"
                        className="font-display font-bold text-primary"
                        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                    >
                        Engineering Philosophy
                    </h2>
                </div>

                {/* Philosophy */}
                <blockquote className="reveal mb-10 pl-5 border-l-2 border-accent">
                    <p className="text-lg text-primary font-medium leading-relaxed italic">
                        "{resumeData.philosophy}"
                    </p>
                </blockquote>

                {/* Bio */}
                <p className="reveal text-secondary leading-relaxed text-[15px] mb-10">
                    {resumeData.summary}
                </p>

                {/* Contact row */}
                <div className="reveal flex flex-wrap gap-6 pt-6 border-t border-border">
                    <a
                        href={resumeData.socials.email}
                        className="text-sm font-medium text-accent link-accent"
                    >
                        {resumeData.socials.email.replace('mailto:', '')}
                    </a>
                    <a
                        href={resumeData.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-secondary link-underline hover:text-primary transition-colors"
                    >
                        {resumeData.socials.github.replace('https://', '')}
                    </a>
                    <a
                        href={resumeData.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-secondary link-underline hover:text-primary transition-colors"
                    >
                        {resumeData.socials.linkedin.replace('https://', '')}
                    </a>
                </div>
            </div>
        </div>
    </section>
);
