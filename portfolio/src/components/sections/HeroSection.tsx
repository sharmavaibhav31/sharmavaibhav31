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
                <div className="font-mono text-[9px] text-white/20 tracking-[0.22em]">
                    PERSONNEL FILE
                </div>
                <div className="font-mono text-[8px] font-bold tracking-[0.2em] text-[#ff5050]/80 border border-[#ff5050]/35 px-[10px] py-[2px] -rotate-[1.5deg] inline-block">
                    ACTIVE
                </div>
            </div>

            {/* HERO BODY */}
            <div className="flex flex-col lg:flex-row flex-1">
                {/* LEFT COLUMN */}
                <div className="w-full lg:w-[60%] px-6 py-10 lg:p-[3.5rem_3rem] flex flex-col justify-center min-h-[calc(100vh-84px)]">
                    {/* Top section */}
                    <div className="mb-10">
                        <div className="font-mono text-[9px] text-white/[0.18] tracking-[0.2em] mb-[1.8rem]">
                            // PERSONNEL FILE
                        </div>
                        <h1 className="font-sans text-[48px] lg:text-[72px] font-black leading-[0.88] tracking-[-2px] text-white/[0.92] uppercase mb-2">
                            {resumeData.name.split(' ').map((n, i) => <React.Fragment key={i}>{n}<br className="hidden sm:block" /></React.Fragment>)}
                        </h1>
                        <div className="font-mono text-[9px] tracking-[0.18em] text-white/[0.28] mb-[2.5rem] uppercase">
                            {resumeData.title}
                        </div>
                    </div>

                    {/* Middle section — FIELD ROWS */}
                    <div className="flex flex-col">
                        <div className="flex flex-row items-baseline py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">SPECIALIZATION</span>
                            <span className="font-mono text-[11px] text-white/[0.55] leading-[1.6]">{specialization}</span>
                        </div>
                        <div className="flex flex-row items-baseline py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">PRIMARY STACK</span>
                            <span className="font-mono text-[11px] text-white/[0.55] leading-[1.6]">{primaryStack}</span>
                        </div>
                        <div className="flex flex-row items-baseline py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">CLEARANCE</span>
                            <span className="font-mono text-[11px] text-white/[0.55] leading-[1.6]">Java · C · Python · seccomp · llama.cpp</span>
                        </div>
                        <div className="flex flex-row items-baseline py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">SYSTEMS BUILT</span>
                            <span className="font-mono text-[11px] text-white/[0.55] leading-[1.6]">{projectsData.length} active</span>
                        </div>
                        <div className="flex flex-row items-baseline py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">USERS SERVED</span>
                            <span className="font-mono text-[11px] text-white/[0.55] leading-[1.6]">8,000+</span>
                        </div>
                        <div className="flex flex-row items-baseline py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">LOCATION</span>
                            <span className="font-mono text-[11px] leading-[1.6] bg-white/[0.08] text-transparent select-none cursor-pointer px-[4px] py-[1px] transition-all duration-250 ease-out hover:bg-transparent hover:text-white/[0.55]" title="hover to reveal">Bengaluru, India</span>
                        </div>
                        <div className="flex flex-row items-baseline py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">CONTACT</span>
                            <span className="font-mono text-[11px] leading-[1.6] bg-white/[0.08] text-transparent select-none cursor-pointer px-[4px] py-[1px] transition-all duration-250 ease-out hover:bg-transparent hover:text-white/[0.55]" title="hover to reveal">{resumeData.socials.email.replace('mailto:', '')}</span>
                        </div>
                        <div className="flex flex-row items-center py-[6px] border-b-[0.5px] border-white/[0.04]">
                            <span className="w-[130px] shrink-0 font-mono text-[9px] text-white/[0.22] tracking-[0.12em] uppercase">STATUS</span>
                            <div className="flex items-center">
                                <div className="w-[6px] h-[6px] rounded-full bg-[#4ade80] animate-pulse-dot mr-2 shrink-0"></div>
                                <span className="font-mono text-[9px] tracking-[0.12em] text-[#4ade80]">ACTIVE — AVAILABLE</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section — buttons */}
                    <div className="flex flex-row gap-4 mt-[2.5rem]">
                        <a href="#work" className="font-mono text-[10px] tracking-[0.08em] uppercase bg-[#ff5050]/[0.08] text-[#ff5050]/[0.85] border-[0.5px] border-[#ff5050]/30 px-[22px] py-[9px] hover:bg-[#ff5050]/[0.14] hover:border-[#ff5050]/50 transition-all duration-150 rounded-none">
                            VIEW PROJECTS
                        </a>
                        <a href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] uppercase bg-transparent text-white/[0.35] border-[0.5px] border-white/[0.12] px-[22px] py-[9px] hover:text-white/[0.6] hover:border-white/[0.25] transition-all duration-150 rounded-none">
                            DOWNLOAD RESUME
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="group relative w-full lg:w-[40%] bg-[#0e0e0e] border-t-[0.5px] lg:border-t-0 lg:border-l-[0.5px] border-white/[0.06] overflow-hidden min-h-[300px] lg:min-h-[calc(100vh-84px)] flex flex-col items-center justify-center">
                    
                    {/* Placeholder content (fades out on hover) */}
                    <div className="flex flex-col items-center justify-center transition-opacity duration-400 ease-in-out group-hover:opacity-0 z-10 relative">
                        {/* Rectangle Outline */}
                        <div className="relative w-[180px] h-[220px] border-[0.5px] border-white/[0.1] flex flex-col items-center justify-center p-1">
                            {/* Pattern/Noise Fill */}
                            <div className="absolute inset-1 bg-white/[0.03]"></div>
                            
                            {/* Corner Markers */}
                            <div className="absolute -top-[1px] -left-[1px] w-[10px] h-[10px] border-t-[1px] border-l-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>
                            <div className="absolute -top-[1px] -right-[1px] w-[10px] h-[10px] border-t-[1px] border-r-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>
                            <div className="absolute -bottom-[1px] -left-[1px] w-[10px] h-[10px] border-b-[1px] border-l-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>
                            <div className="absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] border-b-[1px] border-r-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400 z-20"></div>

                            {/* Centered Labels */}
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="font-mono text-[8px] text-white/[0.12] tracking-[0.2em]">PHOTO</span>
                                <span className="font-mono text-[8px] text-[#ff5050]/40 tracking-[0.2em] mt-1">REDACTED</span>
                            </div>
                        </div>

                        {/* VS. label */}
                        <div className="font-mono text-[11px] text-white/[0.08] tracking-[0.1em] mt-[12px]">
                            VS.
                        </div>
                    </div>

                    {/* Actual Photo (fades in on hover) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
                        <img 
                            src={`${import.meta.env.BASE_URL}vaibhav_sharma.png`} 
                            alt="Vaibhav Sharma" 
                            className="w-full h-full object-cover object-top"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-[#0c0c0c]/35 pointer-events-none"></div>
                    </div>

                    {/* Corner Markers (Stay visible on hover, but opacity changes) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[220px] pointer-events-none z-20">
                         <div className="absolute -top-[1px] -left-[1px] w-[10px] h-[10px] border-t-[1px] border-l-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400"></div>
                         <div className="absolute -top-[1px] -right-[1px] w-[10px] h-[10px] border-t-[1px] border-r-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400"></div>
                         <div className="absolute -bottom-[1px] -left-[1px] w-[10px] h-[10px] border-b-[1px] border-l-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400"></div>
                         <div className="absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] border-b-[1px] border-r-[1px] border-white/[0.2] group-hover:border-white/[0.08] transition-colors duration-400"></div>
                    </div>

                    {/* Identity Confirmed Label */}
                    <div className="absolute bottom-[1.5rem] left-[1.5rem] font-mono text-[9px] tracking-[0.16em] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 z-20 pointer-events-none">
                        // IDENTITY CONFIRMED
                    </div>

                </div>
            </div>
        </section>
    );
};
