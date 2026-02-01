import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';

interface PortfolioGuardProps {
    onAccessGranted: () => void;
}

type GuardState = 'idle' | 'tracking' | 'questioning' | 'processing' | 'granted' | 'denied' | 'peeping';

export const PortfolioGuard: React.FC<PortfolioGuardProps> = ({ onAccessGranted }) => {
    const [guardState, setGuardState] = useState<GuardState>('idle');
    const [step, setStep] = useState(0); // 0: Start, 1: Name, 2: Purpose, 3: Done
    const [inputValue, setInputValue] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const [dialogue, setDialogue] = useState<string[]>([]);
    const eyeRef = useRef<SVGSVGElement>(null);

    // Peeping state
    const [peepPosition, setPeepPosition] = useState({ x: 0, y: 0, rotate: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [dialogue]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!eyeRef.current) return;

            // Calculate eye rotation/position based on cursor
            const rect = eyeRef.current.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
            const distance = Math.min(10, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 10);

            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;

            setEyePosition({ x: pupilX, y: pupilY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Initial sequence
    useEffect(() => {
        if (!isMinimized) {
            setTimeout(() => setGuardState('tracking'), 1000);
            setTimeout(() => addToDialogue("SYSTEM ALERT: UNIDENTIFIED USER DETECTED."), 1500);
            setTimeout(() => addToDialogue("INITIATING SECURITY PROTOCOL..."), 3000);
            setTimeout(() => {
                setGuardState('questioning');
                setStep(1);
                addToDialogue("IDENTIFY YOURSELF. ENTER ALIAS:");
            }, 4500);
        }
    }, [isMinimized]);

    // Peeping animation loop
    useEffect(() => {
        if (isMinimized) {
            const interval = setInterval(() => {
                // Randomly decide to peep
                if (Math.random() > 0.7) {
                    setGuardState('peeping');
                    // Random position along edges
                    const side = Math.floor(Math.random() * 4); // 0:top, 1:right, 2:bottom, 3:left
                    let pos = { x: 0, y: 0, rotate: 0 };

                    switch (side) {
                        case 0: pos = { x: Math.random() * 80 + 10, y: 0, rotate: 180 }; break;
                        case 1: pos = { x: 95, y: Math.random() * 80 + 10, rotate: -90 }; break;
                        case 2: pos = { x: Math.random() * 80 + 10, y: 95, rotate: 0 }; break;
                        case 3: pos = { x: 0, y: Math.random() * 80 + 10, rotate: 90 }; break;
                    }
                    setPeepPosition(pos);

                    setTimeout(() => setGuardState('idle'), 3000); // Hide after 3s
                }
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [isMinimized]);

    const addToDialogue = (text: string) => {
        setDialogue(prev => [...prev, text]);
    };

    // Knowledge Base
    const SYSTEM_DATA = {
        user: "IDENTITY: Vaibhav Sharma. \nCLASS: System Architect & Consultant. \nSPECS: Backend Systems, ML Pipelines, High-Scale Infrastructure.",
        bot: "IDENTITY: Portfolio Guardian v2.4. \nFUNCTION: Filter traffic and assess visitor intent. \nORIGIN: Compiled from Vaibhav's latent subroutines."
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        addToDialogue(`> ${inputValue}`);
        const input = inputValue.toLowerCase();
        setInputValue('');
        setGuardState('processing');

        setTimeout(() => {
            // 1. Keyword: SKIP / ENTER
            if (input.includes('skip') || input.includes('enter') || input.includes('portfolio') || input.includes('show')) {
                grantAccess();
                return;
            }

            // 2. Keyword: USER IDENTITY
            if (input.includes('who is') || input.includes('about vaibhav') || input.includes('user') || input.includes('creator')) {
                addToDialogue(SYSTEM_DATA.user);
                setGuardState('questioning');
                return;
            }

            // 3. Keyword: BOT IDENTITY
            if (input.includes('who are you') || input.includes('what are you') || input.includes('bot') || input.includes('guard')) {
                addToDialogue(SYSTEM_DATA.bot);
                setGuardState('questioning');
                return;
            }

            // 4. Default Flow
            if (step === 1) {
                addToDialogue(`USER RECOGNIZED. GREETINGS, ${inputValue.toUpperCase()}.`);
                setTimeout(() => {
                    addToDialogue("STATE YOUR PURPOSE (e.g. Hiring, Browsing, Classified Ops):");
                    setStep(2);
                    setGuardState('questioning');
                }, 800);
            } else if (step === 2) {
                addToDialogue("PURPOSE ANALYZED. ACCEPTABLE.");
                grantAccess();
            } else {
                // Fallback for random chatter
                addToDialogue("INPUT RECEIVED. PROCEED OR STATE PURPOSE.");
                setGuardState('questioning');
            }
        }, 800);
    };

    const grantAccess = () => {
        addToDialogue("ACCESS GRANTED. WELCOME TO THE MAINFRAME.");
        setGuardState('granted');
        setTimeout(() => {
            setIsMinimized(true);
            onAccessGranted();
        }, 1500);
    };

    if (isMinimized) {
        return (
            <AnimatePresence>
                {guardState === 'peeping' && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed z-50 pointer-events-none"
                        style={{
                            left: `${peepPosition.x}%`,
                            top: `${peepPosition.y}%`,
                            transform: `rotate(${peepPosition.rotate}deg)`
                        }}
                    >
                        <RobotEye x={eyePosition.x} y={eyePosition.y} scale={0.5} />
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 font-mono text-accent-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Instruction Panel */}
            <div className="absolute top-8 left-8 p-4 border border-line-blueprint bg-blueprint-dark/80 text-xs hidden md:block max-w-xs">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Terminal size={12} /> COMMAND_LIST</h4>
                <ul className="space-y-1 text-text-dim list-disc pl-4">
                    <li>Answer the Guard's queries</li>
                    <li>Ask "Who is Vaibhav?"</li>
                    <li>Ask "Who are you?"</li>
                    <li>Type "Skip" to bypass security</li>
                </ul>
            </div>

            <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center mb-12">
                    <RobotEye ref={eyeRef} x={eyePosition.x} y={eyePosition.y} />
                </div>

                <div className="bg-blueprint-dark/50 border border-line-blueprint p-6 rounded min-h-[300px] flex flex-col relative overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent-cyan/30 animate-pulse" />

                    <div className="flex-1 space-y-2 mb-4 overflow-y-auto custom-scrollbar max-h-[300px]">
                        {dialogue.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={line.startsWith('>') ? "text-slate-400 text-right" : "text-accent-cyan whitespace-pre-line"}
                            >
                                {line}
                            </motion.div>
                        ))}
                        {guardState === 'processing' && (
                            <div className="text-accent-cyan/50 animate-pulse">Processing...</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {(guardState === 'questioning' || guardState === 'tracking') && (
                        <form onSubmit={handleCommand} className="flex gap-2">
                            <Terminal size={20} className="text-accent-cyan mt-3" />
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                className="flex-1 bg-black/30 border border-line-blueprint rounded px-4 py-2 text-white focus:border-accent-cyan outline-none transition-colors"
                                placeholder="Type transmission..."
                                autoFocus
                            />
                            <button type="submit" className="p-2 text-blueprint-dark bg-accent-cyan rounded hover:bg-cyan-400 transition-colors">
                                <Send size={20} />
                            </button>
                        </form>
                    )}
                </div>

                <div className="text-center text-xs text-text-dim uppercase tracking-widest">
                    Security Level: MAXIMUM<br />
                    Eye Contact Initiated
                </div>
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        </motion.div>
    );
};

const RobotEye = React.forwardRef<SVGSVGElement, { x: number, y: number, scale?: number }>(({ x, y, scale = 1 }, ref) => (
    <motion.div
        animate={{ scale, rotate: 0 }}
        className="relative"
    >
        <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" ref={ref}>
            {/* Outer Shell */}
            <circle cx="50" cy="50" r="45" stroke="#1e293b" strokeWidth="2" fill="#0B1121" />
            <circle cx="50" cy="50" r="40" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 2" fill="none" className="animate-[spin_10s_linear_infinite]" />

            {/* Inner Sclera */}
            <circle cx="50" cy="50" r="20" fill="#06b6d4" fillOpacity="0.1" stroke="#06b6d4" strokeWidth="1" />

            {/* Moving Pupil */}
            <circle cx={50 + x} cy={50 + y} r="8" fill="#06b6d4" />
            <circle cx={50 + x} cy={50 + y} r="4" fill="#ffffff" />

            {/* Glint */}
            <circle cx="65" cy="35" r="3" fill="white" opacity="0.5" />
        </svg>
    </motion.div>
));

PortfolioGuard.displayName = 'PortfolioGuard';
RobotEye.displayName = 'RobotEye';
