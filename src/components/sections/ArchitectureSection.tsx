import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
                className="relative w-[1200px] h-[900px] transform scale-[0.40] sm:scale-[0.55] lg:scale-[0.65] origin-center will-change-transform"
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* SVG Lines - rendered as a single SVG element */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 900">
                    {peripheralNodes.map((node) => {
                        const isHovered = hoveredNode?.id === node.id || hoveredNode?.id === 'center';
                        const isDimmed = hoveredNode && !isHovered && hoveredNode.id !== 'center' && hoveredNode.id !== node.id;

                        return (
                            <motion.path
                                key={`line-${node.id}`}
                                d={generateOrthogonalPath(centerNode, node)}
                                fill="none"
                                stroke={node.color}
                                strokeWidth={isHovered ? 3 : 2}
                                style={{
                                    filter: isHovered ? `drop-shadow(0 0 6px ${node.color})` : 'none',
                                }}
                                animate={{ opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6) }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6) }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            />
                        );
                    })}
                </svg>

                {/* HTML Nodes - Absolute positioned wrappers using transform instead of top/left animation */}
                {ARCHITECTURE_NODES.map((node, i) => {
                    const isCenter = node.id === 'center';
                    const isHovered = hoveredNode?.id === node.id;
                    const isDimmed = hoveredNode && !isHovered;

                    const nodeDelay = isCenter ? 0.3 : 0.45 + (i - 1) * 0.08;

                    return (
                        <motion.div
                            key={node.id}
                            className="absolute flex flex-col border border-solid overflow-hidden cursor-pointer z-10 bg-white shadow-sm"
                            style={{
                                left: node.cx - node.width / 2,
                                top: node.cy - node.height / 2,
                                width: node.width,
                                borderWidth: '2px',
                                borderColor: node.color,
                                boxShadow: isHovered ? `0 0 20px ${node.color}30 inset, 0 0 15px ${node.color}40` : 'none',
                            }}
                            animate={{
                                opacity: isDimmed ? 0.3 : 1,
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: isCenter ? 0.2 : 0.25,
                                delay: nodeDelay,
                            }}
                            onMouseEnter={() => setHoveredNode(node)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            {/* UML Class Header Compartment */}
                            <div
                                className="w-full flex flex-col items-center justify-center py-2.5 px-4 border-b-2"
                                style={{ backgroundColor: node.color, borderColor: node.color }}
                            >
                                <span className="text-white font-bold text-[15px] tracking-wide uppercase">
                                    {node.title}
                                </span>
                            </div>

                            {/* UML Attributes Compartment */}
                            <div className="flex flex-col p-4 border-b border-gray-300">
                                {node.attributes.map((attr, idx) => (
                                    <span key={idx} className="font-mono text-[13px] text-gray-700 leading-relaxed mb-2 last:mb-0 whitespace-nowrap">
                                        {attr}
                                    </span>
                                ))}
                            </div>

                            {/* UML Methods Compartment */}
                            <div className="flex-1 flex flex-col p-4 bg-gray-50/50">
                                {node.methods.map((method, idx) => (
                                    <span key={idx} className="font-mono text-[13px] font-semibold text-gray-900 leading-relaxed mb-2 last:mb-0 whitespace-nowrap">
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

        </div>
    );
};
