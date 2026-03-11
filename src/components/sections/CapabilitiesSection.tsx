import React from 'react';
import skillsData from '../../data/skills.json';

export const CapabilitiesSection: React.FC = () => (
    <section id="capabilities" className="py-28 border-b border-border dark:border-slate-800/50 dark:bg-[#0B1120] transition-colors duration-300" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent dark:text-[#10B981] tracking-widest uppercase mb-3">
                    Capabilities
                </p>
                <h2
                    id="capabilities-heading"
                    className="font-display font-bold text-primary dark:text-white"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                    Core Competencies
                </h2>
            </div>

            <div className="flex flex-col space-y-12">
                {skillsData.capabilities.map((cap, i) => (
                    <div
                        key={cap.category}
                        className="reveal flex flex-col md:flex-row md:items-start gap-4 md:gap-12"
                        style={{ transitionDelay: `${i * 60}ms` }}
                    >
                        <h3 className="w-56 shrink-0 text-sm font-semibold text-primary dark:text-slate-100 tracking-wide mt-0.5">
                            {cap.category}
                        </h3>
                        <div className="flex-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                            {cap.items.map((item, index) => (
                                <React.Fragment key={item}>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        {item}
                                    </span>
                                    {index < cap.items.length - 1 && (
                                        <span className="text-slate-300 dark:text-slate-700/50 text-xs">/</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
