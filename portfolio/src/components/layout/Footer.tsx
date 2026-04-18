// Theme: Redacted × Kernel/Log hybrid
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    
    return (
        <footer className="w-full h-[48px] bg-bg-primary border-t-[0.5px] border-white/[0.06] px-4 md:px-8 flex items-center justify-between mt-auto">
            
            {/* Left: System log end */}
            <div className="font-mono text-[9px] text-white/30 tracking-[0.12em] uppercase">
                © {year} VAIBHAV SHARMA. SYSTEM_LOG_END.
            </div>

            {/* Right: Social Links */}
            <div className="flex items-center gap-[1rem]">
                <a
                    href={resumeData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[9px] tracking-[0.12em] text-white/20 hover:text-[#4ade80]/70 transition-colors duration-150"
                >
                    [GITHUB]
                </a>
                <a
                    href={resumeData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[9px] tracking-[0.12em] text-white/20 hover:text-[#4ade80]/70 transition-colors duration-150"
                >
                    [LINKEDIN]
                </a>
                <a
                    href={resumeData.socials.email}
                    className="font-mono text-[9px] tracking-[0.12em] text-white/20 hover:text-[#4ade80]/70 transition-colors duration-150"
                >
                    [EMAIL]
                </a>
            </div>
            
        </footer>
    );
};
