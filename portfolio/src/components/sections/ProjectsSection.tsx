import React from 'react';
import projectsData from '../../data/projects.json';

type Project = typeof projectsData[0];

const GitHubIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5"
    >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const CategoryIcon: React.FC<{ category?: string }> = ({ category }) => {
    if (!category) return null;
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 whitespace-nowrap mb-4">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {category === 'Security' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                {category === 'Automation' && <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                {category === 'HCI' && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
                {category === 'ML Orchestration' && <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                {category === 'Scalability' && <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />}
                {category === 'IoT Systems' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />}
            </svg>
            {category}
        </span>
    );
};

// CategoryIcon removed as categories are no longer in the dataset

const ProjectCard: React.FC<{ project: Project; delay: number; forceVisible?: boolean }> = ({ project, delay, forceVisible }) => {
    const [isRoleExpanded, setIsRoleExpanded] = React.useState(false);
    const [isArchitectureExpanded, setIsArchitectureExpanded] = React.useState(false);
    const ROLE_LIMIT = 50;
    const shouldTruncate = project.role.length > ROLE_LIMIT;

    return (
        <article
            className={`${forceVisible ? 'is-visible' : 'reveal'} group flex flex-col h-full p-8 border border-border dark:border-slate-800 bg-surface dark:bg-[#0F172A] shadow-sm hover:shadow-md transition-all duration-300 relative`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Top: Project Name + Category Badge + Tech Tags */}
            <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary dark:text-slate-100 leading-snug">
                        {project.title}
                    </h3>
                    <CategoryIcon category={project.category} />
                </div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Middle: Summary & Highlights */}
            <div className="flex-1 mb-8">
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {project.solution}
                </p>

                <ul className="space-y-2">
                    {project.problem && (
                        <li className="flex items-start gap-2.5">
                            <span className="text-slate-300 dark:text-slate-600 mt-1 shrink-0 text-[10px]">●</span>
                            <span className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                <strong className="font-semibold text-slate-600 dark:text-slate-300">Problem: </strong>
                                {project.problem}
                            </span>
                        </li>
                    )}
                    {project.impact && (
                        <li className="flex items-start gap-2.5">
                            <span className="text-slate-300 dark:text-slate-600 mt-1 shrink-0 text-[10px]">●</span>
                            <span className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                <strong className="font-semibold text-slate-600 dark:text-slate-300">Impact: </strong>
                                {project.impact}
                            </span>
                        </li>
                    )}
                </ul>
            </div>

            {/* Bottom Actions & Role */}
            <div className="mt-auto">
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 pr-4">
                        <span
                            className={`text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-wide block ${!isRoleExpanded ? 'truncate' : ''}`}
                            title={!isRoleExpanded ? project.role : undefined}
                        >
                            Role: {project.role}
                        </span>
                        {shouldTruncate && (
                            <button
                                onClick={() => setIsRoleExpanded(!isRoleExpanded)}
                                className="text-[10px] text-accent dark:text-[#3B82F6] hover:underline mt-1 focus:outline-none"
                            >
                                {isRoleExpanded ? 'Read Less' : 'Read More...'}
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 mt-1">
                        {project.architecture && (
                            <button
                                onClick={() => setIsArchitectureExpanded(!isArchitectureExpanded)}
                                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-[#3B82F6] transition-colors duration-150 focus:outline-none"
                            >
                                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isArchitectureExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                                Architecture
                            </button>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded shadow-sm hover:bg-accent dark:hover:bg-[#10B981] dark:hover:text-white hover:text-white transition-all duration-200"
                                aria-label={`View ${project.title} on GitHub`}
                            >
                                <GitHubIcon />
                                Source
                            </a>
                        )}
                    </div>
                </div>

                {/* Expandable Architecture Flow */}
                {isArchitectureExpanded && typeof project.architecture === 'string' && project.architecture.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 block">System Architecture Flow</span>
                        <div className="flex flex-col space-y-1.5 bg-slate-50 dark:bg-[#0B1120] p-4 rounded-md border border-slate-200 dark:border-slate-800">
                            {project.architecture.split(' → ').map((node, index, arr) => (
                                <div key={index} className="flex flex-col">
                                    <div className="px-3 py-2 text-[11px] leading-snug font-mono text-slate-600 dark:text-slate-300 bg-white dark:bg-[#0F172A] rounded border border-slate-100 dark:border-slate-800 shadow-sm inline-block self-start">
                                        {node.trim()}
                                    </div>
                                    {index < arr.length - 1 && (
                                        <div className="flex justify-start ml-4 my-1 opacity-40">
                                            <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export const ProjectsSection: React.FC = () => {
    const [showAll, setShowAll] = React.useState(false);
    const displayedProjects = showAll ? projectsData : projectsData.slice(0, 6);

    return (
        <section id="work" className="py-12 md:py-20 lg:py-28 border-b border-border dark:border-slate-800/50 dark:bg-[#0B1120] transition-colors duration-300 w-full overflow-hidden" aria-labelledby="work-heading">
            <div className="w-full max-w-[1200px] mx-auto px-4">
                <div className="reveal mb-16">
                    <p className="text-[11px] font-semibold text-accent dark:text-[#3B82F6] tracking-widest uppercase mb-3">
                        Selected Work
                    </p>
                    <h2
                        id="work-heading"
                        className="font-display font-bold text-primary dark:text-white"
                        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
                    >
                        Systems Built
                    </h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 auto-rows-fr">
                    {displayedProjects.map((project, i) => (
                        <div key={project.id} className="bg-canvas dark:bg-[#0B1120] h-full">
                            <ProjectCard project={project} delay={(i % 4) * 50} forceVisible={showAll && i >= 6} />
                        </div>
                    ))}
                </div>

                {projectsData.length > 6 && (
                    <div className="mt-12 flex justify-center reveal">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 border border-border dark:border-slate-600 text-sm font-semibold text-primary dark:text-white uppercase tracking-wider hover:bg-primary hover:text-white dark:hover:bg-slate-800 transition-colors duration-200"
                        >
                            {showAll ? 'View Less' : 'Explore More'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
