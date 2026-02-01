import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import projectsData from '../../data/projects.json';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenProject: (projectId: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onOpenProject }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['Welcome to System Terminal v1.0.0', 'Type "help" for available commands.']);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    if (!isOpen) return null;

    const handleCommand = (cmd: string) => {
        if (!cmd.trim()) return;

        const parts = cmd.trim().split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        const newHistory = [...history, `user@system:~$ ${cmd}`];

        switch (command) {
            case 'help':
                newHistory.push(
                    'Available commands:',
                    '  ls              List visible nodes/projects',
                    '  open <id>       Open a project case file',
                    '  cat <file>      Read a text file',
                    '  clear           Clear terminal history',
                    '  exit            Exit terminal mode'
                );
                break;
            case 'ls':
                newHistory.push(
                    'DIRECTORY: /projects',
                    ...projectsData.map(p => `  ${p.id.padEnd(20)} [${p.title}]`)
                );
                newHistory.push('FILES:', '  about_me.txt', '  contact.md');
                break;
            case 'open':
                if (args.length === 0) {
                    newHistory.push('Usage: open <project_id>');
                } else {
                    const project = projectsData.find(p => p.id === args[0]);
                    if (project) {
                        newHistory.push(`Opening project: ${project.title}...`);
                        onOpenProject(project.id);
                    } else {
                        newHistory.push(`Error: Project '${args[0]}' not found.`);
                    }
                }
                break;
            case 'cat':
                if (args[0] === 'about_me.txt') {
                    newHistory.push(
                        '---',
                        'Author: Vaibhav Sharma',
                        'Role: System Architect',
                        'Status: Available for consulting',
                        '---'
                    );
                } else if (args[0] === 'contact.md') {
                    newHistory.push('Email: contact@example.com', 'GitHub: github.com/yourusername');
                } else {
                    newHistory.push(`Error: File '${args[0]}' not found.`);
                }
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'exit':
                onClose();
                break;
            default:
                newHistory.push(`Command not found: ${command}. Type "help" for assistance.`);
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col font-mono text-sm lg:text-base text-emerald-400 p-4 lg:p-12">
            <div className="flex items-center justify-between border-b border-emerald-900 pb-4 mb-4">
                <div className="flex items-center gap-2">
                    <TerminalIcon size={20} />
                    <span>TERMINAL_MODE_ACTIVE</span>
                </div>
                <button onClick={onClose} className="hover:text-white"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 p-2" onClick={() => inputRef.current?.focus()}>
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">{line}</div>
                ))}
                <div className="flex items-center gap-2">
                    <span className="text-emerald-600">user@system:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCommand(input);
                            if (e.key === 'Escape') onClose();
                        }}
                        className="bg-transparent border-none outline-none flex-1 text-emerald-400 focus:ring-0"
                        autoFocus
                        spellCheck={false}
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
