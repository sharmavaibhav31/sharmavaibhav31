import React from 'react';
import resumeData from '../../data/resume.json';

export const ExperienceSection: React.FC = () => (
    <section id="experience" className="py-28 border-b border-border dark:border-slate-800/50 dark:bg-[#0B1120] transition-colors duration-300" aria-labelledby="experience-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent dark:text-[#8B5CF6] tracking-widest uppercase mb-3">
                    Experience
                </p>
                <h2
                    id="experience-heading"
                    className="font-display font-bold text-primary dark:text-white"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                    Timeline
                </h2>
            </div>

            <div className="relative">
                {/* Vertical line */}
                <div
                    className="hidden md:block absolute left-[160px] top-0 bottom-0 w-px bg-border dark:bg-slate-700/50"
                    aria-hidden="true"
                />

                <div className="space-y-12">
                    {resumeData.experience.map((exp, i) => (
                        <div
                            key={i}
                            className="reveal relative md:flex md:gap-0"
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            {/* Period */}
                            <div className="md:w-[160px] md:pr-8 md:text-right shrink-0 mb-3 md:mb-0">
                                <span className="text-xs font-medium font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>

                            {/* Dot (GitHub Commit Style) */}
                            <div
                                className="hidden md:block absolute left-[156px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-[#0B1120]"
                                aria-hidden="true"
                            />

                            {/* Content */}
                            <div className="md:pl-10 flex-1">
                                <h3 className="text-sm font-semibold text-primary dark:text-slate-100 leading-snug">
                                    {exp.role}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 mb-4 font-medium">
                                    {exp.company}
                                </p>
                                <ul className="space-y-2.5">
                                    {exp.bullets.map((bullet, j) => (
                                        <li key={j} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-3">
                                            <span className="text-slate-300 dark:text-slate-600 mt-1.5 shrink-0 text-[10px]">●</span>
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
