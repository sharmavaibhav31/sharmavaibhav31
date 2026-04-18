// Refactored project grid — data sourced from ../../data/projects.json
// Architecture drawer toggle, category filter, 1px-gap dashboard grid

import React, { useState, useRef, useEffect } from 'react';
import projectsData from '../../data/projects.json';

type Project = typeof projectsData[0];

const getCategoryBadgeStyles = (category?: string) => {
    const cat = (category || '').toUpperCase();
    if (cat.includes('AUTOMATION')) return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    if (cat.includes('SECURITY')) return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    if (cat.includes('ML') || cat.includes('MACHINE LEARNING')) return 'bg-teal-500/10 border-teal-500/30 text-teal-400';
    if (cat.includes('SCALABILITY')) return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    if (cat.includes('HCI')) return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    if (cat.includes('IOT')) return 'bg-pink-500/10 border-pink-500/30 text-pink-400';
    return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
};

const ProjectCard: React.FC<{ project: Project; originalIndex: number }> = ({ project, originalIndex }) => {
    const [isArchOpen, setIsArchOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
        if (isArchOpen && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isArchOpen]);

    const archPoints = typeof project.architecture === 'string' 
        ? project.architecture.split('→').map(s => s.trim()).filter(Boolean)
        : Array.isArray(project.architecture) ? project.architecture : [];

    const indexStr = (originalIndex + 1).toString().padStart(2, '0');

    return (
        <article className="flex flex-col h-full bg-[#0B1120] p-6 sm:p-8 relative">
            {/* 1. TOP ROW */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-[12px] font-mono font-medium text-white/30">{indexStr}</span>
                {project.category && (
                    <span className={`text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded border ${getCategoryBadgeStyles(project.category)}`}>
                        {project.category}
                    </span>
                )}
            </div>

            {/* 2. PROJECT TITLE */}
            <h3 className="text-[15px] font-bold text-white leading-[1.3] mb-3">
                {project.title}
            </h3>

            {/* 3. SHORT DESCRIPTION */}
            <p className="text-[12px] text-white/50 leading-[1.6] mb-5 line-clamp-3">
                {project.solution}
            </p>

            {/* 4. TECH TAGS */}
            <div className="flex flex-wrap gap-2 mb-8">
                {(project.stack || []).map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-white/50 bg-white/[0.03] border border-white/10 px-2 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto flex flex-col">
                {/* 5. ARCHITECTURE DRAWER */}
                <div 
                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out" 
                    style={{ maxHeight }}
                >
                    <div ref={contentRef} className="pb-6">
                        {archPoints.length > 0 && (
                            <div className="mb-4">
                                <div className="text-[9px] tracking-[0.12em] text-white/30 uppercase mb-3">ARCHITECTURE</div>
                                <div className="flex flex-col gap-2">
                                    {archPoints.map((pt, i) => (
                                        <div key={i} className="flex items-start gap-2 text-[11px] text-white/60">
                                            <span className="w-1 h-1 rounded-full bg-[#00ffb4] shrink-0 mt-1.5"></span>
                                            <span className="leading-relaxed">{pt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {project.impact && (
                            <div className="mt-4">
                                <div className="text-[9px] tracking-[0.12em] text-white/30 uppercase mb-2">IMPACT</div>
                                <div className="p-3 bg-[#00ffb4]/[0.05] border-[0.5px] border-[#00ffb4]/30 text-[11px] text-[#00ffb4]/90 leading-relaxed rounded">
                                    {project.impact}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 6. CARD FOOTER */}
                <div className="flex flex-row items-center justify-between pt-4 border-t border-white/10 mt-2">
                    <div 
                        className="text-[10px] italic text-white/40 truncate pr-4 max-w-[55%]"
                        title={project.role}
                    >
                        {project.role}
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                        {archPoints.length > 0 && (
                            <button 
                                onClick={() => setIsArchOpen(!isArchOpen)}
                                className="text-[10px] font-mono text-white/60 border border-white/20 px-2.5 py-1.5 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-1.5 rounded"
                            >
                                Architecture
                                <svg 
                                    className={`w-3 h-3 transition-transform duration-300 ${isArchOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        )}
                        {project.github && (
                            <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-mono font-bold text-[#0B1120] bg-white px-3 py-1.5 hover:bg-white/90 transition-colors rounded"
                            >
                                SOURCE
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export const ProjectsSection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    // Extract unique categories
    const categories = Array.from(new Set(
        projectsData.map(p => p.category).filter(Boolean)
    )) as string[];

    const filters = ['All', ...categories];

    return (
        <section id="work" className="py-24 border-b border-border dark:border-slate-800 bg-[#0B1120] transition-colors duration-300 relative">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="mb-12 reveal">
                    <div className="text-[10px] tracking-[0.16em] text-accent dark:text-[#00ffb4] uppercase mb-4">
                        SELECTED WORK
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-2">
                                Systems Built
                            </h2>
                            <p className="text-xs text-white/40 italic">click architecture to expand</p>
                        </div>
                        
                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            {filters.map(filter => {
                                const isActive = activeFilter === filter;
                                return (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`text-[11px] font-mono px-3 py-1.5 rounded transition-all duration-200 border ${
                                            isActive 
                                                ? 'border-accent text-accent dark:border-[#00ffb4] dark:text-[#00ffb4] bg-accent/5 dark:bg-[#00ffb4]/5' 
                                                : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                                        }`}
                                    >
                                        {filter}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Project Grid */}
                <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[rgba(255,255,255,0.06)] border border-white/10 rounded-xl overflow-hidden">
                    {projectsData.map((project, index) => {
                        const isVisible = activeFilter === 'All' || project.category === activeFilter;
                        
                        if (!isVisible) return null;
                        
                        return (
                            <div key={project.id || index} className="bg-[#0B1120]">
                                <ProjectCard 
                                    project={project as Project} 
                                    originalIndex={index} 
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};
