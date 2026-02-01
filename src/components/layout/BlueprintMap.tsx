import React from 'react';
import { BlueprintBackground } from './BlueprintBackground';
import { Node } from '../ui/Node';

export interface MapNode {
    id: string;
    label: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    icon?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'root';
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
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden blueprint-grid">
            <div className="absolute inset-0 bg-blueprint-dark/90 -z-10" />

            <BlueprintBackground />

            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 text-line-blueprint">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {connections.map((conn) => {
                    const start = nodes.find(n => n.id === conn.from);
                    const end = nodes.find(n => n.id === conn.to);
                    if (!start || !end) return null;

                    const isRelatedToActive = activeNodeId && (activeNodeId === conn.from || activeNodeId === conn.to);

                    return (
                        <React.Fragment key={`${conn.from}-${conn.to}`}>
                            {/* Background Line */}
                            <line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                                className="opacity-30"
                            />

                            {/* Animated Connection Line */}
                            <line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="#1e293b"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                            >
                                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="20s" repeatCount="indefinite" />
                            </line>

                            {/* Active Highlight Line */}
                            <line
                                x1={`${start.x}%`}
                                y1={`${start.y}%`}
                                x2={`${end.x}%`}
                                y2={`${end.y}%`}
                                stroke="#06b6d4"
                                strokeWidth={isRelatedToActive ? 2 : 0}
                                strokeOpacity={isRelatedToActive ? 0.8 : 0}
                                className="transition-all duration-500"
                                filter="url(#glow)"
                            />
                        </React.Fragment>
                    );
                })}
            </svg>

            {/* Nodes Layer */}
            {nodes.map(node => (
                <Node
                    key={node.id}
                    id={node.id}
                    label={node.label}
                    x={node.x}
                    y={node.y}
                    icon={node.icon}
                    isActive={activeNodeId === node.id}
                    onClick={onNodeClick}
                />
            ))}

            {/* Decorative Grid Markers */}
            <div className="absolute top-10 left-10 text-[10px] font-mono text-line-blueprint">
                GRID_SYS_RDY<br />
                COORD: 34.55.12
            </div>
            <div className="absolute bottom-10 right-10 text-[10px] font-mono text-line-blueprint text-right">
                RENDER_ENGINE: VITE<br />
                FPS: 60
            </div>
        </div>
    );
};
