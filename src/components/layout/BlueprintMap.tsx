import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Node } from '../ui/Node';

export interface MapNode {
    id: string;
    label: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    icon?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'root';
    tooltip?: string;
}

export interface Connection {
    from: string;
    to: string;
}

interface BlueprintMapProps {
    nodes: MapNode[];
    connections: Connection[];
    activeNodeId: string | null;
    onNodeClick: (id: string) => void;
}

export const BlueprintMap: React.FC<BlueprintMapProps> = ({ nodes, connections, activeNodeId, onNodeClick }) => {
    // Memoize connection paths for performance
    const connectionPaths = useMemo(() => {
        return connections.map((conn) => {
            const start = nodes.find(n => n.id === conn.from);
            const end = nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;
            return { conn, start, end };
        }).filter(Boolean) as { conn: Connection; start: MapNode; end: MapNode }[];
    }, [connections, nodes]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {connectionPaths.map(({ conn, start, end }, index) => {
                    const isRelatedToActive = activeNodeId && (activeNodeId === conn.from || activeNodeId === conn.to);

                    // Calculate line length for dash animation
                    const dx = (end.x - start.x);
                    const dy = (end.y - start.y);
                    const length = Math.sqrt(dx * dx + dy * dy) * 10; // Approximate pixel length

                    return (
                        <React.Fragment key={`${conn.from}-${conn.to}`}>
                            {/* Base dashed line */}
                            <line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="#1e3a8a"
                                strokeWidth="1"
                                strokeDasharray="6,6"
                                opacity={0.3}
                            />

                            {/* Animated path-draw line on load */}
                            <motion.line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="#1e3a8a"
                                strokeWidth="1"
                                strokeDasharray={length}
                                initial={{ strokeDashoffset: length }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.1 * index,
                                    ease: "easeOut"
                                }}
                                opacity={0.5}
                            />

                            {/* Active highlight */}
                            <motion.line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="#06b6d4"
                                strokeWidth={isRelatedToActive ? 2 : 0}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isRelatedToActive ? 0.7 : 0 }}
                                transition={{ duration: 0.2 }}
                                filter="url(#glow)"
                            />
                        </React.Fragment>
                    );
                })}
            </svg>

            {/* Nodes Layer */}
            {nodes.map((node, index) => (
                <Node
                    key={node.id}
                    id={node.id}
                    label={node.label}
                    x={node.x}
                    y={node.y}
                    icon={node.icon}
                    isActive={activeNodeId === node.id}
                    onClick={onNodeClick}
                    tooltip={node.tooltip}
                    index={index}
                />
            ))}
        </div>
    );
};
