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

import architectureData from '../../data/architecture.json';

// Load dynamic architecture data from JSON file
const ARCHITECTURE_NODES = architectureData as ArchitectureNode[];

export const ArchitectureDiagram: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);

    const centerNode = ARCHITECTURE_NODES.find(n => n.id === 'center')!;
    const peripheralNodes = ARCHITECTURE_NODES.filter(n => n.id !== 'center');

    const generateOrthogonalPath = (n1: ArchitectureNode, n2: ArchitectureNode) => {
        // n1 is ALWAYS SystemRoot (center) at cx: 600, cy: 450

        if (n2.id === 'projects') {
            const startY = n1.cy - (n1.height / 2) - 5;
            const endY = n2.cy + (n2.height / 2) + 5;
            return `M ${n1.cx} ${startY} L ${n2.cx} ${endY}`;
        }

        if (n2.id === 'experience') {
            const startX = n1.cx - (n1.width / 2) - 5;
            const endX = n2.cx + (n2.width / 2) + 5;
            const midX = endX + (startX - endX) / 2;
            return `M ${startX} ${n1.cy} H ${midX} V ${n2.cy} H ${endX}`;
        }

        if (n2.id === 'skills') {
            const startX = n1.cx + (n1.width / 2) + 5;
            const endX = n2.cx - (n2.width / 2) - 5;
            const midX = startX + (endX - startX) / 2;
            return `M ${startX} ${n1.cy} H ${midX} V ${n2.cy} H ${endX}`;
        }

        if (n2.id === 'about' || n2.id === 'contact') {
            // Drop down from center, then branch left/right into a T-junction
            const startY = n1.cy + (n1.height / 2) + 5;
            const endY = n2.cy - (n2.height / 2) - 5;
            const midY = startY + (endY - startY) / 2;
            return `M ${n1.cx} ${startY} V ${midY} H ${n2.cx} V ${endY}`;
        }

        return '';
    };

    return (
        <div className="relative z-10 w-[650px] h-[500px] flex items-center justify-center pointer-events-auto">

            {/* Diagram */}
            <motion.div
                className="relative w-[1200px] h-[900px] transform scale-[0.60] sm:scale-[0.75] lg:scale-[0.80] origin-center will-change-transform"
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* SVG Lines - rendered as a single SVG element */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 900">
                    <defs>
                        {peripheralNodes.map((node) => (
                            <marker
                                key={`arrow-${node.id}`}
                                id={`arrow-${node.id}`}
                                viewBox="0 0 10 10"
                                refX="10"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                            >
                                <path d="M 0 0 L 10 5 L 0 10 z" fill={node.color} />
                            </marker>
                        ))}
                    </defs>
                    {peripheralNodes.map((node) => {
                        const isHovered = hoveredNode?.id === node.id || hoveredNode?.id === 'center';
                        const isDimmed = hoveredNode && !isHovered && hoveredNode.id !== 'center' && hoveredNode.id !== node.id;
                        const pathD = generateOrthogonalPath(centerNode, node);

                        return (
                            <g key={`connection-${node.id}`}>
                                <motion.path
                                    d={pathD}
                                    fill="none"
                                    stroke={node.color}
                                    strokeWidth={isHovered ? 4 : 2}
                                    markerEnd={`url(#arrow-${node.id})`}
                                    style={{
                                        filter: isHovered ? `drop-shadow(0 0 8px ${node.color}80)` : 'none',
                                    }}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6) }}
                                    animate={{
                                        opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6)
                                    }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                                {/* Traveling Network Dot */}
                                {!isDimmed && (
                                    <circle r="4" fill={node.color} style={{ filter: `drop-shadow(0 0 4px ${node.color})` }}>
                                        <animateMotion dur={`${2.5 + Math.random()}s`} repeatCount="indefinite" path={pathD} />
                                    </circle>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* HTML Nodes - Absolute positioned wrappers using transform instead of top/left animation */}
                {ARCHITECTURE_NODES.map((node, i) => {
                    const isCenter = node.id === 'center';
                    const isHovered = hoveredNode?.id === node.id;
                    const isDimmed = hoveredNode && !isHovered;

                    return (
                        <div
                            key={node.id}
                            className={`absolute z-10 ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                            style={{
                                left: node.cx - node.width / 2,
                                top: node.cy - node.height / 2,
                                width: node.width,
                                height: node.height,
                            }}
                            onMouseEnter={() => setHoveredNode(node)}
                            onMouseLeave={() => setHoveredNode(null)}
                            onClick={() => {
                                // Smooth scroll to the corresponding section if available
                                if (!isCenter) {
                                    const el = document.getElementById(node.id === 'experience' || node.id === 'contact' ? node.id : (node.id === 'projects' ? 'work' : node.id));
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                            }}
                        >
                            <motion.div
                                className="w-full h-full flex flex-col border border-solid overflow-visible bg-white dark:bg-[#0B1120] shadow-sm relative"
                                style={{
                                    borderWidth: '2px',
                                    borderColor: node.color,
                                    boxShadow: isHovered ? `0 0 20px ${node.color}30 inset, 0 0 15px ${node.color}40` : 'none',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                animate={{
                                    y: isHovered ? -8 : [0, -6, 0],
                                    opacity: isDimmed ? 0.35 : 1,
                                    scale: isHovered ? 1.05 : 1,
                                }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    y: {
                                        duration: isHovered ? 0.2 : (3.5 + (i % 3)),
                                        repeat: isHovered ? 0 : Infinity,
                                        ease: "easeInOut"
                                    },
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.2, type: 'spring', stiffness: 300 }
                                }}
                            >
                                {/* UML Class Header Compartment */}
                                <div
                                    className="w-full flex items-center justify-center py-2.5 px-4 border-b-2"
                                    style={{ backgroundColor: isCenter ? 'transparent' : `${node.color}15`, borderColor: node.color }}
                                >
                                    <span className={`font-bold text-[14px] tracking-widest uppercase ${isCenter ? '' : 'dark:text-white'}`} style={{ color: isCenter ? node.color : 'inherit' }}>
                                        {node.title}
                                    </span>
                                </div>

                                {/* Pseudo-fields Compartment */}
                                <div className="flex flex-col flex-1 p-4 bg-gray-50/50 dark:bg-slate-900/50">
                                    {node.attributes.map((attr, idx) => (
                                        <span key={idx} className="font-mono text-[12.5px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed mb-2 last:mb-0 whitespace-nowrap">
                                            {attr}
                                        </span>
                                    ))}
                                </div>

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-1/2 -bottom-2 translate-y-full -translate-x-1/2 w-64 p-3.5 bg-slate-800 dark:bg-black border border-slate-700 dark:border-white/20 text-white dark:text-white/90 text-[13px] leading-relaxed rounded-md shadow-2xl z-50 pointer-events-none text-center"
                                        >
                                            {node.description}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>

        </div>
    );
};
