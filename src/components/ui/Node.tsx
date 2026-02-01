import React from 'react';
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
}

export const Node: React.FC<NodeProps> = ({ id, label, x, y, isActive, onClick, icon }) => {
    return (
        <motion.div
            className={clsx(
                "absolute cursor-pointer flex flex-col items-center justify-center p-4 transition-all duration-300",
                isActive ? "z-20 scale-110" : "z-10 hover:scale-105"
            )}
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => onClick(id)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: isActive ? 1.1 : 1,
                y: isActive ? [0, -5, 0] : [0, -10, 0]
            }}
            transition={{
                duration: 0.5,
                delay: Math.random() * 0.3,
                y: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: "easeInOut",
                    delay: Math.random() * 2
                }
            }}
        >
            <div className={clsx(
                "w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-md transition-all duration-500",
                isActive
                    ? "border-accent-cyan bg-accent-cyan/10 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                    : "border-line-blueprint bg-blueprint-dark/50 hover:border-accent-cyan/50"
            )}>
                {icon ? (
                    <div className={isActive ? "text-accent-cyan" : "text-slate-400"}>{icon}</div>
                ) : (
                    <div className="w-3 h-3 bg-current rounded-full" />
                )}
            </div>
            <span className={clsx(
                "mt-3 font-mono text-xs lg:text-sm tracking-widest uppercase transition-colors duration-300 whitespace-nowrap bg-blueprint-dark/80 px-2 py-0.5 rounded",
                isActive ? "text-accent-cyan font-bold glow-text border border-accent-cyan/20" : "text-text-dim border border-transparent"
            )}>
                {label}
            </span>
        </motion.div>
    );
};
