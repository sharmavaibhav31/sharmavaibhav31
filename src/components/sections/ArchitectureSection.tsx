import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NodeId = 'center' | 'projects' | 'experience' | 'skills' | 'about' | 'contact';

type ArchitectureNode = {
    id: NodeId;
    label: string | string[];
    cx: number;
    cy: number;
    width: number;
    height: number;
    description: string;
};

const nodes: ArchitectureNode[] = [
    {
        id: 'center',
        label: ['Vaibhav Sharma', 'Systems / Backend Engineer'],
        cx: 325,
        cy: 250,
        width: 260,
        height: 74,
        description: 'System Root: Orchestrating backend architecture, API design, and production-grade software deployments.',
    },
    {
        id: 'projects',
        label: 'Projects',
        cx: 325,
        cy: 60,
        width: 140,
        height: 46,
        description: 'Repository of robust systems, APIs, and scalable infrastructure deployments.',
    },
    {
        id: 'experience',
        label: 'Experience',
        cx: 90,
        cy: 180,
        width: 140,
        height: 46,
        description: 'Professional timeline recounting engineering roles and critical system ownership.',
    },
    {
        id: 'skills',
        label: 'Skills & Tech Stack',
        cx: 560,
        cy: 180,
        width: 180,
        height: 46,
        description: 'Inventory of languages, frameworks, databases, and operational tooling.',
    },
    {
        id: 'about',
        label: 'About',
        cx: 150,
        cy: 420,
        width: 140,
        height: 46,
        description: 'Personal background, engineering philosophy, and analytical approach to problem-solving.',
    },
    {
        id: 'contact',
        label: 'Contact',
        cx: 500,
        cy: 420,
        width: 140,
        height: 46,
        description: 'Communication channels for technical discussions, roles, and consulting inquiries.',
    }
];

export const ArchitectureSection: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);

    return (
        <section
            id="architecture"
            className="relative w-full min-h-[800px] flex items-center justify-center py-24 overflow-hidden border-b border-[#2D6CDF]/20"
            style={{ backgroundColor: '#071A2F' }}
            aria-label="Architecture Overview"
        >
            {/* Blueprint grid background */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D6CDF" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                        <pattern id="blueprint-grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
                            <rect width="200" height="200" fill="url(#blueprint-grid)" />
                            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#2D6CDF" strokeWidth="1" opacity="0.4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprint-grid-large)" />
                </svg>
            </motion.div>

            {/* Top Left Label */}
            <div className="absolute top-10 left-10 lg:left-12 z-10 font-mono text-[11px] lg:text-xs font-semibold tracking-[0.2em] text-[#2D6CDF]">
                ARCHITECTURE OVERVIEW
            </div>

            {/* Main Interactive Diagram Container */}
            <div className="relative z-10 flex w-full max-w-7xl mx-auto items-center justify-center">

                {/* Diagram */}
                <motion.div
                    className="relative w-[650px] h-[500px]"
                    animate={{ x: hoveredNode ? -160 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* SVG Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 650 500">
                        {nodes.filter(n => n.id !== 'center').map((node, i) => {
                            const center = nodes.find(n => n.id === 'center')!;
                            const isHovered = hoveredNode?.id === node.id || hoveredNode?.id === 'center';
                            const isDimmed = hoveredNode && !isHovered && hoveredNode.id !== 'center' && hoveredNode.id !== node.id;

                            return (
                                <motion.line
                                    key={`line-${node.id}`}
                                    x1={center.cx}
                                    y1={center.cy}
                                    x2={node.cx}
                                    y2={node.cy}
                                    stroke="#2D6CDF"
                                    strokeWidth={isHovered ? 2 : 1.5}
                                    className="transition-all duration-300"
                                    style={{
                                        filter: isHovered ? 'drop-shadow(0 0 4px rgba(45,108,223,0.8))' : 'none',
                                        opacity: isDimmed ? 0.15 : 1
                                    }}
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                                />
                            );
                        })}
                    </svg>

                    {/* HTML Nodes */}
                    {nodes.map((node, i) => {
                        const isCenter = node.id === 'center';
                        const isHovered = hoveredNode?.id === node.id;
                        const isDimmed = hoveredNode && !isHovered;

                        return (
                            <motion.div
                                key={node.id}
                                className="absolute flex flex-col items-center justify-center border cursor-pointer transition-all duration-300 z-10"
                                style={{
                                    left: node.cx,
                                    top: node.cy,
                                    width: node.width,
                                    height: node.height,
                                    x: '-50%',
                                    y: '-50%',
                                    backgroundColor: '#071A2F',
                                    borderColor: isHovered ? '#61dca3' : '#2D6CDF',
                                    opacity: isDimmed ? 0.3 : 1,
                                    boxShadow: isHovered ? '0 0 12px rgba(97,220,163,0.15) inset, 0 0 8px rgba(97,220,163,0.3)' : 'none',
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{
                                    duration: 0.4,
                                    delay: isCenter ? 0.1 : 0.4 + (i - 1) * 0.08
                                }}
                                onMouseEnter={() => setHoveredNode(node)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                {isCenter ? (
                                    <div className="text-center transition-colors duration-300">
                                        <div className={`font-semibold text-sm tracking-wide ${isHovered ? 'text-white' : 'text-[#CFE3FF]'}`}>
                                            {(node.label as string[])[0]}
                                        </div>
                                        <div className={`text-xs mt-1 ${isHovered ? 'text-[#61dca3]' : 'text-[#2D6CDF]'}`}>
                                            {(node.label as string[])[1]}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#CFE3FF]'}`}>
                                        {node.label}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Detail Panel */}
                <AnimatePresence>
                    {hoveredNode && (
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="absolute right-4 lg:right-12 xl:right-24 w-[280px] md:w-[320px] p-8 border border-[#2D6CDF] bg-[#071A2F]/95 backdrop-blur-md z-20 pointer-events-none"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
                            }}
                        >
                            <div className="font-mono text-[10px] text-[#2D6CDF] mb-3 uppercase tracking-widest">
                                Node Details
                            </div>
                            <h3 className="text-[#CFE3FF] text-lg md:text-xl font-semibold mb-4 border-b border-[#2D6CDF]/30 pb-3">
                                {Array.isArray(hoveredNode.label) ? 'System Root' : hoveredNode.label}
                            </h3>
                            <p className="text-[#CFE3FF]/70 text-sm leading-loose">
                                {hoveredNode.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};
