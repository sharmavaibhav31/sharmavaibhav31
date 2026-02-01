import React from 'react';

export const BlueprintBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden opacity-20 select-none">
            <svg className="w-full h-full text-line-blueprint" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id="small-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <rect width="100" height="100" fill="url(#small-grid)" />
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                    </marker>
                </defs>

                {/* Base Grid */}
                <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

                {/* Abstract System Architecture Schematic */}

                {/* Load Balancer Zone (Top Left) */}
                <g transform="translate(100, 100)" className="hidden lg:block">
                    <rect x="0" y="0" width="200" height="100" stroke="currentColor" fill="none" strokeDasharray="5,5" />
                    <text x="10" y="-10" fill="currentColor" fontFamily="monospace" fontSize="10">VPC_REGION_US_EAST</text>

                    {/* LB Icon */}
                    <circle cx="100" cy="50" r="20" stroke="currentColor" fill="none" />
                    <path d="M85,50 L115,50 M100,35 L100,65" stroke="currentColor" />
                    <text x="130" y="55" fill="currentColor" fontFamily="monospace" fontSize="8">ELB_01</text>

                    {/* Dimensions */}
                    <line x1="0" y1="110" x2="200" y2="110" stroke="currentColor" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
                    <text x="80" y="125" fill="currentColor" fontFamily="monospace" fontSize="8">LOAD_BALANCING</text>
                </g>

                {/* Container Orchestration (Right Side) */}
                <g transform="translate(80, 50)" className="rotate-90 origin-center lg:rotate-0 lg:translate-[60%] lg:translate-x-1/2 lg:y-20">
                    {/* Position adjusted via CSS classes mostly or responsive JS, but hardcoded SVG coords for bg is fine for this abstract art */}
                </g>

                {/* Drawing a large decorative architectural block on the right */}
                <g transform="translate(800, 200)" className="hidden xl:block">
                    <path d="M0,0 L300,0 L300,400 L0,400 Z" stroke="currentColor" fill="none" strokeWidth="1" />
                    <path d="M10,10 L290,10 L290,390 L10,390 Z" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="2,2" />
                    <text x="20" y="30" fill="currentColor" fontFamily="monospace" fontSize="12">KUBERNETES_CLUSTER_V1.28</text>

                    {/* Pods */}
                    <rect x="30" y="60" width="60" height="60" stroke="currentColor" fill="none" />
                    <rect x="110" y="60" width="60" height="60" stroke="currentColor" fill="none" />
                    <rect x="190" y="60" width="60" height="60" stroke="currentColor" fill="none" />

                    <line x1="60" y1="120" x2="60" y2="150" stroke="currentColor" />
                    <line x1="140" y1="120" x2="140" y2="150" stroke="currentColor" />
                    <line x1="220" y1="120" x2="220" y2="150" stroke="currentColor" />

                    <rect x="30" y="150" width="220" height="40" stroke="currentColor" fill="none" />
                    <text x="100" y="175" fill="currentColor" fontFamily="monospace" fontSize="10">SERVICE_MESH_LAYER</text>
                </g>

                {/* Database Layer (Bottom Left) */}
                <g transform="translate(150, 600)" className="hidden lg:block">
                    <ellipse cx="50" cy="20" rx="40" ry="10" stroke="currentColor" fill="none" />
                    <path d="M10,20 L10,80 A40,10 0 0 0 90,80 L90,20" stroke="currentColor" fill="none" />
                    <ellipse cx="50" cy="80" rx="40" ry="10" stroke="currentColor" fill="none" opacity="0.5" />

                    <text x="0" y="110" fill="currentColor" fontFamily="monospace" fontSize="10">PRIMARY_DB_SHARD</text>

                    {/* Connecting lines */}
                    <path d="M50,0 L50,-100 L200,-100" stroke="currentColor" fill="none" strokeDasharray="4,4" />
                </g>

                {/* Random Technical Markers */}
                <g opacity="0.7">
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeDasharray="10,10" strokeWidth="0.5" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeDasharray="10,10" strokeWidth="0.5" />

                    <text x="10" y="98%" fill="currentColor" fontFamily="monospace" fontSize="10">ARCH_REF: #8841-A</text>
                    <text x="95%" y="98%" fill="currentColor" fontFamily="monospace" fontSize="10">SCALE: 1:1</text>
                </g>

            </svg>

            {/* Overlay Vignette for depth */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-blueprint-dark/80" />
        </div>
    );
};
