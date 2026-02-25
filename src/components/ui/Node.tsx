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
    onHover: (id: string | null) => void;
    icon?: React.ReactNode;
    tooltip?: string;
    isSoftHighlighted?: boolean;
    assemblyVisible?: boolean;
    assemblyDelay?: number;
    reducedMotion?: boolean;
    isCentral?: boolean;
}

export const Node: React.FC<NodeProps> = ({
    id, label, x, y, isActive, onClick, onHover, icon, tooltip,
    isSoftHighlighted = false, assemblyVisible = true, assemblyDelay = 0,
    reducedMotion = false, isCentral = false,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => { setShowTooltip(true); onHover(id); };
    const handleMouseLeave = () => { setShowTooltip(false); onHover(null); };

    // Assembly variants — no bounce, no elastic, exact easing
    const variants = reducedMotion
        ? { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } }
        : isCentral
            ? {
                hidden: { opacity: 0, y: 0, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: 'easeOut' as const, delay: assemblyDelay } },
            }
            : {
                hidden: { opacity: 0, y: 4, scale: 1 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.12, ease: 'easeOut' as const, delay: assemblyDelay } },
            };

    // ── Central node: thicker ring, slightly larger (+8%), inner gradient, stronger glow
    const centralRingClass = isCentral
        ? isActive
            ? 'w-[74px] h-[74px] lg:w-[86px] lg:h-[86px] border-[3px] border-accent-cyan bg-gradient-to-br from-accent-cyan/15 to-transparent shadow-[0_0_32px_rgba(6,182,212,0.45),inset_0_0_16px_rgba(6,182,212,0.08)] z-20'
            : 'w-[74px] h-[74px] lg:w-[86px] lg:h-[86px] border-[3px] border-line-blueprint/80 bg-gradient-to-br from-white/5 to-transparent shadow-[0_0_18px_rgba(30,58,138,0.4),inset_0_0_12px_rgba(30,58,138,0.1)] z-20 hover:border-accent-cyan/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.2)]'
        : isActive
            ? 'w-12 h-12 lg:w-16 lg:h-16 border-2 border-accent-cyan bg-accent-cyan/10 shadow-[0_0_20px_rgba(6,182,212,0.3)] z-10'
            : isSoftHighlighted
                ? 'w-12 h-12 lg:w-16 lg:h-16 border-2 border-accent-cyan/40 bg-accent-cyan/5 shadow-[0_0_10px_rgba(6,182,212,0.12)] z-10'
                : 'w-12 h-12 lg:w-16 lg:h-16 border-2 border-line-blueprint/60 bg-blueprint-dark/60 z-10 group-hover:border-accent-cyan/40 group-hover:bg-accent-cyan/5';

    const iconColorClass = isActive
        ? 'text-accent-cyan'
        : isSoftHighlighted
            ? 'text-accent-cyan/70'
            : 'text-slate-500 group-hover:text-accent-cyan/70';

    const labelColorClass = isActive
        ? 'text-accent-cyan font-semibold border border-accent-cyan/20'
        : isSoftHighlighted
            ? 'text-slate-300 border border-transparent'
            : 'text-text-dim border border-transparent group-hover:text-slate-300';

    return (
        <motion.div
            className="absolute cursor-pointer flex flex-col items-center justify-center p-3 group"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: isCentral ? 20 : 10 }}
            onClick={() => onClick(id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variants={variants}
            initial="hidden"
            animate={assemblyVisible ? 'visible' : 'hidden'}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${label}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(id); }}
        >
            {/* Tooltip */}
            {tooltip && showTooltip && !isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-line-blueprint text-[10px] font-mono text-slate-300 whitespace-nowrap rounded-sm shadow-lg z-30 pointer-events-none"
                >
                    {tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-line-blueprint/60" />
                </motion.div>
            )}

            {/* Node ring */}
            <div className={clsx('rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200', centralRingClass)}>
                {icon && (
                    <div className={clsx('transition-colors duration-200', iconColorClass, isCentral && 'scale-110')}>
                        {icon}
                    </div>
                )}
            </div>

            {/* Label */}
            <span className={clsx(
                'mt-2.5 font-mono text-[10px] lg:text-xs tracking-wider uppercase transition-colors duration-200 whitespace-nowrap bg-blueprint-dark/80 px-2 py-0.5 rounded-sm',
                labelColorClass
            )}>
                {label}
            </span>
        </motion.div>
    );
};
