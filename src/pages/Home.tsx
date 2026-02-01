import React, { useState } from 'react';
import { SidebarMetrics } from '../components/layout/SidebarMetrics';
import { Navbar } from '../components/layout/Navbar';
import { BlueprintMap, type MapNode, type Connection } from '../components/layout/BlueprintMap';
import { Panel } from '../components/ui/Panel';
import { Terminal } from '../components/features/Terminal';
import { CaseFile } from '../components/features/CaseFile';
import { PortfolioGuard } from '../components/features/PortfolioGuard';
import { Server, Brain, Cloud, Users, FolderKanban, User, Mail, Terminal as TerminalIcon } from 'lucide-react';
import projectsData from '../data/projects.json';
import resumeData from '../data/resume.json';
import skillsData from '../data/skills.json';

const NODES: MapNode[] = [
    { id: 'core', label: 'Dev. Systems Engineer', x: 50, y: 50, icon: <Server size={24} />, type: 'root' },
    { id: 'backend', label: 'Backend Systems', x: 20, y: 35, icon: <Server /> },
    { id: 'ml', label: 'ML / AI', x: 80, y: 35, icon: <Brain /> },
    { id: 'cloud', label: 'Cloud & DevOps', x: 20, y: 65, icon: <Cloud /> },
    { id: 'leadership', label: 'Leadership', x: 80, y: 65, icon: <Users /> },
    { id: 'projects', label: 'Projects', x: 90, y: 50, icon: <FolderKanban /> },
    { id: 'about', label: 'About', x: 10, y: 50, icon: <User /> },
    { id: 'contact', label: 'Contact', x: 50, y: 80, icon: <Mail /> },
];

const CONNECTIONS: Connection[] = [
    { from: 'core', to: 'backend' },
    { from: 'core', to: 'ml' },
    { from: 'core', to: 'cloud' },
    { from: 'core', to: 'leadership' },
    { from: 'core', to: 'projects' },
    { from: 'core', to: 'about' },
    { from: 'core', to: 'contact' },
    // Interconnects
    { from: 'backend', to: 'cloud' },
    { from: 'backend', to: 'ml' },
];

