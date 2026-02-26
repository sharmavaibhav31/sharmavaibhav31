import React from 'react';
import resumeData from '../../data/resume.json';

export const ExperienceSection: React.FC = () => (
    <section id="experience" className="py-28 border-b border-border" aria-labelledby="experience-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            {/* Section header */}
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-3">
                    Experience
                </p>
                <h2
                    id="experience-heading"
                    className="font-display font-bold text-primary"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                    Timeline
                </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div
                    className="hidden md:block absolute left-[160px] top-0 bottom-0 w-px bg-border"
                    aria-hidden="true"
                />

                <div className="space-y-12">
                    {resumeData.experience.map((exp, i) => (
                        <div
                            key={i}
                            className="reveal relative md:flex md:gap-0"
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            {/* Period — left column */}
                            <div className="md:w-[160px] md:pr-8 md:text-right shrink-0 mb-3 md:mb-0">
                                <span className="text-xs font-medium text-muted whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>

                            {/* Dot on timeline */}
                            <div
                                className="hidden md:block absolute left-[156px] top-1 w-2 h-2 rounded-full bg-primary border-2 border-canvas ring-1 ring-border"
                                aria-hidden="true"
                            />

                            {/* Content — right column */}
                            <div className="md:pl-10 flex-1">
                                <h3 className="text-sm font-bold text-primary leading-snug">
                                    {exp.role}
                                </h3>
                                <p className="text-xs font-medium text-secondary mt-0.5 mb-3">
                                    {exp.company}
                                </p>
                                <ul className="space-y-1.5">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j} className="text-sm text-secondary leading-relaxed flex items-start gap-2">
                                            <span className="text-muted mt-1.5 shrink-0 text-[8px]">▪</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
