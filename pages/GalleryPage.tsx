import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  video?: string;
  reverse?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'cohort1-online',
    title: 'Cohort 1 — Online Beginning',
    subtitle: 'Where it started.',
    description: "Cadence Collective's first cohort met online during the pandemic — small, experimental, and built entirely on curiosity. Low production, high commitment. This group proved the idea worked.",
    image: '/images/gallery/cohort-1-online.jpeg',
    imageAlt: 'Cohort 1 Online Sessions',
    reverse: false,
  },
  {
    id: 'cohort2',
    title: 'Cohort 2 — Growing Together',
    subtitle: 'A community finding its voice.',
    description: 'Cohort 2 brought collaboration to the forefront, blending choir work with performance training. Students learned not just how to sing together, but how to listen, support, and perform as one.',
    image: '/images/gallery/cohort-2.jpeg',
    imageAlt: 'Cohort 2 Group Sessions',
    reverse: true,
  },
  {
    id: 'facebook-live',
    title: 'Cohort 2 — Facebook Live Showcase',
    subtitle: 'First exposure, real pressure, genuine wins.',
    description: 'Students performed solo pieces in a live-streamed showcase watched by over 500 viewers, followed by a full choir performance. For many, it was their first experience performing publicly — and it showed how far they\'d come.',
    image: '/images/gallery/cohort-1-farewell.png',
    imageAlt: 'Facebook Live Showcase',
    video: '/videos/gallery/Facebook_Live_clips.mp4',
    reverse: false,
  },
  {
    id: 'cohort3',
    title: 'Cohort 3 — Onsite & In Sync',
    subtitle: 'From concept to collective.',
    description: 'Cohort 3 marked a shift to in-person learning — a fully realised program rooted in confidence, creativity, and shared purpose. This was Cadence Collective stepping into its identity.',
    image: '/images/gallery/cohort-3-group.png',
    imageAlt: 'Cohort 3 Group Picture',
    reverse: false,
  },
  {
    id: 'cohort3-live',
    title: 'Cohort 3 Choir — Live Performance',
    subtitle: 'Real stage. Real audience. Real growth.',
    description: 'Six students performed live at the Regent Performing Arts Evening, singing before 200+ audience members under live direction. A defining moment of stage presence, discipline, and confidence.',
    image: '/images/gallery/cohort-1.jpeg',
    imageAlt: 'Cohort 3 Choir Live Performance',
    reverse: true,
  },
];

const GalleryItem: React.FC<{ item: GalleryItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center mb-24 lg:mb-32`}
    >
      {/* Media Section */}
      <div className="w-full lg:w-1/2">
        <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-accent/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
          {item.video ? (
            <video
              src={item.video}
              poster={item.image}
              controls
              className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={item.image}
              alt={item.imageAlt}
              className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-4xl lg:text-5xl font-bold text-primary-dark mb-3">
              {item.title}
            </h3>
            <p className="text-accent text-xl font-semibold italic mb-4">
              {item.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-primary-dark/80 text-lg leading-relaxed"
        >
          {item.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="w-24 h-1 bg-accent"
          style={{ originX: item.reverse ? 1 : 0 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary-dark to-primary-dark/95">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-white mb-6">
              Our Journey in
              <span className="text-accent"> Frames</span>
            </h1>
            <p className="text-primary-light/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              From online beginnings to live performances — witness the evolution of Cadence Collective through the cohorts that shaped our story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Items */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {galleryItems.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};
