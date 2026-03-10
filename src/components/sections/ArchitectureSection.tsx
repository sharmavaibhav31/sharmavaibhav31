import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import architectureData from '../../data/architecture.json';

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

const ARCHITECTURE_NODES = architectureData as ArchitectureNode[];

export const ArchitectureDiagram: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);

    const centerNode = ARCHITECTURE_NODES.find(n => n.id === 'center')!;
    const peripheralNodes = ARCHITECTURE_NODES.filter(n => n.id !== 'center');

    const generateOrthogonalPath = (n1: ArchitectureNode, n2: ArchitectureNode) => {
        // Paths match the original 1200x900 absolute coordinate system.
        if (n2.id === 'projects') {
            const startY = n1.cy - (n1.height / 2);
            const endY = n2.cy + (n2.height / 2);
            return `M ${n1.cx} ${startY} L ${n2.cx} ${endY}`;
        }
        if (n2.id === 'experience') {
            const startX = n1.cx - (n1.width / 2);
            const endX = n2.cx + (n2.width / 2);
            const midX = endX + (startX - endX) / 2;
            return `M ${startX} ${n1.cy} H ${midX} V ${n2.cy} H ${endX}`;
        }
        if (n2.id === 'skills') {
            const startX = n1.cx + (n1.width / 2);
            const endX = n2.cx - (n2.width / 2);
            const midX = startX + (endX - startX) / 2;
            return `M ${startX} ${n1.cy} H ${midX} V ${n2.cy} H ${endX}`;
        }
        if (n2.id === 'about' || n2.id === 'contact') {
            const startY = n1.cy + (n1.height / 2);
            const endY = n2.cy - (n2.height / 2);
            const midY = startY + (endY - startY) / 2;
            return `M ${n1.cx} ${startY} V ${midY} H ${n2.cx} V ${endY}`;
        }
        return '';
    };

    const NodeCard = ({ node, index }: { node: ArchitectureNode, index: number }) => {
        const isCenter = node.id === 'center';
        const isHovered = hoveredNode?.id === node.id;

        return (
            <div
                className={`w-full h-full flex flex-col border border-solid shadow-sm relative pointer-events-auto transition-colors duration-300 ${isCenter ? 'bg-slate-50 dark:bg-[#0B1120]' : 'bg-white dark:bg-[#0F172A] cursor-pointer'}`}
                style={{
                    borderWidth: '2px',
                    borderColor: node.color,
                    boxShadow: isHovered ? `0 0 20px ${node.color}30 inset, 0 0 15px ${node.color}40` : 'none',
                    transform: isHovered && !isCenter ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                    if (!isCenter) {
                        const el = document.getElementById(node.id === 'experience' || node.id === 'contact' ? node.id : (node.id === 'projects' ? 'work' : node.id));
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
                <div
                    className="w-full flex items-center justify-center py-2.5 px-3 border-b-2"
                    style={{ backgroundColor: isCenter ? 'transparent' : `${node.color}15`, borderColor: node.color }}
                >
                    <span className={`font-bold text-[13px] tracking-widest uppercase ${isCenter ? 'text-slate-800 dark:text-white' : 'dark:text-white'}`} style={{ color: isCenter ? node.color : 'inherit' }}>
                        {node.title}
                    </span>
                </div>
                <div className="flex flex-col flex-1 p-3.5 bg-gray-50/30 dark:bg-slate-900/40 justify-center">
                    {node.attributes.map((attr, idx) => (
                        <span key={idx} className="font-mono text-[11.5px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed mb-1.5 last:mb-0 whitespace-nowrap overflow-hidden text-ellipsis">
                            {attr}
                        </span>
                    ))}
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                    {isHovered && !isCenter && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="hidden md:block absolute left-1/2 -bottom-3 translate-y-full -translate-x-1/2 w-[115%] p-3.5 bg-slate-800 dark:bg-black border border-slate-700 dark:border-white/20 text-white dark:text-white/90 text-[12.5px] leading-relaxed rounded-md shadow-2xl z-50 pointer-events-none text-center"
                        >
                            {node.description}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="w-full flex items-center justify-center pointer-events-none">

            {/* Desktop & Tablet Graph (md and above) */}
            <motion.svg
                className="hidden md:block w-full max-w-[1000px] h-auto pointer-events-none drop-shadow-sm origin-center"
                viewBox="0 0 1200 900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{ overflow: 'visible' }}
            >
                <defs>
                    {peripheralNodes.map((node) => (
                        <marker
                            key={`arrow-${node.id}`}
                            id={`arrow-${node.id}`}
                            viewBox="0 0 10 10"
                            refX="10"
                            refY="5"
                            markerWidth="5"
                            markerHeight="5"
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
                                    transition: 'stroke-width 0.2s ease'
                                }}
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6) }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                            {!isDimmed && (
                                <circle r="4.5" fill={node.color} style={{ filter: `drop-shadow(0 0 4px ${node.color})` }}>
                                    <animateMotion dur={`${2.5 + Math.random() * 1.5}s`} repeatCount="indefinite" path={pathD} />
                                </circle>
                            )}
                        </g>
                    );
                })}

                {/* Draw HTML Nodes inside SVG via foreignObject */}
                {ARCHITECTURE_NODES.map((node, i) => {
                    const isHovered = hoveredNode?.id === node.id;
                    const isDimmed = hoveredNode && !isHovered && node.id !== 'center';
                    // Provide extra padding around foreignObject to prevent tooltip/shadow clipping
                    const paddingX = 100;
                    const paddingY = 150;

                    return (
                        <foreignObject
                            key={node.id}
                            x={node.cx - (node.width / 2) - paddingX}
                            y={node.cy - (node.height / 2) - paddingY}
                            width={node.width + paddingX * 2}
                            height={node.height + paddingY * 2}
                            style={{ overflow: 'visible' }}
                        >
                            <div className="w-full h-full flex justify-center items-center pointer-events-none">
                                <motion.div
                                    className="pointer-events-auto"
                                    style={{ width: node.width, height: node.height }}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    animate={{ opacity: isDimmed ? 0.4 : 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                                >
                                    <motion.div
                                        className="w-full h-full"
                                        animate={{ y: isHovered ? -5 : [0, -4, 0] }}
                                        transition={{
                                            y: {
                                                duration: isHovered ? 0.2 : 3 + (i % 3),
                                                repeat: isHovered ? 0 : Infinity,
                                                ease: "easeInOut"
                                            }
                                        }}
                                    >
                                        <NodeCard node={node} index={i} />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </foreignObject>
                    )
                })}
            </motion.svg>

            {/* Mobile Vertical Simplified Layout (sm and below) */}
            <div className="flex md:hidden flex-col items-center w-full space-y-0 pointer-events-auto max-w-[340px] relative z-10">
                <div style={{ width: '100%', height: centerNode.height * 0.9 }}>
                    <NodeCard node={centerNode} index={0} />
                </div>

                {peripheralNodes.map((node, i) => (
                    <React.Fragment key={`mobile-${node.id}`}>
                        <div className="relative flex flex-col items-center justify-center py-3">
                            {/* Vertical connector */}
                            <motion.div
                                className="w-0.5 h-6 opacity-60 rounded-full bg-slate-400 dark:bg-slate-600"
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{ height: 24, opacity: 0.7 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            />
                            {/* Traveling dot simulation */}
                            <motion.div
                                className="absolute w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: node.color }}
                                animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                            />
                        </div>
                        <div className="w-full" style={{ height: node.height * 0.9 }}>
                            <NodeCard node={node} index={i + 1} />
                        </div>
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
};
