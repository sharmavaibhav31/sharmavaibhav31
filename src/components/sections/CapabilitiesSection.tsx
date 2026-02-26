import React from 'react';
import skillsData from '../../data/skills.json';

export const CapabilitiesSection: React.FC = () => (
    <section id="capabilities" className="py-28 border-b border-border" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            {/* Section header */}
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-3">
                    Capabilities
                </p>
                <h2
                    id="capabilities-heading"
                    className="font-display font-bold text-primary"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                    Core Competencies
                </h2>
            </div>

            {/* Capabilities grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
                {skillsData.capabilities.map((cap, i) => (
                    <div
                        key={cap.category}
                        className="reveal"
                        style={{ transitionDelay: `${i * 60}ms` }}
                    >
                        <h3 className="text-[11px] font-semibold text-primary tracking-widest uppercase mb-4 pb-3 border-b border-border">
                            {cap.category}
                        </h3>
                        <ul className="space-y-2">
                            {cap.items.map((item) => (
                                <li key={item} className="text-sm text-secondary leading-relaxed flex items-start gap-2">
                                    <span className="text-border mt-1.5 shrink-0 text-[8px]">▪</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
