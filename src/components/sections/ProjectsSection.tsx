import React from 'react';
import projectsData from '../../data/projects.json';

type Project = typeof projectsData[0];

const ProjectCard: React.FC<{ project: Project; delay: number }> = ({ project, delay }) => (
    <article
        className="reveal group flex flex-col p-8 border border-border bg-surface shadow-card hover:shadow-card-hover hover:border-border-hover transition-all duration-200"
        style={{ transitionDelay: `${delay}ms` }}
    >
        {/* Header */}
        <div className="mb-5">
            <h3 className="text-base font-bold text-primary mb-2 leading-snug">
                {project.title}
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
                {project.problem}
            </p>
        </div>

        {/* Impact metric */}
        <p className="text-sm font-semibold text-primary mb-5 leading-relaxed">
            {project.impact}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tag) => (
                <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 border border-border text-secondary font-medium"
                >
                    {tag}
                </span>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-muted font-medium uppercase tracking-wider">
                {project.role.split('—')[0].trim()}
            </span>
            {project.caseStudy && (
                <span className="text-xs font-semibold text-accent link-accent">
                    Case Study →
                </span>
            )}
        </div>
    </article>
);

export const ProjectsSection: React.FC = () => (
    <section id="work" className="py-28 border-b border-border" aria-labelledby="work-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
            {/* Section header */}
            <div className="reveal mb-16">
                <p className="text-[11px] font-semibold text-accent tracking-widest uppercase mb-3">
                    Selected Work
                </p>
                <h2
                    id="work-heading"
                    className="font-display font-bold text-primary"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                    Systems Built
                </h2>
            </div>

            {/* Project grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {projectsData.map((project, i) => (
                    <div key={project.id} className="bg-canvas">
                        <ProjectCard project={project} delay={i * 50} />
                    </div>
                ))}
            </div>
        </div>
    </section>
);
