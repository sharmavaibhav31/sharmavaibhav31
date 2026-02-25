import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface NodeProps {
    id: string;
    label: string;
    x: number;
    y: number;
    isActive?: boolean;
    onClick: (id: string) => void;
    icon?: React.ReactNode;
    tooltip?: string;
    assemblyVisible?: boolean;
    assemblyDelay?: number;
    reducedMotion?: boolean;
    isCentral?: boolean;
}

export const Node: React.FC<NodeProps> = ({
    id, label, x, y, isActive, onClick, icon, tooltip,
    assemblyVisible = true, assemblyDelay = 0, reducedMotion = false, isCentral = false,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    // Assembly animation variants
    const variants = reducedMotion
        ? {
            hidden: { opacity: 1, y: 0, scale: 1 },
            visible: { opacity: 1, y: 0, scale: 1 },
        }
        : isCentral
            ? {
                hidden: { opacity: 0, y: 0, scale: 0.98 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.15, ease: 'easeOut' as const, delay: assemblyDelay },
                },
            }
            : {
                hidden: { opacity: 0, y: 4, scale: 1 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.12, ease: 'easeOut' as const, delay: assemblyDelay },
                },
            };

    return (
        <motion.div
            className={clsx(
                "absolute cursor-pointer flex flex-col items-center justify-center p-3 group",
                isActive ? "z-20" : "z-10"
            )}
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => onClick(id)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            variants={variants}
            initial="hidden"
            animate={assemblyVisible ? 'visible' : 'hidden'}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${label}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(id); }}
        >
            {/* Tooltip */}
            {tooltip && showTooltip && !isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface border border-line-blueprint text-xs font-mono text-slate-300 whitespace-nowrap rounded-sm shadow-lg z-30"
                >
                    {tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-line-blueprint" />
                </motion.div>
            )}

            {/* Node circle */}
            <div className={clsx(
                "w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-sm transition-all duration-200",
                isActive
                    ? "border-accent-cyan bg-accent-cyan/10 shadow-[0_0_25px_rgba(6,182,212,0.35)]"
                    : "border-line-blueprint bg-blueprint-dark/60 group-hover:border-accent-cyan/50 group-hover:bg-accent-cyan/5",
                isCentral && !isActive && "shadow-[0_0_12px_rgba(30,58,138,0.3)]"
            )}>
                {icon ? (
                    <div className={clsx(
                        "transition-colors duration-200",
                        isActive ? "text-accent-cyan" : "text-slate-400 group-hover:text-accent-cyan/70"
                    )}>
                        {icon}
                    </div>
                ) : (
                    <div className="w-3 h-3 bg-current rounded-full" />
                )}
            </div>

            {/* Label */}
            <span className={clsx(
                "mt-2.5 font-mono text-[10px] lg:text-xs tracking-wider uppercase transition-colors duration-200 whitespace-nowrap bg-blueprint-dark/80 px-2 py-0.5 rounded-sm",
                isActive
                    ? "text-accent-cyan font-semibold glow-text border border-accent-cyan/20"
                    : "text-text-dim border border-transparent group-hover:text-slate-300"
            )}>
                {label}
            </span>
        </motion.div>
    );
};
