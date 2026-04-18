// Theme: Redacted × Kernel/Log hybrid
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

export const ExperienceSection: React.FC = () => (
    <section id="experience" className="w-full bg-bg-primary flex flex-col pt-0">
        {/* SECTION HEADER BAR */}
        <div className="w-full h-[36px] bg-[#111111] border-y-[0.5px] border-white/[0.06] px-4 md:px-8 flex justify-between items-center shrink-0">
            <div className="font-mono text-[8px] sm:text-[9px] text-white/20 tracking-[0.18em]">
                DEPLOYMENT HISTORY
            </div>
            <div className="font-mono text-[8px] sm:text-[9px] text-white/[0.18]">
                {resumeData.experience.length} entries
            </div>
        </div>

        {/* CONTENT */}
        <div className="w-full px-4 md:px-8 py-[2rem]">
            {resumeData.experience.map((exp, i) => (
                <div key={i}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                        {/* Left Column - Date */}
                        <div className="w-full sm:w-[90px] lg:w-[140px] shrink-0 font-mono text-[9px] text-white/20 tracking-[0.06em] leading-[1.6]">
                            {exp.period}
                        </div>

                        {/* Right Column - Details */}
                        <div className="flex flex-col flex-1">
                            <h3 className="font-sans text-[14px] font-bold text-white/[0.82] mb-[2px]">
                                {exp.role}
                            </h3>
                            <div className="font-mono text-[10px] text-white/[0.3] mb-[10px]">
                                {exp.company}
                            </div>
                            
                            <div className="flex flex-col">
                                {exp.bullets.map((bullet, j) => (
                                    <div key={j} className="flex gap-[10px] items-start mb-[4px]">
                                        <span className="w-[3px] h-[3px] bg-[#4ade80] rounded-full shrink-0 mt-[7px]"></span>
                                        <span className="font-mono text-[11px] text-white/[0.4] leading-[1.7]">
                                            {bullet}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Entry separator (don't show after last item) */}
                    {i !== resumeData.experience.length - 1 && (
                        <div className="w-full h-px border-b-[0.5px] border-white/[0.05] my-[1.5rem]" />
                    )}
                </div>
            ))}
        </div>
    </section>
);
