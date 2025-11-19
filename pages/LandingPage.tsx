import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Quote, Users, Mic2, Award, Globe, X, Sparkles, Music, Heart, Radio, Target } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { TeamMember, Testimonial, StatItem } from '../types';
import { useData } from '../context/DataContext';

// --- SUB-COMPONENTS ---

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
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-accent blur-md opacity-50"></div>
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-40 h-40 rounded-full object-cover border-4 border-white/10 shadow-2xl relative z-10 bg-primary-dark" 
              />
            </div>
            
            <h2 className="font-heading text-4xl font-bold mb-1">{member.name}</h2>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-6">{member.role}</p>
            
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
                            <span key={idx} className="px-3 py-1.5 bg-white/60 border border-primary-dark/5 rounded-lg text-xs font-bold text-primary-dark/70 shadow-sm">
                              {feat}
                            </span>
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

// --- MAIN COMPONENT ---

export default function LandingPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { content } = useData();

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMember]);

  const getIcon = (type: string) => {
    switch(type) {
      case 'globe': return <Globe className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      case 'award': return <Award className="w-5 h-5" />;
      case 'mic': return <Mic2 className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  }

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-6">
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-cream">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-light/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-5xl w-full text-center pb-24 md:pb-36">
          <Reveal width="100%" delay={0.1}>
             <h2 className="text-accent font-bold tracking-[0.2em] text-sm uppercase mb-4">{content.hero.tagline}</h2>
          </Reveal>
          
          <Reveal width="100%">
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[0.9] text-primary-dark mb-8">
              {content.hero.titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-accent italic">
                {content.hero.titleLine2}
              </span>
            </h1>
          </Reveal>

          <Reveal width="100%" delay={0.4}>
            <p className="text-xl md:text-2xl text-primary-dark/70 max-w-2xl mx-auto mb-10 font-light">
              {content.hero.subtitle}
            </p>
          </Reveal>

          <Reveal width="100%" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/apply" 
                className="group relative px-8 py-4 bg-primary-dark text-white rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-primary-dark/20"
              >
                <div className="absolute inset-0 w-full h-full bg-accent/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2 font-bold tracking-wide">
                  Join Cadence Collective <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-10 md:bottom-16 left-0 right-0 z-20">
           <div className="max-w-6xl mx-auto px-6">
              <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-lg">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-primary-dark/10">
                    {content.stats.map((stat, index) => (
                      <div key={index} className="flex flex-col items-center justify-center text-center">
                         <div className="text-accent mb-2 opacity-80">{getIcon(stat.iconType)}</div>
                         <span className="font-heading text-3xl font-bold text-primary-dark">{stat.value}</span>
                         <span className="text-xs uppercase tracking-wider text-primary-dark/60 mt-1">{stat.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- MISSION & VISION SECTION --- */}
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

      {/* --- OUR STORY SECTION (Timeline Style) --- */}
      <section id="about" className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-5xl mx-auto">
           <Reveal>
             <h2 className="font-heading text-5xl font-bold text-primary-dark mb-20 text-center">Our Journey</h2>
           </Reveal>

           {content.story.map((block, index) => {
             const isEven = index % 2 === 0;
             return (
              <div key={block.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 last:mb-0">
                <div className={`${isEven ? 'order-2 md:order-1' : ''}`}>
                  <Reveal>
                      <span className="text-6xl font-heading font-bold text-primary-light absolute -z-10 -translate-y-1/2 -translate-x-4">{block.year}</span>
                      <h3 className="text-2xl font-bold text-primary-dark mb-4 mt-2">{block.title}</h3>
                      <div className="space-y-4 text-lg text-primary-dark/70 leading-relaxed">
                        {block.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                  </Reveal>
                </div>
                <div className={`${isEven ? 'order-1 md:order-2' : ''} relative`}>
                   <div className={`absolute -z-10 w-full h-full ${isEven ? '-right-4 -bottom-4 border-2 border-accent/20 rounded-2xl' : '-left-4 -top-4 bg-primary-light rounded-2xl'}`}></div>
                   <img src={block.image} alt={block.title} className={`rounded-2xl shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500 w-full ${index === 2 ? 'rounded-full aspect-square object-cover max-w-md mx-auto' : ''}`} />
                </div>
              </div>
             );
           })}

        </div>
      </section>

      {/* --- IMPACT SECTION (MARQUEE) --- */}
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

      {/* --- TEAM SECTION --- */}
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
      </section>

      {/* --- GALLERY SECTION (BENTO) --- */}
      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <Reveal>
                <h2 className="font-heading text-5xl font-bold text-primary-dark">Moments in <br/><span className="text-accent">Motion</span></h2>
              </Reveal>
              <Link to="https://instagram.com" target="_blank" className="hidden md:flex items-center gap-2 text-primary-dark hover:text-accent font-bold transition-colors mt-4 md:mt-0">
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
                    <h3 className="font-heading text-2xl text-primary-dark">Teaching <br/>Sessions</h3>
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

      {/* --- PRE-FOOTER CTA --- */}
      <section className="py-24 px-6 bg-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">Ready to find your voice?</h2>
          <p className="text-primary-light/80 text-xl mb-10 font-light">Join a community that champions individuality, shared rhythm, and the courage to create.</p>
          <Link 
            to="/apply" 
            className="inline-block px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-white hover:text-primary-dark transition-all duration-300 transform hover:-translate-y-1"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* --- TEAM MODAL --- */}
      <AnimatePresence>
        {selectedMember && (
          <TeamModal 
            member={selectedMember} 
            isOpen={!!selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}