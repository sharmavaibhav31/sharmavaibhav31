// Theme: Redacted × Kernel/Log hybrid
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

// Handle potential missing fields based on strict "don't touch data" rule
const paragraphs = (resumeData as any).about?.paragraphs || [resumeData.philosophy, resumeData.summary].filter(Boolean);
const hobbies = (resumeData as any).hobbies || ["Systems Architecture", "Low-level Programming", "Open Source Contribution", "Cybersecurity Research"];

export const AboutSection: React.FC = () => (
    <section id="about" className="w-full bg-bg-primary flex flex-col pt-0">
        {/* SECTION HEADER BAR */}
        <div className="w-full h-[36px] bg-[#111111] border-y-[0.5px] border-white/[0.06] px-4 md:px-8 flex justify-between items-center shrink-0">
            <div className="font-mono text-[8px] sm:text-[9px] text-white/20 tracking-[0.18em]">
                OPERATIVE PROFILE
            </div>
            <div className="font-mono text-[8px] sm:text-[9px] text-[#4ade80]/70 tracking-[0.12em] font-bold">
                CLEARANCE: LEVEL 5
            </div>
        </div>

        {/* CONTENT */}
        <div className="w-full px-4 md:px-8 py-[3rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem]">
                
                {/* Left Column - Philosophy/Paragraphs */}
                <div className="flex flex-col gap-[1.5rem]">
                    <div className="font-mono text-[8px] text-white/20 tracking-[0.14em] mb-[4px]">
                        STATEMENT_OF_INTENT
                    </div>
                    {paragraphs.map((para: string, i: number) => (
                        <div key={i} className="font-mono text-[13px] leading-[1.8] text-white/[0.6]">
                            {i === 0 && (
                                <span className="text-[#4ade80] mr-2">{'>'}</span>
                            )}
                            {para}
                        </div>
                    ))}
                </div>

                {/* Right Column - Off-duty / Hobbies */}
                <div className="flex flex-col">
                    <div className="font-mono text-[8px] text-white/20 tracking-[0.14em] mb-[1.5rem]">
                        OFF_DUTY_LOGS
                    </div>
                    <div className="flex flex-col">
                        {hobbies.map((hobby: string, i: number) => (
                            <div key={i} className="flex items-center gap-[10px] mb-[12px]">
                                <span className="w-[3px] h-[3px] bg-[#ff5050] rounded-full shrink-0"></span>
                                <span className="font-mono text-[11px] text-white/[0.4]">
                                    {hobby}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Quick Socials/Contact block appended here for util */}
                    <div className="mt-[2rem] pt-[1.5rem] border-t-[0.5px] border-white/[0.06] flex flex-wrap gap-[1rem]">
                        <a 
                            href={resumeData.socials.email}
                            className="font-mono text-[10px] text-white/30 hover:text-white/70 transition-colors"
                        >
                            [EMAIL]
                        </a>
                        <a 
                            href={resumeData.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-white/30 hover:text-white/70 transition-colors"
                        >
                            [GITHUB]
                        </a>
                        <a 
                            href={resumeData.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-white/30 hover:text-white/70 transition-colors"
                        >
                            [LINKEDIN]
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
);
