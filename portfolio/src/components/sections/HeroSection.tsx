// Theme: Redacted × Kernel/Log hybrid
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';

export const HeroSection: React.FC = () => {
    const specialization = resumeData.tagline;
    
    // Extract top 5 backend skills
    const primaryStack = skillsData.capabilities
        .find(c => c.category === 'Backend Engineering')
        ?.items.slice(0, 5).map(i => i.name).join(' · ') || 'Java · Spring Boot · PostgreSQL · Docker';

    return (
        <section id="hero" className="w-full min-h-screen flex flex-col bg-bg-primary pt-[48px]">
            {/* DOCUMENT HEADER BAR */}
            <div className="w-full h-[36px] bg-[#111111] border-y-[0.5px] border-white/[0.06] px-8 flex justify-between items-center z-10 shrink-0">
                <div className="font-mono text-[9px] text-white/[0.55] tracking-[0.22em]">
                    PERSONNEL FILE
                </div>
                <div className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#ff5050]/80 border border-[#ff5050]/35 px-[10px] py-[2px] -rotate-[1.5deg] inline-block">
                    ACTIVE
                </div>
            </div>

            {/* HERO BODY */}
            <div className="flex flex-col lg:flex-row flex-1">
                {/* LEFT COLUMN */}
                <div className="w-full lg:w-[65%] flex flex-col justify-center min-h-[calc(100vh-84px)] p-[3.5rem_3.5rem_3.5rem_3rem]">
                    
                    {/* Top section */}
                    <div>
                        <div className="font-mono text-[10px] text-white/[0.50] tracking-[0.2em] mb-[2rem]">
                            // PERSONNEL FILE
                        </div>
                        <h1 className="font-sans text-[48px] lg:text-[72px] font-black leading-[0.88] tracking-[-2px] text-white/[0.92] uppercase mb-2">
                            {resumeData.name.split(' ').map((n, i) => <React.Fragment key={i}>{n}<br className="hidden sm:block" /></React.Fragment>)}
                        </h1>
                        <div className="font-mono text-[10px] tracking-[0.16em] text-white/[0.55] mb-[2.5rem] uppercase">
                            {resumeData.title}
                        </div>
                    </div>

                    {/* Middle section — FIELD ROWS */}
                    <div className="flex flex-col">
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">SPECIALIZATION</span>
                            <span className="font-mono text-[12.5px] text-white/[0.82] leading-[1.6]">{specialization}</span>
                        </div>
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">PRIMARY STACK</span>
                            <span className="font-mono text-[12.5px] text-white/[0.82] leading-[1.6]">{primaryStack}</span>
                        </div>
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">CLEARANCE</span>
                            <span className="font-mono text-[12.5px] text-white/[0.82] leading-[1.6]">Java · C · Python · seccomp · llama.cpp</span>
                        </div>
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">SYSTEMS BUILT</span>
                            <span className="font-mono text-[12.5px] text-white/[0.82] leading-[1.6]">{projectsData.length} active</span>
                        </div>
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">USERS SERVED</span>
                            <span className="font-mono text-[12.5px] text-white/[0.82] leading-[1.6]">8,000+</span>
                        </div>
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">LOCATION</span>
                            <span className="font-mono text-[12.5px] leading-[1.6] bg-white/[0.12] text-transparent select-none cursor-pointer px-[4px] py-[1px] min-w-[140px] inline-block transition-all duration-250 ease-out hover:bg-transparent hover:text-white/[0.82]" title="hover to reveal">Bengaluru, India</span>
                        </div>
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">CONTACT</span>
                            <span className="font-mono text-[12.5px] leading-[1.6] bg-white/[0.12] text-transparent select-none cursor-pointer px-[4px] py-[1px] min-w-[140px] inline-block transition-all duration-250 ease-out hover:bg-transparent hover:text-white/[0.82]" title="hover to reveal">{resumeData.socials.email.replace('mailto:', '')}</span>
                        </div>
                        <div className="flex flex-row items-center pt-[9px] pb-[9px] border-b-[0.5px] border-white/[0.06] gap-[1.5rem]">
                            <span className="min-w-[140px] shrink-0 font-mono text-[10.5px] text-white/[0.55] tracking-[0.14em] uppercase">STATUS</span>
                            <div className="flex items-center">
                                <div className="w-[6px] h-[6px] rounded-full bg-[#4ade80] animate-pulse-dot mr-2 shrink-0"></div>
                                <span className="font-mono text-[10px] tracking-[0.12em] text-[#4ade80]">ACTIVE — AVAILABLE</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section — buttons */}
                    <div className="flex flex-row gap-4 mt-[2.5rem]">
                        <a href="#work" className="font-mono text-[10px] tracking-[0.08em] uppercase bg-[#ff5050]/[0.08] text-[#ff5050]/[0.85] border-[0.5px] border-[#ff5050]/30 px-[22px] py-[9px] hover:bg-[#ff5050]/[0.14] hover:border-[#ff5050]/50 transition-all duration-150 rounded-none">
                            VIEW PROJECTS
                        </a>
                        <a href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] uppercase bg-transparent text-white/[0.60] border-[0.5px] border-white/[0.12] px-[22px] py-[9px] hover:text-white/[0.82] hover:border-white/[0.25] transition-all duration-150 rounded-none">
                            DOWNLOAD RESUME
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="group relative w-full lg:w-[35%] bg-[#0e0e0e] border-t-[0.5px] lg:border-t-0 lg:border-l-[0.5px] border-white/[0.06] min-h-[300px] lg:min-h-[calc(100vh-84px)] p-[3rem_2.5rem] flex flex-col items-center justify-center">
                    
                    {/* Wrapper that takes up the inner padded space naturally */}
                    <div className="relative w-full flex flex-col items-center justify-center">
                        
                        {/* Actual Photo (dictates flow size, fades in on hover) */}
                        <div className="flex flex-col items-center justify-center w-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out z-20">
                            <img 
                                src={`${import.meta.env.BASE_URL}vaibhav_sharma.png`} 
                                alt="Vaibhav Sharma" 
                                className="w-full h-auto max-h-[75vh] object-cover object-top block border-[0.5px] border-white/[0.08]"
                            />
                            <div className="text-center mt-[10px] text-[9px] font-mono tracking-[0.14em] text-white/[0.55]">
                                // IDENTITY CONFIRMED
                            </div>
                        </div>

                        {/* Placeholder content (fades out on hover, perfectly covers the img) */}
                        <div className="absolute inset-0 flex flex-col items-center transition-opacity duration-400 ease-in-out group-hover:opacity-0 z-10 pb-[22px] /* account for caption space */">
                            <div className="relative w-full h-full border-[0.5px] border-white/[0.1] flex flex-col items-center justify-center p-1">
                                {/* Pattern/Noise Fill */}
                                <div className="absolute inset-1 bg-white/[0.03]"></div>
                                
                                {/* Corner Markers */}
                                <div className="absolute -top-[1px] -left-[1px] w-[10px] h-[10px] border-t-[1px] border-l-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>
                                <div className="absolute -top-[1px] -right-[1px] w-[10px] h-[10px] border-t-[1px] border-r-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>
                                <div className="absolute -bottom-[1px] -left-[1px] w-[10px] h-[10px] border-b-[1px] border-l-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>
                                <div className="absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] border-b-[1px] border-r-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>

                                {/* Centered Labels */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <span className="font-mono text-[8px] text-white/[0.55] tracking-[0.2em]">PHOTO</span>
                                    <span className="font-mono text-[8px] text-[#ff5050]/40 tracking-[0.2em] mt-1">REDACTED</span>
                                </div>
                            </div>
                            {/* VS. label */}
                            <div className="absolute bottom-[-18px] font-mono text-[11px] text-white/[0.20] tracking-[0.1em]">
                                VS.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
