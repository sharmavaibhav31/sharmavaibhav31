import React from 'react';
import certData from '../../data/certifications.json';

export const CertificationsSection: React.FC = () => (
    <section id="certifications" className="py-28 border-b border-border dark:border-white/10" aria-labelledby="certifications-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent dark:text-[#61dca3] tracking-widest uppercase mb-3">
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
                        <h3 className="text-sm font-bold text-primary dark:text-white mb-6">
                            {group.category}
                        </h3>

                        {/* Grid of Certification Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {group.items.map((cert, j) => (
                                <div
                                    key={j}
                                    className="p-5 border border-border dark:border-white/15 bg-surface dark:bg-black/30 flex flex-col justify-between group hover:border-border-hover dark:hover:border-white/30 transition-colors"
                                >
                                    <div>
                                        <h4 className="text-sm font-bold text-primary dark:text-white leading-snug mb-2">
                                            {cert.title}
                                        </h4>
                                        <p className="text-xs text-secondary dark:text-white/70">
                                            {cert.issuer} <span className="text-border dark:text-white/30 mx-1">•</span> {cert.date}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] font-semibold text-accent dark:text-[#61dca3] opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Verify →
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
