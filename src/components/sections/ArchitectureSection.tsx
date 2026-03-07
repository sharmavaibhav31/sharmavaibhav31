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

// Extracted globally to prevent re-creation on render
const ARCHITECTURE_NODES: ArchitectureNode[] = [
    {
        id: 'center',
        label: ['Vaibhav Sharma', 'Systems / Backend Engineer'],
        cx: 425,
        cy: 325,
        width: 320,
        height: 100,
        description: 'System Root: Orchestrating backend architecture, API design, and production-grade software deployments.',
    },
    {
        id: 'projects',
        label: 'Projects',
        cx: 400,
        cy: 90,
        width: 200,
        height: 70,
        description: 'Repository of robust systems, APIs, and scalable infrastructure deployments.',
    },
    {
        id: 'experience',
        label: 'Experience',
        cx: 120,
        cy: 300,
        width: 200,
        height: 70,
        description: 'Professional timeline recounting engineering roles and critical system ownership.',
    },
    {
        id: 'skills',
        label: 'Skills & Tech Stack',
        cx: 730,
        cy: 350,
        width: 220,
        height: 70,
        description: 'Inventory of languages, frameworks, databases, and operational tooling.',
    },
    {
        id: 'about',
        label: 'About',
        cx: 260,
        cy: 560,
        width: 200,
        height: 70,
        description: 'Personal background, engineering philosophy, and analytical approach to problem-solving.',
    },
    {
        id: 'contact',
        label: 'Contact',
        cx: 620,
        cy: 540,
        width: 200,
        height: 70,
        description: 'Communication channels for technical discussions, roles, and consulting inquiries.',
    }
];

export const ArchitectureSection: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);

    // Optimized grid style using linear gradients (no SVG DOM nodes)
    const gridStyle = React.useMemo(() => ({
        backgroundColor: '#071A2F',
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
            className="relative w-full min-h-[900px] flex items-center justify-center py-24 overflow-hidden border-b border-[#2D6CDF]/20"
            style={{ backgroundColor: '#071A2F' }}
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
                                    stroke={isHovered ? '#61dca3' : '#2D6CDF'}
                                    strokeWidth={1.5}
                                    style={{
                                        filter: isHovered ? 'drop-shadow(0 0 6px rgba(97,220,163,0.8))' : 'none',
                                    }}
                                    animate={{ opacity: isDimmed ? 0.2 : 1 }}
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
                                className="absolute flex flex-col border border-solid overflow-hidden cursor-pointer z-10 bg-[#071A2F]"
                                style={{
                                    left: node.cx - node.width / 2,
                                    top: node.cy - node.height / 2,
                                    width: node.width,
                                    height: node.height,
                                    borderWidth: '1.5px',
                                    borderColor: isHovered ? '#61dca3' : '#2D6CDF',
                                    boxShadow: isHovered ? '0 0 15px rgba(97,220,163,0.15) inset, 0 0 10px rgba(97,220,163,0.2)' : 'none',
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
                                {isCenter ? (
                                    <div className="flex flex-col w-full h-full text-center">
                                        <div className="flex-1 flex items-center justify-center border-b-[1.5px] border-[#2D6CDF]/70 px-4">
                                            <div className={`font-bold text-lg tracking-wide transition-colors duration-200 ${isHovered ? 'text-white' : 'text-[#CFE3FF]'}`}>
                                                {(node.label as string[])[0]}
                                            </div>
                                        </div>
                                        <div className="h-[38px] flex items-center justify-center bg-[#2D6CDF]/[0.03]">
                                            <div className={`text-sm font-semibold tracking-wider transition-colors duration-200 ${isHovered ? 'text-[#61dca3]' : 'text-[#2D6CDF]'}`}>
                                                {(node.label as string[])[1]}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col w-full h-full text-center">
                                        <div className="h-[38px] flex items-center justify-center border-b-[1.5px] border-[#2D6CDF]/70 px-2 bg-[#2D6CDF]/[0.08]">
                                            <div className={`text-[13px] font-bold tracking-wide uppercase transition-colors duration-200 ${isHovered ? 'text-white' : 'text-[#CFE3FF]'}`}>
                                                {node.label}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-2 flex items-center justify-center bg-[#2D6CDF]/[0.02]">
                                            <span className={`text-[10px] font-mono tracking-[0.2em] transition-colors duration-200 ${isHovered ? 'text-[#61dca3]' : 'text-[#2D6CDF]/60'}`}>
                                                [{node.id.toUpperCase()}]
                                            </span>
                                        </div>
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
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute right-[-20px] lg:right-4 w-[280px] md:w-[320px] p-6 border-[1.5px] border-[#2D6CDF] bg-[#071A2F]/95 backdrop-blur-md z-20 pointer-events-none shadow-2xl will-change-transform"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
                            }}
                        >
                            <div className="font-mono text-[10px] text-[#2D6CDF] mb-2 uppercase tracking-widest font-semibold">
                                Node Details
                            </div>
                            <h3 className="text-[#CFE3FF] text-[17px] md:text-xl font-bold mb-4 border-b-[1.5px] border-[#2D6CDF]/30 pb-3 uppercase tracking-wide">
                                {Array.isArray(hoveredNode.label) ? 'System Root' : hoveredNode.label}
                            </h3>
                            <p className="text-[#CFE3FF]/75 text-[13px] leading-loose">
                                {hoveredNode.description}
                            </p>
                            <div className="mt-5 border-t border-[#2D6CDF]/20 pt-3 flex justify-between items-center opacity-60">
                                <span className="font-mono text-[9px] text-[#2D6CDF] tracking-widest">STATUS: SYSTEM_ONLINE</span>
                                <span className="w-2 h-2 rounded-full bg-[#61dca3] animate-pulse"></span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};
