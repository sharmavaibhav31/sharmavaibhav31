import React, { useState } from 'react';
import { BlueprintCanvas } from '../components/layout/BlueprintCanvas';
import { SidebarMetrics } from '../components/layout/SidebarMetrics';
import { Navbar } from '../components/layout/Navbar';
import { BlueprintMap, type MapNode, type Connection } from '../components/layout/BlueprintMap';
import { Panel } from '../components/ui/Panel';
import { Terminal } from '../components/features/Terminal';
import { CaseFile } from '../components/features/CaseFile';
import { useBlueprintAssembly } from '../hooks/useBlueprintAssembly';
import { Server, Brain, Cloud, Users, FolderKanban, User, Mail, Terminal as TerminalIcon } from 'lucide-react';
import projectsData from '../data/projects.json';
import resumeData from '../data/resume.json';
import skillsData from '../data/skills.json';

const NODES: MapNode[] = [
    { id: 'core', label: 'Dev — Systems Engineer', x: 50, y: 45, icon: <Server size={22} />, type: 'root', tooltip: 'System architecture overview' },
    { id: 'backend', label: 'Backend Systems', x: 22, y: 28, icon: <Server size={18} />, tooltip: 'Java, Spring Boot, Node.js' },
    { id: 'ml', label: 'ML / AI', x: 78, y: 28, icon: <Brain size={18} />, tooltip: 'PyTorch, TensorFlow, RAG' },
    { id: 'cloud', label: 'Cloud & DevOps', x: 22, y: 62, icon: <Cloud size={18} />, tooltip: 'AWS, Docker, Kubernetes' },
    { id: 'leadership', label: 'Leadership', x: 78, y: 62, icon: <Users size={18} />, tooltip: 'Technical roadmaps & mentorship' },
    { id: 'projects', label: 'Projects', x: 88, y: 45, icon: <FolderKanban size={18} />, tooltip: 'View all project case files' },
    { id: 'about', label: 'About', x: 12, y: 45, icon: <User size={18} />, tooltip: 'Background & experience' },
    { id: 'contact', label: 'Contact', x: 50, y: 78, icon: <Mail size={18} />, tooltip: 'Get in touch' },
];

const CONNECTIONS: Connection[] = [
    { from: 'core', to: 'backend' },
    { from: 'core', to: 'ml' },
    { from: 'core', to: 'cloud' },
    { from: 'core', to: 'leadership' },
    { from: 'core', to: 'projects' },
    { from: 'core', to: 'about' },
    { from: 'core', to: 'contact' },
    { from: 'backend', to: 'cloud' },
    { from: 'backend', to: 'ml' },
];

