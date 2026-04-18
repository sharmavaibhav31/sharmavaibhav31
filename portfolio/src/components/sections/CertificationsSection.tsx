// Theme: Redacted × Kernel/Log hybrid
// Data: untouched — presentation layer only

import React from 'react';
import certData from '../../data/certifications.json';

export const CertificationsSection: React.FC = () => {
    // Flatten all certs into one list
    const allCerts = certData.flatMap(group => group.items);
    
    // Sort by date descending
    const sortedCerts = [...allCerts].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (!isNaN(dateA) && !isNaN(dateB)) {
            return dateB - dateA;
        }
        return 0;
    });

    return (
        <section id="certifications" className="w-full bg-bg-primary flex flex-col pt-0">
            {/* SECTION HEADER BAR */}
            <div className="w-full h-[36px] bg-[#111111] border-y-[0.5px] border-white/[0.06] px-4 md:px-8 flex justify-between items-center shrink-0">
                <div className="font-mono text-[8px] sm:text-[9px] text-white/20 tracking-[0.18em]">
                    CREDENTIALS VERIFIED
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-white/[0.18]">
                    {sortedCerts.length} credentials
                </div>
            </div>

            {/* CONTENT */}
            <div className="w-full flex flex-col">
                {sortedCerts.map((cert, i) => (
                    <a 
                        key={i}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-[12px_2rem] border-b-[0.5px] border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 grid grid-cols-1 sm:grid-cols-[1fr_180px_100px] items-center gap-2 sm:gap-0"
                    >
                        {/* Left: Name & Issuer */}
                        <div className="flex flex-col">
                            <span className="font-sans text-[12px] font-semibold text-white/[0.72] mb-[2px]">
                                {cert.title}
                            </span>
                            <span className="font-mono text-[10px] text-white/[0.25]">
                                {cert.issuer}
                            </span>
                        </div>
                        
                        {/* Middle: Date */}
                        <div className="font-mono text-[10px] text-white/[0.22] sm:text-center">
                            {cert.date}
                        </div>
                        
                        {/* Right: Badge */}
                        <div className="flex justify-start sm:justify-end">
                            <span className="font-mono text-[8px] tracking-[0.14em] font-bold text-[#4ade80]/[0.7] border-[0.5px] border-[#4ade80]/25 px-[8px] py-[2px] text-center">
                                VERIFIED
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
