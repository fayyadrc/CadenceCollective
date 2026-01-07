import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { useData } from '../../context/DataContext';

const TimelineNode: React.FC<{
    block: any;
    index: number;
    isHovered: boolean;
    onHover: (index: number | null) => void;
}> = ({ block, index, isHovered, onHover }) => {
    const isEven = index % 2 === 0;

    return (
        <div className="relative flex flex-col md:flex-row items-center justify-center mb-16 md:mb-32 last:mb-0">
            {/* Left Content */}
            <div
                className={`w-full md:w-5/12 md:pr-12 text-center md:text-right order-2 md:order-1 ${
                    isEven ? 'block' : 'hidden md:block invisible'
                }`}
            >
                {isEven && (
                    <div className="transition-all duration-500">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-primary-dark mb-2 md:mb-3">
                            {block.title}
                        </h3>
                        <div className="space-y-2 md:space-y-3 text-sm md:text-base text-primary-dark/70 leading-relaxed">
                            {block.paragraphs.map((p: string, pIdx: number) => (
                                <p key={pIdx}>{p}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Timeline Center */}
            <div className="w-full md:w-2/12 flex flex-col items-center relative z-20 order-1 md:order-2 mb-6 md:mb-0">
                {/* Line Above */}
                {index > 0 && (
                    <div
                        className="absolute bottom-1/2 w-0.5 h-16 md:h-32 hidden md:block"
                        style={{ borderLeft: '2px dashed rgba(59, 45, 112, 0.4)' }}
                    />
                )}

                {/* Node */}
                <div
                    className="relative cursor-pointer"
                    onMouseEnter={() => onHover(index)}
                    onMouseLeave={() => onHover(null)}
                >
                    <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-primary-dark bg-white flex items-center justify-center font-bold text-base md:text-lg text-primary-dark transition-all duration-300 ${
                            isHovered
                                ? 'scale-125 shadow-2xl bg-primary-light'
                                : 'shadow-lg'
                        }`}
                    >
                        {block.year}
                    </div>

                    {isHovered && (
                        <div className="absolute inset-0 rounded-full border-4 border-primary-dark animate-ping opacity-30" />
                    )}
                </div>

                {/* Line Below */}
                {index < 2 && (
                    <div
                        className="absolute top-1/2 w-0.5 h-16 md:h-32 hidden md:block"
                        style={{ borderLeft: '2px dashed rgba(59, 45, 112, 0.4)' }}
                    />
                )}
            </div>

            {/* Right Content */}
            <div
                className={`w-full md:w-5/12 md:pl-12 text-center md:text-left order-3 ${
                    !isEven ? 'block' : 'hidden md:block invisible'
                }`}
            >
                {!isEven && (
                    <div className="transition-all duration-500">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-primary-dark mb-2 md:mb-3">
                            {block.title}
                        </h3>
                        <div className="space-y-2 md:space-y-3 text-sm md:text-base text-primary-dark/70 leading-relaxed">
                            {block.paragraphs.map((p: string, pIdx: number) => (
                                <p key={pIdx}>{p}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const TimelineSection: React.FC = () => {
    const { content } = useData();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section
            id="about"
            className="py-16 md:py-32 px-4 md:px-6 bg-white relative z-10"
        >
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-dark mb-16 md:mb-32 text-center">
                        Our Journey
                    </h2>
                </Reveal>

                <div className="relative">
                    {content.story.map((block, index) => (
                        <TimelineNode
                            key={block.id}
                            block={block}
                            index={index}
                            isHovered={hoveredIndex === index}
                            onHover={setHoveredIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
