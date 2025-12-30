import React from 'react';
import { Reveal } from '../ui/Reveal';
import { useData } from '../../context/DataContext';

export const MissionSection: React.FC = () => {
    const { content } = useData();

    return (
        <section className="py-24 px-6 bg-primary-dark text-primary-light relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                <Reveal>
                    <div className="space-y-6">
                        <h2 className="text-accent font-bold tracking-[0.2em] text-sm uppercase">{content.mission.title}</h2>
                        <p className="font-heading text-3xl md:text-4xl leading-tight font-medium text-white">
                            {content.mission.text}
                        </p>
                        <p className="text-primary-light/60 text-lg">
                            {content.mission.subText}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="space-y-6 md:border-l md:border-white/10 md:pl-16">
                        <h2 className="text-accent font-bold tracking-[0.2em] text-sm uppercase">{content.vision.title}</h2>
                        <p className="font-heading text-3xl md:text-4xl leading-tight font-medium text-white">
                            {content.vision.text}
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