export const Home: React.FC = () => {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const [accessGranted, setAccessGranted] = useState(false);

    const handleNodeClick = (id: string) => {
        setActiveNode(id);
        setPanelOpen(true);
        setSelectedProject(null); // Reset detail view
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
                        className="mb-6 text-xs text-accent-cyan hover:underline font-mono"
                    >
                        {'<'} BACK_TO_LIST
                    </button>
                    <CaseFile project={selectedProject} />
                </div>
            );
        }

        switch (activeNode) {
            case 'core':
                return (
                    <div className="font-mono text-slate-300 space-y-6">
                        <h3 className="text-xl text-white font-bold">System Architecture</h3>
                        <p>Welcome to the system blueprint. Use the nodes to navigate the architecture of my experience.</p>
                        <div className="p-4 border border-line-blueprint bg-black/30 rounded">
                            <p className="text-sm">STATUS: ONLINE</p>
                            <p className="text-sm">UPTIME: 99.9%</p>
                            <p className="text-sm">MODE: CONSULTING</p>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="font-mono text-slate-300 space-y-6">
                        <h3 className="text-xl text-white font-bold">About System</h3>
                        <p className="leading-relaxed">{resumeData.summary}</p>
                        <div className="space-y-4">
                            {resumeData.experience.map((exp, i) => (
                                <div key={i} className="border-l-2 border-accent-cyan pl-4">
                                    <h4 className="text-white font-bold">{exp.role}</h4>
                                    <p className="text-sm text-text-dim">{exp.company} | {exp.period}</p>
                                    <p className="text-sm mt-2">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
            case 'backend':
            case 'ml':
                const filteredProjects = activeNode === 'projects'
                    ? projectsData
                    : projectsData.filter(p => {
                        if (activeNode === 'backend') return p.stack.some(s => ['Java', 'Spring', 'Go', 'Node', 'SQL'].some(k => s.includes(k)));
                        if (activeNode === 'ml') return p.stack.some(s => ['Python', 'Torch', 'AI', 'ML'].some(k => s.includes(k)));
                        return true;
                    });

                return (
                    <div className="font-mono space-y-6">
                        <h3 className="text-xl text-white font-bold mb-4 uppercase">{activeNode === 'projects' ? 'All Modules' : `${activeNode} Modules`}</h3>
                        <div className="grid gap-4">
                            {filteredProjects.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => setSelectedProject(p)}
                                    className="p-4 border border-line-blueprint hover:border-accent-cyan bg-blueprint-dark/50 hover:bg-accent-cyan/5 cursor-pointer transition-all group"
                                >
                                    <h4 className="text-accent-cyan font-bold group-hover:text-white transition-colors">{p.title}</h4>
                                    <p className="text-xs text-text-dim mt-2 line-clamp-2">{p.context}</p>
                                    <div className="mt-3 flex gap-2">
                                        {p.stack.slice(0, 3).map(s => (
                                            <span key={s} className="text-[10px] px-2 py-0.5 border border-line-blueprint rounded text-slate-400">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {filteredProjects.length === 0 && <p className="text-slate-500">No modules initialized in this sector.</p>}
                        </div>
                    </div>
                );
            case 'cloud':
                return (
                    <div className="font-mono space-y-6">
                        <h3 className="text-xl text-white font-bold">Infrastructure & Ops</h3>
                        <div className="space-y-4">
                            <div className="bg-blueprint-dark/50 p-4 border border-line-blueprint">
                                <h4 className="text-accent-cyan mb-2 text-sm uppercase">Cloud Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skillsData.infrastructure.map(s => <span key={s} className="px-2 py-1 bg-black/30 text-xs rounded border border-line-blueprint">{s}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'leadership':
                return (
                    <div className="font-mono space-y-6">
                        <h3 className="text-xl text-white font-bold">Leadership</h3>
                        <p className="text-slate-300">Driving technical excellence and team alignment.</p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
                            <li>Technical Roadmap Planning</li>
                            <li>Code Review & Quality Standards</li>
                            <li>Mentorship & Knowledge Sharing</li>
                            <li>Cross-team Architecture Alignment</li>
                        </ul>
                    </div>
                );
            case 'contact':
                return (
                    <div className="font-mono space-y-6">
                        <h3 className="text-xl text-white font-bold">Communication Channels</h3>
                        <p className="text-slate-300">Initiate handshake protocol via:</p>
                        <div className="space-y-4">
                            <a href={resumeData.socials.email} className="block p-4 border border-line-blueprint hover:border-accent-cyan text-accent-cyan transition-colors">
                                EMAIL: {resumeData.socials.email.replace('mailto:', '')}
                            </a>
                            <a href={resumeData.socials.linkedin} target="_blank" className="block p-4 border border-line-blueprint hover:border-accent-cyan text-accent-cyan transition-colors">
                                LINKEDIN: /in/profile
                            </a>
                        </div>
                    </div>
                );
            default:
                return <div className="text-slate-500">Node detailed data not found.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-blueprint-dark text-slate-200 overflow-hidden relative selection:bg-accent-cyan/30">
            <PortfolioGuard onAccessGranted={() => setAccessGranted(true)} />

            <div className={`transition-opacity duration-1000 ${accessGranted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Navbar />
                <SidebarMetrics />

                <main className="fixed inset-0 lg:left-80 top-20">
                    <BlueprintMap
                        nodes={NODES}
                        connections={CONNECTIONS}
                        activeNodeId={activeNode}
                        onNodeClick={handleNodeClick}
                    />
                </main>

                {/* Terminal Toggle */}
                <div className="fixed bottom-8 right-8 z-20">
                    <button
                        onClick={() => setTerminalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-black/80 border border-accent-cyan text-accent-cyan font-mono text-sm hover:bg-accent-cyan hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-sm"
                    >
                        <TerminalIcon size={16} />
                        TERMINAL_MODE
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
        </div>
    );
};
