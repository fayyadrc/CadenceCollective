import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const galleryItems = [
  {
    id: "video",
    type: "video",
    src: "/images/gallery/facebook-live-clips.mp4",
    alt: "Live Performance",
    className: "md:col-span-2 md:row-span-2",
    label: "Live Performances",
  },
  {
    id: "cohort3",
    type: "image",
    src: "/images/gallery/cohort-3-group.png",
    alt: "Cohort 3 Group",
    className: "md:col-span-2 md:row-span-1",
    label: "Cohort 3",
  },
  {
    id: "cohort1",
    type: "image",
    src: "/images/gallery/cohort-1.jpeg",
    alt: "Cohort 1",
    className: "md:col-span-1 md:row-span-1",
    label: "Cohort 1",
  },
  {
    id: "cohort2",
    type: "image",
    src: "/images/gallery/cohort-2.jpeg",
    alt: "Cohort 2",
    className: "md:col-span-1 md:row-span-1",
    label: "Cohort 2",
  },
  {
    id: "online",
    type: "image",
    src: "/images/gallery/cohort-1-online.jpeg",
    alt: "Online Sessions",
    className: "md:col-span-1 md:row-span-1",
    label: "Remote Learning",
  },
  {
    id: "farewell",
    type: "image",
    src: "/images/gallery/cohort-1-farewell.png",
    alt: "Farewell Message",
    className: "md:col-span-1 md:row-span-1",
    label: "Community",
  },
  {
    id: "feedback",
    type: "image",
    src: "/images/gallery/cohort-1-feedback.jpeg",
    alt: "Student Feedback",
    className: "md:col-span-2 md:row-span-1",
    label: "Feedback",
  },
];

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <Reveal>
            <h2 className="font-heading text-5xl font-bold text-primary-dark">
              Moments in <br />
              <span className="text-accent">Motion</span>
            </h2>
          </Reveal>
          <div className="flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-0">
            <Link
              to="/gallery"
              className="flex items-center gap-2 text-primary-dark hover:text-accent font-bold transition-colors"
            >
              View Full Gallery <ArrowRight size={16} />
            </Link>
            <Link
              to="https://www.instagram.com/cadence.collective_/"
              target="_blank"
              className="hidden md:flex items-center gap-2 text-primary-dark/60 hover:text-accent font-medium transition-colors text-sm"
            >
              <Instagram size={16} /> Follow on Instagram
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-2xl ${item.className} ${index % 2 === 0 ? "bg-primary-light/20" : "bg-primary-light/10"}`}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.label}
                </span>
              </div>
            </div>
          ))}

          {/* Instagram CTA Card */}
          <Link
            to="https://www.instagram.com/cadence.collective_/"
            target="_blank"
            className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl bg-primary-dark flex flex-col justify-center items-center text-white border-2 border-transparent hover:border-accent transition-colors"
          >
            <Instagram
              size={48}
              className="mb-4 text-accent group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-bold">Follow Us</span>
            <span className="text-sm opacity-70">@cadence.collective_</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
