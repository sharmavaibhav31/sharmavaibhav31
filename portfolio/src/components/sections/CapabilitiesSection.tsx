// Theme: Redacted × Kernel/Log hybrid
// Data: untouched — presentation layer only

import React from 'react';
import skillsData from '../../data/skills.json';

type SkillItem = {
    name: string;
    tooltip?: string;
    projectRef?: string;
};

type CapabilityCategory = {
    category: string;
    items: SkillItem[];
};

const typedSkillsData = skillsData as { capabilities: CapabilityCategory[] };

const getCategoryGlyph = (category: string) => {
    if (category.includes('Backend')) return '{ }';
    if (category.includes('Distributed')) return '>_';
    if (category.includes('Infrastructure') || category.includes('DevOps')) return '[·]';
    if (category.includes('ML')) return '~>';
    return '[]';
};

export const CapabilitiesSection: React.FC = () => {
    const totalSkills = typedSkillsData.capabilities.reduce((acc, cat) => acc + cat.items.length, 0);

    return (
        <section id="capabilities" className="w-full bg-bg-primary flex flex-col pt-0">
            {/* SECTION HEADER BAR */}
            <div className="w-full h-[36px] bg-[#111111] border-y-[0.5px] border-white/[0.06] px-4 md:px-8 flex justify-between items-center shrink-0">
                <div className="font-mono text-[8px] sm:text-[9px] text-white/20 tracking-[0.18em]">
                    CAPABILITIES MANIFEST
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-white/[0.18]">
                    {totalSkills} capabilities
                </div>
            </div>

            {/* CONTENT */}
            <div className="w-full px-4 md:px-8 py-[2rem]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[4rem] gap-y-[2.5rem]">
                    {typedSkillsData.capabilities.map((cap) => (
                        <div key={cap.category} className="border-t-[0.5px] border-white/[0.06] flex flex-col">
                            {/* Category Header */}
                            <div className="flex items-center gap-[10px] pt-[1rem] pb-[0.6rem]">
                                <span className="font-mono text-[11px] text-white/20">
                                    {getCategoryGlyph(cap.category)}
                                </span>
                                <span className="font-sans text-[12px] font-bold text-white/[0.7]">
                                    {cap.category}
                                </span>
                            </div>

                            {/* Skill Items */}
                            <div className="flex flex-col">
                                {cap.items.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="group flex items-center justify-between py-[6px] border-b-[0.5px] border-white/[0.03] transition-colors duration-150 hover:bg-white/[0.02] cursor-default"
                                        title={item.tooltip}
                                    >
                                        <span className="font-mono text-[11px] text-white/[0.38] transition-colors duration-150 group-hover:text-white/[0.65]">
                                            {item.name}
                                        </span>
                                        {item.projectRef && (
                                            <a 
                                                href={`#work`} // or directly to the project if specific ID mapping is needed, but we used `#work` for now. Could be `#${item.projectRef}`
                                                onClick={(e) => {
                                                    if (!item.projectRef) e.preventDefault();
                                                }}
                                                className="font-mono text-white/[0.15] hover:text-[#4ade80]/60 transition-colors duration-150 px-2 cursor-pointer"
                                                title={`View related project`}
                                            >
                                                →
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
