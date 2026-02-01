import React from 'react';
import { CheckCircle, Server, Layout, ArrowRight } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    context: string;
    problem: string;
    constraints: string;
    solution: string;
    architecture: string;
    impact: string;
    stack: string[];
    role: string;
}

interface CaseFileProps {
    project: Project;
}

export const CaseFile: React.FC<CaseFileProps> = ({ project }) => {
    return (
        <div className="space-y-8 font-mono text-slate-300 pb-12">
            <div className="border-b border-line-blueprint pb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-slate-100">{project.title}</h3>
                <p className="mt-2 text-accent-cyan flex items-center gap-2 text-xs lg:text-sm">
                    <Layout size={16} /> CASE_ID: {project.id.toUpperCase()}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Section title="Context" content={project.context} />
                <Section title="Problem Statement" content={project.problem} isWarning />
            </div>

            <Section title="Constraints" content={project.constraints} />

            <div className="bg-blueprint-dark/50 border border-line-blueprint p-6 rounded-sm relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Server size={120} />
                </div>
                <h4 className="text-accent-cyan text-sm uppercase tracking-widest mb-4 font-bold border-b border-accent-cyan/20 pb-2 inline-block">Solution Architecture</h4>
                <p className="whitespace-pre-wrap leading-relaxed relative z-10">{project.solution}</p>

                <div className="mt-6 p-4 bg-black/40 border border-line-blueprint rounded font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
                    {'>'} Architecture Snapshot: <br />
                    {project.architecture}
                </div>
            </div>

            <Section title="Impact & Results" content={project.impact} icon={<CheckCircle size={16} className="text-emerald-500" />} />

            <div className="space-y-3">
                <h4 className="text-text-dim text-xs uppercase tracking-widest">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-blueprint-dark border border-line-blueprint text-xs rounded text-accent-cyan hover:border-accent-cyan transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-line-blueprint">
                <h4 className="text-text-dim text-xs uppercase tracking-widest">Role</h4>
                <p>{project.role}</p>
            </div>

        </div>
    );
};

const Section = ({ title, content, isWarning, icon }: any) => (
    <div className="space-y-2">
        <h4 className="text-text-dim text-xs uppercase tracking-widest flex items-center gap-2">
            {icon || <ArrowRight size={12} className="text-accent-cyan" />} {title}
        </h4>
        <p className={`${isWarning ? 'text-amber-200/90' : 'text-slate-300'} leading-relaxed`}>
            {content}
        </p>
    </div>
);
