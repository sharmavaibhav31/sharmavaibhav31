import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NodeId = 'center' | 'projects' | 'experience' | 'skills' | 'about' | 'contact';

type ArchitectureNode = {
    id: NodeId;
    title: string;
    attributes: string[];
    methods: string[];
    color: string;
    cx: number;
    cy: number;
    width: number;
    height: number;
    description: string;
};

// Extracted globally to prevent re-creation on render
const ARCHITECTURE_NODES: ArchitectureNode[] = [
    {
        id: 'center',
        title: 'SystemRoot',
        attributes: [
            '- architect: "Vaibhav Sharma"',
            '- role: "Backend Engineer"',
        ],
        methods: [
            '+ orchestrateSystem()',
            '+ deployToProduction()',
            '+ optimizeArchitecture()',
        ],
        color: '#E48525', // Orange
        cx: 425,
        cy: 325,
        width: 320,
        height: 175,
        description: 'System Root: Orchestrating backend architecture, API design, and production-grade software deployments.',
    },
    {
        id: 'projects',
        title: 'Projects',
        attributes: [
            '- repositories: Map<ID, Repo>',
            '- activeDeployments: int',
        ],
        methods: [
            '+ architectSolutions()',
            '+ scaleInfrastructure()',
        ],
        color: '#50A7B0', // Teal
        cx: 400,
        cy: 70,
        width: 240,
        height: 160,
        description: 'Repository of robust systems, APIs, and scalable infrastructure deployments.',
    },
    {
        id: 'experience',
        title: 'Experience',
        attributes: [
            '- timeline: List<Role>',
            '- totalYears: float',
        ],
        methods: [
            '+ leadEngineering()',
            '+ maintainSystems()',
        ],
        color: '#9B51E0', // Purple
        cx: 120,
        cy: 300,
        width: 230,
        height: 160,
        description: 'Professional timeline recounting engineering roles and critical system ownership.',
    },
    {
        id: 'skills',
        title: 'Skills',
        attributes: [
            '- languages: Set<String>',
            '- frameworks: Set<String>',
        ],
        methods: [
            '+ implementFeatures()',
            '+ reviewCode()',
        ],
        color: '#27AE60', // Green
        cx: 730,
        cy: 350,
        width: 230,
        height: 160,
        description: 'Inventory of languages, frameworks, databases, and operational tooling.',
    },
    {
        id: 'about',
        title: 'About',
        attributes: [
            '- background: String',
            '- philosophy: String',
        ],
        methods: [
            '+ solveProblems()',
            '+ analyzeRequirements()',
        ],
        color: '#F2C94C', // Yellow
        cx: 260,
        cy: 560,
        width: 230,
        height: 160,
        description: 'Personal background, engineering philosophy, and analytical approach to problem-solving.',
    },
    {
        id: 'contact',
        title: 'Contact',
        attributes: [
            '- email: String',
            '- channels: List<URL>',
        ],
        methods: [
            '+ initiateDiscussion()',
            '+ scheduleMeeting()',
        ],
        color: '#EB5757', // Red
        cx: 620,
        cy: 550,
        width: 230,
        height: 160,
        description: 'Communication channels for technical discussions, roles, and consulting inquiries.',
    }
];

