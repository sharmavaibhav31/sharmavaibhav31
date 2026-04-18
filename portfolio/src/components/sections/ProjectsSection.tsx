// Theme: Redacted × Kernel/Log hybrid
// Data: untouched — presentation layer only

import React, { useState, useRef, useEffect } from 'react';
import projectsData from '../../data/projects.json';

type Project = typeof projectsData[0];

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isOpen]);

    const pid = 1042 + (index * 65);
    const desc = project.solution ? (project.solution.length > 60 ? project.solution.slice(0, 60) + '...' : project.solution) : '';
    
    const stack = (project.stack || []).slice(0, 3);
    
    const isRun = project.category && (project.category.toUpperCase().includes('SECURITY') || project.category.toUpperCase().includes('ML') || project.category.toUpperCase().includes('AI'));

    const archPoints = typeof project.architecture === 'string' 
        ? project.architecture.split('→').map(s => s.trim()).filter(Boolean)
        : Array.isArray(project.architecture) ? project.architecture : [];

    return (
        <>
            <div 
                className="grid grid-cols-2 sm:grid-cols-[60px_1fr_90px_70px] md:grid-cols-[60px_1fr_220px_90px_70px] gap-x-4 gap-y-3 px-[2rem] py-[14px] border-b-[0.5px] border-white/[0.04] cursor-pointer transition-colors duration-150 hover:bg-white/[0.02] items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* PID */}
                <div className="hidden sm:block font-mono text-[9px] text-white/[0.15]">
                    {pid}
                </div>

                {/* PROCESS */}
                <div className="col-span-2 sm:col-span-1 flex flex-col">
                    <div className="font-sans text-[13px] font-semibold text-white/[0.82]">
                        {project.title}
                    </div>
                    <div className="font-mono text-[10px] text-white/[0.28] mt-[2px]">
                        {desc}
                    </div>
                </div>

                {/* STACK */}
                <div className="hidden md:flex flex-row flex-wrap gap-[4px]">
                    {stack.map(tech => (
                        <span key={tech} className="font-mono text-[9px] text-white/[0.35] bg-white/[0.04] border-[0.5px] border-white/[0.08] px-[6px] py-[1px]">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* STATUS */}
                <div className="flex items-center">
                    {isRun ? (
                        <span className="font-mono text-[8px] font-bold bg-[#e05c2a]/10 text-[#e05c2a] border-[0.5px] border-[#e05c2a]/30 px-[8px] py-[2px]">RUN</span>
                    ) : (
                        <span className="font-mono text-[8px] font-bold bg-white/[0.04] text-white/30 border-[0.5px] border-white/[0.1] px-[8px] py-[2px]">SLP</span>
                    )}
                </div>

                {/* SRC */}
                <div className="flex items-center justify-end">
                    {project.github && (
                        <button 
                            className="font-mono text-[9px] px-[10px] py-[4px] bg-[#ff5050]/[0.08] text-[#ff5050]/70 border-[0.5px] border-[#ff5050]/25 hover:bg-[#ff5050]/[0.14] transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.github, '_blank', 'noopener,noreferrer');
                            }}
                        >
                            SRC
                        </button>
                    )}
                </div>
            </div>

            {/* ACCORDION ROW */}
            <div 
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out bg-[#111111]"
                style={{ maxHeight }}
            >
                <div ref={contentRef} className="border-b-[0.5px] border-white/[0.06]">
                    <div className="p-6 md:p-[1.5rem_2rem_1.5rem_60px] grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
                        
                        {/* Left column */}
                        <div className="flex flex-col">
                            <div className="font-mono text-[8px] text-white/20 tracking-[0.14em] mb-[6px]">ROLE</div>
                            <div className="font-mono text-[11px] text-white/[0.45] border-l-[2px] border-[#4ade80]/25 bg-[#4ade80]/[0.03] px-[10px] py-[8px] leading-[1.7]">
                                {project.role}
                            </div>

                            {project.solution && (
                                <>
                                    <div className="font-mono text-[8px] text-white/20 tracking-[0.14em] mb-[6px] mt-[1rem]">PROBLEM</div>
                                    <div className="font-mono text-[11px] text-white/[0.45] border-l-[2px] border-[#4ade80]/25 bg-[#4ade80]/[0.03] px-[10px] py-[8px] leading-[1.7]">
                                        {project.solution}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right column */}
                        <div className="flex flex-col">
                            <div className="font-mono text-[8px] text-white/20 tracking-[0.14em] mb-[6px]">ARCHITECTURE</div>
                            <div className="flex flex-col">
                                {archPoints.map((pt, i) => (
                                    <div key={i} className="flex items-start gap-[8px] py-[5px] border-b-[0.5px] border-white/[0.04]">
                                        <span className="w-[3px] h-[3px] bg-[#4ade80] rounded-full shrink-0 mt-[6px]"></span>
                                        <span className="font-mono text-[11px] text-white/[0.4] leading-[1.6]">{pt}</span>
                                    </div>
                                ))}
                            </div>

                            {project.impact && (
                                <>
                                    <div className="font-mono text-[8px] text-white/20 tracking-[0.14em] mb-[8px] mt-[1rem]">IMPACT</div>
                                    <div className="bg-[#4ade80]/[0.03] border-[0.5px] border-[#4ade80]/15 px-[10px] py-[8px] font-mono text-[11px] text-white/[0.4] leading-[1.6]">
                                        {project.impact}
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export const ProjectsSection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('ALL');

    const categories = Array.from(new Set(
        projectsData.map(p => p.category).filter(Boolean)
    )) as string[];

    const filters = ['ALL', ...categories.map(c => c.toUpperCase())];

    const filteredProjects = projectsData.filter(p => 
        activeFilter === 'ALL' || (p.category && p.category.toUpperCase() === activeFilter)
    );

    return (
        <section id="work" className="w-full bg-bg-primary flex flex-col pt-0">
            {/* SECTION HEADER BAR */}
            <div className="w-full h-[36px] bg-[#111111] border-y-[0.5px] border-white/[0.06] px-4 md:px-8 flex justify-between items-center shrink-0">
                <div className="font-mono text-[8px] sm:text-[9px] text-white/20 tracking-[0.18em]">
                    PROCESS TABLE — SELECTED WORK
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-white/[0.18]">
                    {projectsData.length} processes · 0 errors
                </div>
            </div>

            {/* FILTER ROW */}
            <div className="w-full px-4 md:px-8 py-[1rem] flex flex-wrap gap-0 border-b-[0.5px] border-white/[0.06]">
                {filters.map(filter => {
                    const isActive = activeFilter === filter;
                    return (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`font-mono text-[9px] tracking-[0.12em] px-[16px] py-[6px] bg-transparent cursor-pointer transition-all duration-150 border-b-[2px] ${
                                isActive 
                                    ? 'text-[#4ade80] border-b-[#4ade80]' 
                                    : 'text-white/25 border-b-transparent hover:text-white/50'
                            }`}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            {/* TABLE COLUMN HEADERS */}
            <div className="hidden sm:grid sm:grid-cols-[60px_1fr_90px_70px] md:grid-cols-[60px_1fr_220px_90px_70px] gap-4 px-[2rem] py-[8px] border-b-[0.5px] border-white/[0.1] items-center">
                <div className="font-mono text-[8px] tracking-[0.16em] text-white/[0.18]">PID</div>
                <div className="font-mono text-[8px] tracking-[0.16em] text-white/[0.18]">PROCESS</div>
                <div className="hidden md:block font-mono text-[8px] tracking-[0.16em] text-white/[0.18]">STACK</div>
                <div className="font-mono text-[8px] tracking-[0.16em] text-white/[0.18]">STATUS</div>
                <div className="font-mono text-[8px] tracking-[0.16em] text-white/[0.18] text-right">SRC</div>
            </div>

            {/* PROJECT ROWS */}
            <div className="w-full flex flex-col">
                {filteredProjects.map((project, index) => (
                    <ProjectRow key={project.id} project={project as Project} index={index} />
                ))}
            </div>

        </section>
    );
};
