// Theme: Redacted × Kernel/Log — new branch
// Data source: resume.json, skills.json, projects.json — untouched

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

    const renderBadge = (category: string) => {
        switch (category) {
            case 'Security':
                return <span className="font-mono text-[8px] tracking-[0.14em] px-[6px] py-[1px] font-bold border-[0.5px] border-accent-red-border text-accent-red">CLASSIFIED</span>;
            case 'ML Orchestration':
            case 'ML / AI':
            case 'Scalability':
            case 'IoT Systems':
                return <span className="font-mono text-[8px] tracking-[0.14em] px-[6px] py-[1px] font-bold border-[0.5px] border-accent-amber-border text-accent-amber">RESTRICTED</span>;
            case 'Automation':
            case 'HCI':
            default:
                return <span className="font-mono text-[8px] tracking-[0.14em] px-[6px] py-[1px] font-bold border-[0.5px] border-accent-green-border text-accent-green">UNCLASSIFIED</span>;
        }
    };

    return (
        <section id="hero" className="w-full min-h-screen flex flex-col bg-bg-primary pt-[48px]">
            {/* DOCUMENT HEADER BAR */}
            <div className="w-full bg-bg-surface border-b-[0.5px] border-border-default px-6 py-2 flex justify-between items-center z-10 shrink-0">
                <div className="font-mono text-[12px] text-text-muted tracking-[0.2em]">
                    PERSONNEL FILE
                </div>
                <div className="font-mono text-[8px] tracking-[0.2em] px-2 py-[2px] border border-accent-red-border text-accent-red -rotate-[1.5deg]">
                    ACTIVE
                </div>
            </div>

            {/* HERO BODY */}
            <div className="flex flex-col lg:flex-row flex-1">
                {/* LEFT COLUMN */}
                <div className="w-full lg:w-[55%] p-6 sm:p-14 flex flex-col justify-center">
                    {/* Top section */}
                    <div className="mb-12">
                        <div className="font-mono text-[9px] text-text-muted tracking-[0.2em] mb-6">
                            // PERSONNEL FILE
                        </div>
                        <h1 className="font-sans text-[48px] sm:text-[72px] font-black leading-[0.88] tracking-[-2px] text-text-primary uppercase">
                            {resumeData.name.split(' ').map((n, i) => <React.Fragment key={i}>{n}<br className="hidden sm:block" /></React.Fragment>)}
                        </h1>
                        <div className="font-mono text-[9px] tracking-[0.18em] text-text-muted mt-3 uppercase">
                            {resumeData.title}
                        </div>
                    </div>

                    {/* Middle section — FIELD ROWS */}
                    <div className="flex flex-col gap-3 mb-12">
                        <div className="flex flex-row items-baseline">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">SPECIALIZATION</span>
                            <span className="font-mono text-[11px] text-text-secondary">{specialization}</span>
                        </div>
                        <div className="flex flex-row items-baseline">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">PRIMARY STACK</span>
                            <span className="font-mono text-[11px] text-text-secondary">{primaryStack}</span>
                        </div>
                        <div className="flex flex-row items-baseline">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">CLEARANCE</span>
                            <span className="font-mono text-[11px] text-text-secondary">Java · C · Python · seccomp</span>
                        </div>
                        <div className="flex flex-row items-baseline">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">SYSTEMS BUILT</span>
                            <span className="font-mono text-[11px] text-text-secondary">{projectsData.length}</span>
                        </div>
                        <div className="flex flex-row items-baseline">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">USERS SERVED</span>
                            <span className="font-mono text-[11px] text-text-secondary">8,000+</span>
                        </div>
                        <div className="flex flex-row items-baseline">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">LOCATION</span>
                            <span className="font-mono text-[11px] redacted cursor-help" title="hover to reveal">Bengaluru, India</span>
                        </div>
                        <div className="flex flex-row items-baseline">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">CONTACT</span>
                            <span className="font-mono text-[11px] redacted cursor-help" title="hover to reveal">{resumeData.socials.email.replace('mailto:', '')}</span>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <span className="w-[120px] shrink-0 font-mono text-[9px] text-text-muted tracking-[0.1em] uppercase">STATUS</span>
                            <div className="flex items-center gap-2">
                                <div className="w-[6px] h-[6px] rounded-full bg-accent-green animate-pulse-dot"></div>
                                <span className="font-mono text-[11px] text-accent-green font-bold">ACTIVE — AVAILABLE</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section — buttons */}
                    <div className="flex flex-row gap-4 mt-auto lg:mt-0">
                        <a href="#work" className="font-mono text-[10px] tracking-[0.08em] uppercase bg-accent-red-bg text-accent-red border-[0.5px] border-accent-red-border px-5 py-2 hover:border-accent-red hover:bg-accent-red/10 transition-all duration-150 rounded-none">
                            VIEW PROJECTS
                        </a>
                        <a href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] uppercase bg-transparent text-text-secondary border-[0.5px] border-text-muted px-5 py-2 hover:border-text-secondary hover:text-text-primary transition-all duration-150 rounded-none">
                            DOWNLOAD RESUME
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="w-full lg:w-[45%] border-t-[0.5px] lg:border-t-0 lg:border-l-[0.5px] border-border-default p-6 sm:p-14 flex flex-col">
                    <div className="font-mono text-[9px] text-text-muted tracking-[0.2em] mb-5">
                        SYSTEMS MANIFEST
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                        {projectsData.slice(0, 7).map((project, index) => (
                            <a href="#work" key={project.id} className="flex flex-row items-center border-b-[0.5px] border-border-subtle py-3 hover:bg-white/[0.02] cursor-pointer group transition-colors">
                                <span className="w-[40px] font-mono text-[9px] text-text-muted">{(index + 1).toString().padStart(3, '0')}</span>
                                <span className="flex-1 font-sans text-[12px] font-semibold text-text-secondary truncate pr-4 group-hover:text-text-primary transition-colors">
                                    {project.title}
                                </span>
                                <div className="flex flex-row items-center gap-4 shrink-0">
                                    {renderBadge(project.category)}
                                    <span className="text-text-muted group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="font-mono text-[9px] text-text-muted mt-8">
                        hover CONTACT and LOCATION fields to reveal
                    </div>
                </div>
            </div>
        </section>
    );
};
