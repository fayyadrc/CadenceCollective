import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Heart, Radio, Music, Target, Instagram } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useData } from '../../context/DataContext';
import { TeamMember } from '../../types';

const FlipCard: React.FC<{ member: TeamMember; onClick: () => void }> = ({ member, onClick }) => {
    return (
        <div className="group h-[450px] w-full perspective-1000 cursor-pointer" onClick={onClick}>
            <div className="relative h-full w-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180 shadow-xl rounded-xl">
                {/* Front */}
                <div className="absolute inset-0 h-full w-full backface-hidden rounded-xl overflow-hidden border border-primary-dark/10 bg-white">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ 
                            objectPosition: member.imagePosition || 'center',
                            transform: (member.imageScale || member.imageTranslateY) 
                                ? `${member.imageScale ? `scale(${member.imageScale})` : ''} ${member.imageTranslateY ? `translateY(${member.imageTranslateY})` : ''}`.trim()
                                : undefined
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent flex flex-col justify-end p-8">
                        <h3 className="text-white font-heading text-3xl font-bold">{member.name}</h3>
                        <p className="text-accent font-medium text-sm uppercase tracking-widest">{member.role}</p>
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 h-full w-full bg-primary-dark rounded-xl backface-hidden rotate-y-180 p-8 flex flex-col justify-center items-center text-center border border-accent/30">
                    <h3 className="text-white font-heading text-2xl mb-2">{member.name}</h3>
                    <div className="w-12 h-1 bg-accent mb-6"></div>
                    <p className="text-primary-light/90 leading-relaxed text-lg font-light line-clamp-5 mb-6">
                        "{member.shortBio}"
                    </p>
                    <span className="text-accent text-sm font-bold uppercase tracking-wider border-b border-accent pb-1 hover:text-white hover:border-white transition-colors">
                        Read Full Profile
                    </span>
                </div>
            </div>
        </div>
    );
};

const TeamModal: React.FC<{ member: TeamMember | null; isOpen: boolean; onClose: () => void }> = ({ member, isOpen, onClose }) => {
    if (!member || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="relative bg-cream w-full max-w-7xl h-auto max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* LEFT PANEL: Sidebar (Visuals + Stats) */}
                <div className="md:w-[35%] lg:w-[30%] bg-primary-dark text-white p-8 md:p-10 flex flex-col gap-8 overflow-y-auto no-scrollbar relative">
                    {/* Abstract Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="relative mb-6 w-full overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 rounded-2xl bg-accent blur-md opacity-30"></div>
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full aspect-[3/4] rounded-2xl object-cover border-4 border-white/10 shadow-2xl relative z-10 bg-primary-dark"
                                style={{ 
                                    objectPosition: 'top center'
                                }}
                            />
                        </div>

                        <h2 className="font-heading text-4xl font-bold mb-1">{member.name}</h2>
                        <p className="text-accent font-medium text-sm uppercase tracking-widest mb-6">{member.role}</p>

                        {member.instagram && (
                            <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all mb-6 text-sm font-medium border border-white/20"
                            >
                                <Instagram size={16} />
                                Follow on Instagram
                            </a>
                        )}

                        {member.credentials && member.credentials.length > 0 && (
                            <div className="w-full">
                                <h3 className="text-xs font-bold uppercase text-white/40 mb-4 tracking-widest flex items-center gap-2">
                                    <Award size={14} /> Credentials
                                </h3>
                                <ul className="space-y-3">
                                    {member.credentials.map((cred, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-white/80 leading-snug">
                                            <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                                            <span>{cred}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: Content (Narrative) */}
                <div className="md:w-[65%] lg:w-[70%] bg-white p-8 md:p-10 overflow-y-auto relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-primary-dark rounded-full transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="space-y-8 max-w-4xl mx-auto pt-4">
                        {/* Main Bio */}
                        <div>
                            <h3 className="text-primary-dark/40 font-heading text-6xl absolute top-6 left-8 opacity-10 -z-10">Bio</h3>
                            <div className="prose prose-lg text-primary-dark/80 leading-relaxed">
                                <p className="whitespace-pre-line text-lg font-light">{member.fullBio || member.shortBio}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Origin Story */}
                            {member.whyStarted && (
                                <div className="bg-primary-light/20 p-6 rounded-2xl border border-primary-dark/5">
                                    <h3 className="text-sm font-bold text-primary-dark mb-3 flex items-center gap-2 uppercase tracking-wide">
                                        <Heart size={16} className="text-accent" /> The Origin
                                    </h3>
                                    <p className="text-primary-dark/70 text-sm leading-relaxed italic">"{member.whyStarted}"</p>
                                </div>
                            )}

                            {/* Featured In */}
                            {member.featuredIn && member.featuredIn.length > 0 && (
                                <div className="bg-primary-light/20 p-6 rounded-2xl border border-primary-dark/5 flex flex-col justify-center">
                                    <h3 className="text-sm font-bold text-primary-dark mb-4 flex items-center gap-2 uppercase tracking-wide">
                                        <Radio size={16} className="text-accent" /> Featured In
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {member.featuredIn.map((feat, idx) => (
                                            feat.url ? (
                                                <a
                                                    key={idx}
                                                    href={feat.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-2 bg-white border border-primary-dark/20 rounded-lg text-xs font-semibold text-primary-dark shadow-sm hover:bg-accent hover:text-white hover:border-accent transition-all cursor-pointer"
                                                >
                                                    {feat.name}
                                                </a>
                                            ) : (
                                                <span key={idx} className="px-3 py-2 bg-white border border-primary-dark/20 rounded-lg text-xs font-semibold text-primary-dark shadow-sm">
                                                    {feat.name}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Personal Connection */}
                            {member.personalConnection && (
                                <div className="bg-primary-light/20 p-6 rounded-2xl border border-primary-dark/5">
                                    <h3 className="text-sm font-bold text-primary-dark mb-3 flex items-center gap-2 uppercase tracking-wide">
                                        <Music size={16} className="text-accent" /> Connection to Music
                                    </h3>
                                    <p className="text-primary-dark/70 text-sm leading-relaxed">{member.personalConnection}</p>
                                </div>
                            )}

                            {/* Role Focus - Moved inside grid */}
                            {member.roleFocus && (
                                <div className="bg-primary-light/20 p-6 rounded-2xl border border-primary-dark/5">
                                    <h3 className="text-sm font-bold text-primary-dark mb-3 flex items-center gap-2 uppercase tracking-wide">
                                        <Target size={16} className="text-accent" /> Role Focus
                                    </h3>
                                    <p className="text-primary-dark/70 text-sm leading-relaxed">{member.roleFocus}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const TeamSection: React.FC = () => {
    const { content } = useData();
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedMember]);

    return (
        <section id="team" className="py-24 px-6 bg-cream">
            <div className="max-w-6xl mx-auto">
                <Reveal width="100%">
                    <h2 className="font-heading text-5xl font-bold text-primary-dark mb-4 text-center">Meet the Team</h2>
                    <p className="text-center text-primary-dark/60 mb-16 max-w-2xl mx-auto">Driven by passion, united by music. Click on a profile to read their full story.</p>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.team.map((member, i) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <FlipCard member={member} onClick={() => setSelectedMember(member)} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedMember && (
                    <TeamModal
                        member={selectedMember}
                        isOpen={!!selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
