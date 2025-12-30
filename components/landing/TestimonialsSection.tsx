import React from 'react';
import { Quote } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useData } from '../../context/DataContext';
import { Testimonial } from '../../types';

const MarqueeCard: React.FC<{ item: Testimonial }> = ({ item }) => (
    <div className="flex-shrink-0 w-[350px] mx-4 p-8 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
        <Quote className="text-accent mb-4 w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
        <p className="text-primary-dark text-lg mb-6 font-medium italic leading-relaxed">"{item.quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-dark to-accent flex items-center justify-center text-white font-bold font-heading">
                {item.author.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-primary-dark">{item.author}</h4>
                <p className="text-xs text-primary-dark/60 uppercase tracking-wider">{item.role}</p>
            </div>
        </div>
    </div>
);

export const TestimonialsSection: React.FC = () => {
    const { content } = useData();

    return (
        <section className="py-20 bg-primary-light overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-12 px-6">
                <Reveal width="100%">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-dark">Hear from our Students</h2>
                </Reveal>
            </div>

            <div className="relative w-full">
                <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused]">
                    {[...content.testimonials, ...content.testimonials, ...content.testimonials].map((t, i) => (
                        <MarqueeCard key={i} item={t} />
                    ))}
                </div>
                <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-primary-light to-transparent z-10"></div>
                <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-primary-light to-transparent z-10"></div>
            </div>
        </section>
    );
};
