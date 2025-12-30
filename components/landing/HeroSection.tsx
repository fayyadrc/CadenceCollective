import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Award, Mic2 } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useData } from '../../context/DataContext';

export const HeroSection: React.FC = () => {
    const { content } = useData();

    const getIcon = (type: string) => {
        switch (type) {
            case 'globe': return <Globe className="w-5 h-5" />;
            case 'users': return <Users className="w-5 h-5" />;
            case 'award': return <Award className="w-5 h-5" />;
            case 'mic': return <Mic2 className="w-5 h-5" />;
            default: return <Globe className="w-5 h-5" />;
        }
    }

    return (
        <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 pt-20 md:pt-0">
            <div className="absolute top-0 left-0 w-full h-full z-0 bg-cream overflow-hidden">
                {/* Large central circular gradient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-gradient-to-br from-blue-400/40 via-purple-400/30 to-pink-400/40 blur-3xl"></div>

                {/* Accent gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary-light/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-64 md:w-96 h-64 md:h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-5xl w-full text-center pb-10 md:pb-36">
                <Reveal width="100%" delay={0.1}>
                    <h2 className="text-accent font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-3 md:mb-4">{content.hero.tagline}</h2>
                </Reveal>

                <Reveal width="100%">
                    <h1 className="font-heading text-5xl md:text-8xl font-bold leading-[1.1] md:leading-[0.9] text-primary-dark mb-6 md:mb-8">
                        {content.hero.titleLine1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-accent italic">
                            {content.hero.titleLine2}
                        </span>
                    </h1>
                </Reveal>

                <Reveal width="100%" delay={0.4}>
                    <p className="text-lg md:text-2xl text-primary-dark/70 max-w-2xl mx-auto mb-8 md:mb-10 font-light px-4">
                        {content.hero.subtitle}
                    </p>
                </Reveal>

                <Reveal width="100%" delay={0.6}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/apply"
                            className="group relative px-8 py-4 bg-primary-dark text-white rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-primary-dark/20 w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 w-full h-full bg-accent/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <span className="relative flex items-center justify-center gap-2 font-bold tracking-wide">
                                Join Cadence Collective <ArrowRight size={18} />
                            </span>
                        </Link>
                    </div>
                </Reveal>
            </div>

            <div className="w-full relative mt-8 md:absolute md:bottom-16 md:mt-0 left-0 right-0 z-20">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl p-4 md:p-6 shadow-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x-0 md:divide-x divide-primary-dark/10">
                            {content.stats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center justify-center text-center p-2">
                                    <div className="text-accent mb-1 md:mb-2 opacity-80 scale-90 md:scale-100">{getIcon(stat.iconType)}</div>
                                    <span className="font-heading text-2xl md:text-3xl font-bold text-primary-dark">{stat.value}</span>
                                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-primary-dark/60 mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};