export const Home: React.FC = () => {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

    const assembly = useBlueprintAssembly();

    const handleNodeClick = (id: string) => {
        setActiveNode(id);
        setPanelOpen(true);
        setSelectedProject(null);
    };

    const handleProjectClick = (projectId: string) => {
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
            setSelectedProject(project);
            setPanelOpen(true);
        }
    };

    const renderPanelContent = () => {
        if (selectedProject) {
            return (
                <div>
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="mb-5 text-xs text-accent-cyan hover:underline font-mono tracking-wider"
                    >
                        {'←'} BACK_TO_LIST
                    </button>
                    <CaseFile project={selectedProject} />
                </div>
            );
        }

        switch (activeNode) {
            case 'core':
                return (
                    <div className="font-mono text-slate-300 space-y-5">
                        <h3 className="text-lg text-white font-bold">System Overview</h3>
                        <p className="text-sm leading-relaxed">Navigate the architecture of my experience using the blueprint nodes. Each node represents a domain of expertise.</p>
                        <div className="p-4 border border-line-blueprint bg-surface/50 rounded-sm space-y-1.5">
                            <p className="text-xs text-accent-cyan/70">STATUS: <span className="text-emerald-400">ONLINE</span></p>
                            <p className="text-xs text-accent-cyan/70">MODE: <span className="text-slate-300">CONSULTING</span></p>
                            <p className="text-xs text-accent-cyan/70">STACK: <span className="text-slate-300">Java / Python</span></p>
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className="font-mono text-slate-300 space-y-6">
                        <h3 className="text-lg text-white font-bold">About</h3>
                        <p className="text-sm leading-relaxed">{resumeData.summary}</p>
                        <div className="space-y-4">
                            {resumeData.experience.map((exp, i) => (
                                <div key={i} className="border-l-2 border-accent-cyan/40 pl-4">
                                    <h4 className="text-white font-semibold text-sm">{exp.role}</h4>
                                    <p className="text-xs text-text-muted mt-0.5">{exp.company} · {exp.period}</p>
                                    <p className="text-xs mt-1.5 text-slate-400">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'projects':
            case 'backend':
            case 'ml': {
                const filteredProjects = activeNode === 'projects'
                    ? projectsData
                    : projectsData.filter(p => {
                        if (activeNode === 'backend') return p.stack.some(s => ['Java', 'Spring', 'Go', 'Node', 'SQL'].some(k => s.includes(k)));
                        if (activeNode === 'ml') return p.stack.some(s => ['Python', 'Torch', 'AI', 'ML'].some(k => s.includes(k)));
                        return true;
                    });

                return (
                    <div className="font-mono space-y-5">
                        <h3 className="text-lg text-white font-bold uppercase">
                            {activeNode === 'projects' ? 'All Modules' : `${activeNode} Modules`}
                        </h3>
                        <div className="grid gap-3">
                            {filteredProjects.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => setSelectedProject(p)}
                                    className="p-4 border border-line-blueprint hover:border-accent-cyan/50 bg-surface/30 hover:bg-accent-cyan/5 cursor-pointer transition-all duration-200 group rounded-sm"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => { if (e.key === 'Enter') setSelectedProject(p); }}
                                >
                                    <h4 className="text-accent-cyan font-semibold text-sm group-hover:text-white transition-colors duration-200">
                                        {p.title}
                                    </h4>
                                    <p className="text-xs text-text-muted mt-1.5 line-clamp-2">{p.context}</p>
                                    <div className="mt-2.5 flex gap-1.5 flex-wrap">
                                        {p.stack.slice(0, 3).map(s => (
                                            <span key={s} className="text-[10px] px-2 py-0.5 border border-line-blueprint/60 rounded-sm text-slate-400">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {filteredProjects.length === 0 && (
                                <p className="text-slate-500 text-sm">No modules in this sector.</p>
                            )}
                        </div>
                    </div>
                );
            }

            case 'cloud':
                return (
                    <div className="font-mono space-y-5">
                        <h3 className="text-lg text-white font-bold">Infrastructure & Ops</h3>
                        <div className="space-y-4">
                            <div className="bg-surface/50 p-4 border border-line-blueprint rounded-sm">
                                <h4 className="text-accent-cyan/70 mb-2.5 text-xs uppercase tracking-[0.15em]">Cloud Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skillsData.infrastructure.map(s => (
                                        <span key={s} className="px-2.5 py-1 bg-black/30 text-xs rounded-sm border border-line-blueprint/50 text-slate-300">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-surface/50 p-4 border border-line-blueprint rounded-sm">
                                <h4 className="text-accent-cyan/70 mb-2.5 text-xs uppercase tracking-[0.15em]">Architecture Concepts</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skillsData.concepts.map(s => (
                                        <span key={s} className="px-2.5 py-1 bg-black/30 text-xs rounded-sm border border-line-blueprint/50 text-slate-300">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'leadership':
                return (
                    <div className="font-mono space-y-5">
                        <h3 className="text-lg text-white font-bold">Leadership</h3>
                        <p className="text-slate-300 text-sm">Driving technical excellence and cross-team alignment.</p>
                        <ul className="space-y-2.5 text-slate-400 text-sm">
                            {[
                                'Technical Roadmap Planning',
                                'Code Review & Quality Standards',
                                'Mentorship & Knowledge Sharing',
                                'Cross-team Architecture Alignment'
                            ].map(item => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="text-accent-cyan/50 mt-1">▸</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'contact':
                return (
                    <div className="font-mono space-y-5">
                        <h3 className="text-lg text-white font-bold">Contact</h3>
                        <p className="text-slate-300 text-sm">Initiate connection via:</p>
                        <div className="space-y-3">
                            <a
                                href={resumeData.socials.email}
                                className="block p-4 border border-line-blueprint hover:border-accent-cyan/50 text-accent-cyan text-sm transition-colors duration-200 rounded-sm"
                            >
                                EMAIL: {resumeData.socials.email.replace('mailto:', '')}
                            </a>
                            <a
                                href={resumeData.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 border border-line-blueprint hover:border-accent-cyan/50 text-accent-cyan text-sm transition-colors duration-200 rounded-sm"
                            >
                                GITHUB: {resumeData.socials.github.replace('https://', '')}
                            </a>
                            <a
                                href={resumeData.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 border border-line-blueprint hover:border-accent-cyan/50 text-accent-cyan text-sm transition-colors duration-200 rounded-sm"
                            >
                                LINKEDIN: {resumeData.socials.linkedin.replace('https://', '')}
                            </a>
                        </div>
                    </div>
                );

            default:
                return <div className="text-slate-500 text-sm font-mono">Select a node to view details.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-blueprint-dark text-slate-200 overflow-hidden relative">
            {/* Canvas background — fades in as Step 1 of assembly */}
            <BlueprintCanvas visible={assembly.gridVisible} />

            <Navbar />
            <SidebarMetrics />

            {/* Main blueprint area — interactive immediately */}
            <main className="fixed inset-0 lg:left-72 xl:left-80 top-16" id="blueprint-main">
                <BlueprintMap
                    nodes={NODES}
                    connections={CONNECTIONS}
                    activeNodeId={activeNode}
                    onNodeClick={handleNodeClick}
                    assembly={assembly}
                />
            </main>

            {/* Terminal Toggle */}
            <div className="fixed bottom-6 right-6 z-20">
                <button
                    onClick={() => setTerminalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-black/80 border border-accent-cyan/30 text-accent-cyan font-mono text-xs hover:bg-accent-cyan hover:text-black transition-all duration-200 shadow-[0_0_12px_rgba(6,182,212,0.15)] rounded-sm hover:border-accent-cyan"
                    aria-label="Open terminal mode"
                    id="terminal-toggle"
                >
                    <TerminalIcon size={14} />
                    TERMINAL
                </button>
            </div>

            <Panel
                isOpen={panelOpen}
                onClose={() => setPanelOpen(false)}
                title={activeNode ? activeNode.toUpperCase() : 'DETAILS'}
            >
                {renderPanelContent()}
            </Panel>

            <Terminal
                isOpen={terminalOpen}
                onClose={() => setTerminalOpen(false)}
                onOpenProject={(id) => {
                    setTerminalOpen(false);
                    handleProjectClick(id);
                }}
            />
        </div>
    );
};
