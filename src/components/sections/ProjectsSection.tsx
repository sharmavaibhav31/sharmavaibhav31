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

const ProjectCard: React.FC<{ project: Project; delay: number; forceVisible?: boolean }> = ({ project, delay, forceVisible }) => (
    <article
        className={`${forceVisible ? 'is-visible' : 'reveal'} group flex flex-col h-full p-8 border border-border dark:border-slate-700/50 bg-surface dark:bg-[#0F172A] shadow-card dark:shadow-none hover:shadow-card-hover dark:hover:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-1`}
        style={{ transitionDelay: `${delay}ms` }}
    >
        {/* Header */}
        <div className="mb-5">
            <h3 className="text-base font-bold text-primary dark:text-white mb-2 leading-snug">
                {project.title}
            </h3>
            <p className="text-sm text-secondary dark:text-white/80 leading-relaxed">
                {project.problem}
            </p>
        </div>

        {/* Impact metric */}
        <p className="text-sm font-semibold text-primary dark:text-white mb-5 leading-relaxed">
            {project.impact}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tag) => (
                <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 border border-border dark:border-slate-700 text-secondary dark:text-slate-300 font-medium"
                >
                    {tag}
                </span>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border dark:border-slate-700/50 flex items-center justify-between">
            <span className="text-[11px] text-muted dark:text-slate-400 font-medium uppercase tracking-wider">
                {project.role.split('—')[0].trim()}
            </span>
            {project.github && (
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-accent dark:text-[#3B82F6] hover:opacity-75 transition-opacity duration-150"
                    aria-label={`View ${project.title} on GitHub`}
                >
                    <GitHubIcon />
                    GitHub →
                </a>
            )}
        </div>
    </article>
);

export const ProjectsSection: React.FC = () => {
    const [showAll, setShowAll] = React.useState(false);
    const displayedProjects = showAll ? projectsData : projectsData.slice(0, 4);

    return (
        <section id="work" className="py-28 border-b border-border dark:border-slate-800/50 dark:bg-[#0B1120] transition-colors duration-300" aria-labelledby="work-heading">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border dark:bg-slate-800/50 auto-rows-fr">
                    {displayedProjects.map((project, i) => (
                        <div key={project.id} className="bg-canvas dark:bg-[#0B1120]">
                            <ProjectCard project={project} delay={(i % 4) * 50} forceVisible={showAll && i >= 4} />
                        </div>
                    ))}
                </div>

                {projectsData.length > 4 && (
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
