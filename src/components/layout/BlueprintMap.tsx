import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Node } from '../ui/Node';
import type { AssemblyState } from '../../hooks/useBlueprintAssembly';

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
    assembly: AssemblyState;
}

export const BlueprintMap: React.FC<BlueprintMapProps> = ({
    nodes,
    connections,
    activeNodeId,
    onNodeClick,
    assembly,
}) => {
    const connectionPaths = useMemo(() => {
        return connections.map((conn) => {
            const start = nodes.find(n => n.id === conn.from);
            const end = nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;
            return { conn, start, end };
        }).filter(Boolean) as { conn: Connection; start: MapNode; end: MapNode }[];
    }, [connections, nodes]);

    // Separate central node from peripheral nodes
    const centralNode = nodes.find(n => n.type === 'root');
    const peripheralNodes = nodes.filter(n => n.type !== 'root');

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
                    const dx = (end.x - start.x);
                    const dy = (end.y - start.y);
                    const length = Math.sqrt(dx * dx + dy * dy) * 10;

                    // During assembly: lines draw from center outward
                    const lineVariants = assembly.reducedMotion
                        ? {
                            hidden: { strokeDashoffset: 0, opacity: 0.5 },
                            visible: { strokeDashoffset: 0, opacity: 0.5 },
                        }
                        : {
                            hidden: { strokeDashoffset: length, opacity: 0 },
                            visible: {
                                strokeDashoffset: 0,
                                opacity: 0.5,
                                transition: {
                                    duration: 0.25,
                                    delay: 0.02 * index,
                                    ease: 'easeOut' as const,
                                },
                            },
                        };

                    return (
                        <React.Fragment key={`${conn.from}-${conn.to}`}>
                            {/* Base dashed line (always visible once lines start) */}
                            <motion.line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="#1e3a8a"
                                strokeWidth="1"
                                strokeDasharray="6,6"
                                initial={assembly.reducedMotion ? { opacity: 0.3 } : { opacity: 0 }}
                                animate={assembly.linesDrawing ? { opacity: 0.3 } : { opacity: 0 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                            />

                            {/* Animated path-draw line */}
                            <motion.line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="#1e3a8a"
                                strokeWidth="1"
                                strokeDasharray={length}
                                variants={lineVariants}
                                initial={assembly.reducedMotion ? 'visible' : 'hidden'}
                                animate={assembly.linesDrawing ? 'visible' : 'hidden'}
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

            {/* Peripheral Nodes — appear staggered at 250ms mark */}
            {peripheralNodes.map((node, index) => (
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
                    assemblyVisible={assembly.peripheralNodes}
                    assemblyDelay={assembly.reducedMotion ? 0 : 0.04 * index}
                    reducedMotion={assembly.reducedMotion}
                    isCentral={false}
                />
            ))}

            {/* Central Node — appears last at ~550ms */}
            {centralNode && (
                <Node
                    key={centralNode.id}
                    id={centralNode.id}
                    label={centralNode.label}
                    x={centralNode.x}
                    y={centralNode.y}
                    icon={centralNode.icon}
                    isActive={activeNodeId === centralNode.id}
                    onClick={onNodeClick}
                    tooltip={centralNode.tooltip}
                    assemblyVisible={assembly.centralNode}
                    assemblyDelay={0}
                    reducedMotion={assembly.reducedMotion}
                    isCentral={true}
                />
            )}
        </div>
    );
};