export const ArchitectureSection: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);

    // Optimized grid style using linear gradients (no SVG DOM nodes)
    const gridStyle = React.useMemo(() => ({
        backgroundImage: `
            linear-gradient(to right, rgba(45, 108, 223, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(45, 108, 223, 0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(45, 108, 223, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(45, 108, 223, 0.25) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 200px 200px, 200px 200px'
    }), []);

    const centerNode = ARCHITECTURE_NODES.find(n => n.id === 'center')!;
    const peripheralNodes = ARCHITECTURE_NODES.filter(n => n.id !== 'center');

    return (
        <section
            id="architecture"
            className="relative w-full min-h-[900px] flex items-center justify-center py-24 overflow-hidden border-b border-border bg-[#F8FAFC]"
            aria-label="Architecture Overview"
        >
            {/* Blueprint gradient background CSS */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={gridStyle}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.15 }}
            />

            {/* Main Interactive Diagram Container */}
            <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto items-center justify-center -mt-10">

                {/* Top Left Label - Closer to Diagram */}
                <div className="w-[850px] max-w-full px-8 lg:px-0 mb-8 z-10">
                    <div className="font-mono text-[11px] lg:text-xs font-semibold tracking-[0.2em] text-[#2D6CDF]">
                        ARCHITECTURE OVERVIEW
                    </div>
                </div>

                {/* Diagram */}
                <motion.div
                    className="relative w-[850px] h-[650px] max-w-full transform scale-75 sm:scale-90 lg:scale-100 origin-center will-change-transform"
                    animate={{ x: hoveredNode ? -100 : 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* SVG Lines - rendered as a single SVG element */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 850 650">
                        {peripheralNodes.map((node) => {
                            const isHovered = hoveredNode?.id === node.id || hoveredNode?.id === 'center';
                            const isDimmed = hoveredNode && !isHovered && hoveredNode.id !== 'center' && hoveredNode.id !== node.id;

                            return (
                                <motion.line
                                    key={`line-${node.id}`}
                                    x1={centerNode.cx}
                                    y1={centerNode.cy}
                                    x2={node.cx}
                                    y2={node.cy}
                                    stroke={node.color}
                                    strokeWidth={isHovered ? 2 : 1.5}
                                    style={{
                                        filter: isHovered ? `drop-shadow(0 0 6px ${node.color})` : 'none',
                                    }}
                                    animate={{ opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6) }}
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.25, delay: 0.15, ease: "easeOut" }}
                                />
                            );
                        })}
                    </svg>

                    {/* HTML Nodes - Absolute positioned wrappers using transform instead of top/left animation */}
                    {ARCHITECTURE_NODES.map((node, i) => {
                        const isCenter = node.id === 'center';
                        const isHovered = hoveredNode?.id === node.id;
                        const isDimmed = hoveredNode && !isHovered;

                        // Strict 600ms bound sequence:
                        // Background (0ms - 150ms)
                        // Center node (100ms - 300ms)
                        // Lines (150ms - 400ms)
                        // Peripheral Nodes (250ms -> 250+60n)
                        const nodeDelay = isCenter ? 0.1 : 0.25 + (i - 1) * 0.06;

                        return (
                            <motion.div
                                key={node.id}
                                className="absolute flex flex-col border border-solid overflow-hidden cursor-pointer z-10 bg-white"
                                style={{
                                    left: node.cx,
                                    top: node.cy,
                                    x: "-50%",
                                    y: "-50%",
                                    minWidth: 220,
                                    borderWidth: '2px',
                                    borderColor: node.color,
                                    boxShadow: isHovered ? `0 0 20px ${node.color}30 inset, 0 0 15px ${node.color}40` : 'none',
                                }}
                                animate={{
                                    opacity: isDimmed ? 0.3 : 1,
                                    scale: isHovered && !isCenter ? 1.03 : 1
                                }}
                                initial={{ opacity: 0, scale: isCenter ? 0.95 : 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: isCenter ? 0.2 : 0.25,
                                    delay: nodeDelay,
                                    scale: { duration: 0.2 } // Hover scale transition
                                }}
                                onMouseEnter={() => setHoveredNode(node)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                {/* UML Class Header Compartment */}
                                <div
                                    className="w-full flex flex-col items-center justify-center py-2 px-3 border-b-2"
                                    style={{ backgroundColor: node.color, borderColor: node.color }}
                                >
                                    <span className="text-white font-bold text-[13px] tracking-wide uppercase transition-transform duration-200" style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
                                        {node.title}
                                    </span>
                                </div>

                                {/* UML Attributes Compartment */}
                                <div className="flex flex-col p-3 border-b border-gray-300">
                                    {node.attributes.map((attr, idx) => (
                                        <span key={idx} className="font-mono text-[11px] text-gray-700 leading-tight mb-1.5 last:mb-0 whitespace-nowrap">
                                            {attr}
                                        </span>
                                    ))}
                                </div>

                                {/* UML Methods Compartment */}
                                <div className="flex-1 flex flex-col p-3 bg-gray-50/50">
                                    {node.methods.map((method, idx) => (
                                        <span key={idx} className="font-mono text-[11px] font-semibold text-gray-900 leading-tight mb-1.5 last:mb-0 whitespace-nowrap">
                                            {method}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Detail Panel */}
                <AnimatePresence>
                    {hoveredNode && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute right-[-20px] lg:right-4 w-[280px] md:w-[320px] p-6 border-[2px] bg-white/95 backdrop-blur-md z-20 pointer-events-none shadow-card-hover will-change-transform"
                            style={{
                                borderColor: hoveredNode.color,
                            }}
                        >
                            <div className="font-mono text-[10px] mb-2 uppercase tracking-widest font-bold" style={{ color: hoveredNode.color }}>
                                Class Details
                            </div>
                            <h3 className="text-primary text-[17px] md:text-xl font-bold mb-4 border-b-2 pb-3 uppercase tracking-wide" style={{ borderColor: `${hoveredNode.color}40` }}>
                                {hoveredNode.title}
                            </h3>
                            <p className="text-secondary text-[13px] leading-relaxed">
                                {hoveredNode.description}
                            </p>
                            <div className="mt-5 border-t border-[#2D6CDF]/20 pt-3 flex justify-between items-center opacity-80">
                                <span className="font-mono text-[9px] text-[#2D6CDF] tracking-widest">STATUS: ONLINE</span>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: hoveredNode.color }}></span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};
