import React from 'react';
import metricsData from '../../data/metrics.json';
import { Code, Server, Cpu, Layers } from 'lucide-react';

export const SidebarMetrics: React.FC = () => {
    const metrics = metricsData;

    return (
        <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-80 bg-blueprint-dark/80 border-r border-line-blueprint flex-col p-8 z-10 backdrop-blur-sm">
            <div className="mb-12">
                <h1 className="text-2xl font-mono text-slate-100 tracking-wider font-bold">VAIBHAV SHARMA</h1>
                <p className="text-accent-cyan font-mono text-sm mt-2">SYSTEM ARCHITECT</p>
            </div>

            <div className="space-y-10 font-mono text-sm flex-1">
                <div className="space-y-4">
                    <p className="text-text-dim text-xs uppercase tracking-widest border-b border-line-blueprint pb-2">Experience</p>
                    <div className="flex items-center gap-3 group">
                        <Code size={18} className="text-accent-cyan group-hover:text-white transition-colors" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">{metrics.yearsCoding} Years Coding</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-text-dim text-xs uppercase tracking-widest border-b border-line-blueprint pb-2">Output</p>
                    <div className="flex items-center gap-3 group">
                        <Layers size={18} className="text-accent-cyan group-hover:text-white transition-colors" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">{metrics.projectsShipped} Projects Shipped</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                        <Server size={18} className="text-accent-cyan group-hover:text-white transition-colors" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">{metrics.productionDeployments} Prod Deployments</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-text-dim text-xs uppercase tracking-widest border-b border-line-blueprint pb-2">Focus</p>
                    <div className="flex items-center gap-3 group">
                        <Cpu size={18} className="text-accent-cyan group-hover:text-white transition-colors" />
                        <span className="text-slate-300 group-hover:text-white transition-colors">{metrics.currentFocus}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-line-blueprint">
                <div className="flex items-center gap-2 text-xs text-text-dim font-mono">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    System Status: ONLINE
                </div>
            </div>
        </div>
    );
};
