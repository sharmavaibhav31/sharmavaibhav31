import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PanelProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ isOpen, onClose, title, children }) => {
    // Lock body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                        className="fixed top-0 right-0 bottom-0 w-full lg:w-[650px] bg-blueprint-dark border-l border-line-blueprint z-40 shadow-2xl flex flex-col"
                    >
                        <div className="flex-none p-6 border-b border-line-blueprint flex items-center justify-between bg-blueprint-dark/95 backdrop-blur">
                            <h2 className="text-xl font-mono text-accent-cyan tracking-wider uppercase">{title || 'Details'}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-accent-cyan/10 rounded-full transition-colors text-slate-400 hover:text-accent-cyan"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
