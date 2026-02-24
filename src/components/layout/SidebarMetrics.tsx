import React from 'react';
import metricsData from '../../data/metrics.json';
import { Code, Server, Cpu, Layers, Wrench, Rocket } from 'lucide-react';

interface MetricItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

const MetricItem: React.FC<MetricItemProps> = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 group py-1">
        <div className="text-accent-cyan group-hover:text-white transition-colors duration-200 shrink-0">
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-slate-300 group-hover:text-white transition-colors duration-200 text-sm">
                {value}
            </span>
            <span className="text-text-muted text-[10px] uppercase tracking-wider">
                {label}
            </span>
        </div>
    </div>
);

export const SidebarMetrics: React.FC = () => {
    return (
        <aside
            className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 xl:w-80 bg-blueprint-dark/90 border-r border-line-blueprint flex-col p-6 xl:p-8 z-10 backdrop-blur-sm"
            aria-label="Sidebar metrics"
        >
            {/* Identity */}
            <div className="mb-10">
                <h1 className="text-xl xl:text-2xl font-mono text-slate-100 tracking-wider font-bold">
                    VAIBHAV SHARMA
                </h1>
                <p className="text-accent-cyan font-mono text-sm mt-1.5 tracking-wide">
                    SYSTEMS ENGINEER
                </p>
            </div>

            {/* Metrics */}
            <div className="space-y-8 font-mono text-sm flex-1">
                <div className="space-y-3">
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] border-b border-line-blueprint pb-2">
                        Experience
                    </p>
                    <MetricItem
                        icon={<Code size={16} />}
                        label="Years Coding"
                        value={metricsData.yearsCoding}
                    />
                </div>

                <div className="space-y-3">
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] border-b border-line-blueprint pb-2">
                        Output
                    </p>
                    <MetricItem
                        icon={<Layers size={16} />}
                        label="Projects Shipped"
                        value={metricsData.projectsShipped}
                    />
                    <MetricItem
                        icon={<Server size={16} />}
                        label="Systems Designed"
                        value={metricsData.systemsDesigned}
                    />
                    <MetricItem
                        icon={<Rocket size={16} />}
                        label="Prod Deployments"
                        value={metricsData.productionDeployments}
                    />
                </div>

                <div className="space-y-3">
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] border-b border-line-blueprint pb-2">
                        Stack
                    </p>
                    <MetricItem
                        icon={<Wrench size={16} />}
                        label="Primary Stack"
                        value={metricsData.primaryStack}
                    />
                    <MetricItem
                        icon={<Cpu size={16} />}
                        label="Current Focus"
                        value={metricsData.currentFocus}
                    />
                </div>
            </div>

            {/* Status indicator */}
            <div className="mt-auto pt-6 border-t border-line-blueprint">
                <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
                    System Status: ONLINE
                </div>
            </div>
        </aside>
    );
};
