import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const GallerySection: React.FC = () => {
    return (
        <section id="gallery" className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <Reveal>
                        <h2 className="font-heading text-5xl font-bold text-primary-dark">Moments in <br /><span className="text-accent">Motion</span></h2>
                    </Reveal>
                    <Link to="https://www.instagram.com/cadence.collective_/" target="_blank" className="hidden md:flex items-center gap-2 text-primary-dark hover:text-accent font-bold transition-colors mt-4 md:mt-0">
                        View on Instagram <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    <div className="col-span-1 md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl">
                        <img src="https://picsum.photos/800/800?random=4&grayscale" alt="Performance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                <Play fill="white" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <span className="bg-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Showcase</span>
                            <h3 className="font-heading text-2xl mt-2">Spring 2023 Finale</h3>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-1 relative group overflow-hidden rounded-2xl bg-primary-light">
                        <div className="p-6 h-full flex flex-col justify-between">
                            <h3 className="font-heading text-2xl text-primary-dark">Teaching <br />Sessions</h3>
                            <ArrowRight className="self-end text-accent" />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-1 relative group overflow-hidden rounded-2xl">
                        <img src="https://picsum.photos/400/400?random=5&grayscale" alt="Event" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl">
                        <img src="https://picsum.photos/800/400?random=6&grayscale" alt="Workshop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <p className="text-white font-bold">Vocal Workshop 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
