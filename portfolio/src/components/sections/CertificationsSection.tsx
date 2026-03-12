import React from 'react';
import certData from '../../data/certifications.json';

export const CertificationsSection: React.FC = () => (
    <section id="certifications" className="py-28 border-b border-border dark:border-slate-800/50 dark:bg-[#0B1120] transition-colors duration-300" aria-labelledby="certifications-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent dark:text-[#94A3B8] tracking-widest uppercase mb-3">
                    Credentials
                </p>
                <h2
                    id="certifications-heading"
                    className="font-display font-bold text-primary dark:text-white"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                    Certifications
                </h2>
            </div>

            <div className="space-y-16">
                {certData.map((group, i) => (
                    <div
                        key={group.category}
                        className="reveal"
                        style={{ transitionDelay: `${i * 60}ms` }}
                    >
                        {/* Tier Heading */}
                        <h3 className="text-sm font-semibold text-primary dark:text-slate-100 uppercase tracking-wide mb-4">
                            {group.category}
                        </h3>

                        <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-[#0B1120]">
                            {group.items.map((cert, j) => (
                                <div
                                    key={j}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b last:border-0 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#0F172A] transition-colors"
                                >
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-primary dark:text-slate-200">
                                            {cert.title}
                                        </h4>
                                        <div className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                            <span>{cert.issuer}</span>
                                            <span className="opacity-50">•</span>
                                            <span className="font-mono">{cert.date}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 sm:mt-0">
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] font-semibold text-accent dark:text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                        >
                                            Verify Status →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
