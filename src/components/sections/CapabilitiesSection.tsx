import React from 'react';
import { SquareTerminal, Database, Braces, Link as LinkIcon, Info } from 'lucide-react';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';

type SkillItem = {
    name: string;
    tooltip?: string;
    projectRef?: string;
};

type CapabilityCategory = {
    category: string;
    items: SkillItem[];
};

const typedSkillsData = skillsData as { capabilities: CapabilityCategory[] };

const CardIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Core Backend':
            return <Braces className="w-5 h-5 text-accent dark:text-[#10B981]" />;
        case 'System Design':
            return <Database className="w-5 h-5 text-accent dark:text-[#10B981]" />;
        case 'AI & Data':
            return <SquareTerminal className="w-5 h-5 text-accent dark:text-[#10B981]" />;
        default:
            return <SquareTerminal className="w-5 h-5 text-accent dark:text-[#10B981]" />;
    }
};

export const CapabilitiesSection: React.FC = () => (
    <section id="capabilities" className="py-28 border-b border-border dark:border-slate-800/50 dark:bg-[#0B1120] transition-colors duration-300" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent dark:text-[#10B981] tracking-widest uppercase mb-3">
                    Capabilities
                </p>
                <h2
                    id="capabilities-heading"
                    className="font-display font-bold text-primary dark:text-white"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                    Core Competencies
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {typedSkillsData.capabilities.map((cap, i) => (
                    <div
                        key={cap.category}
                        className="reveal flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <CardIcon category={cap.category} />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                                {cap.category}
                            </h3>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                            {cap.items.map((item, index) => (
                                <div key={index} className="group relative">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">
                                        <span>{item.name}</span>
                                        {item.tooltip && (
                                            <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hidden sm:block" />
                                        )}
                                        {item.projectRef && (
                                            <a 
                                                href={`#${item.projectRef}`}
                                                className="ml-0.5 text-accent dark:text-[#10B981] hover:underline flex items-center"
                                                title={`View project: ${projectsData.find(p => p.id === item.projectRef)?.title || 'Project'}`}
                                            >
                                                <LinkIcon className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                    
                                    {/* Tooltip */}
                                    {item.tooltip && (
                                        <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs text-center rounded shadow-lg pointer-events-none">
                                            {item.tooltip}
                                            {/* Tooltip Arrow */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
