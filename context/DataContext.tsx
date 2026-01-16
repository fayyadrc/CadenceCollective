import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SiteContent,
  TeamMember,
  Testimonial,
  StatItem,
  StoryBlock,
} from "../types";

const defaultContent: SiteContent = {
  hero: {
    tagline: "Established 2020",
    titleLine1: "More than music,",
    titleLine2: "a movement.",
    subtitle:
      "Student-led music education nurturing confidence, creativity, and collaboration in the next generation.",
  },
  stats: [
    { id: "s1", label: "Livestream Viewers", value: "500+", iconType: "globe" },
    { id: "s2", label: "Live Audience", value: "200+", iconType: "users" },
    { id: "s3", label: "Graduates", value: "80+", iconType: "award" },
    { id: "s4", label: "Cohorts", value: "3", iconType: "mic" },
  ],
  mission: {
    title: "Mission",
    text: "To inspire and empower musicians of all ages by providing accessible, student-led music education that nurtures confidence, creativity, and collaboration. Through performance, mentorship, and community, we transform passion into lifelong skills both on and off the stage.",
    subText: "",
  },
  vision: {
    title: "Vision",
    text: "A world where every aspiring musician can find their voice, share their song, and grow in resilience through the unifying power of music.",
  },
  story: [
    {
      id: "st1",
      year: "2020",
      title: "The Spark: Voices of Harmony",
      paragraphs: [
        "Cadence Collective began as a spark of creativity during the winter break of 2020, in the midst of the pandemic. Originally called Voices of Harmony, it was founded by an 11-year-old student with nothing but curiosity and passion.",
        "Armed with just rhythm and tune, she faced the challenge of turning abstract musical ideas into lessons her peers could grasp. That first small class became her first supporters, friends, and the foundation of a dream.",
      ],
      image: "https://picsum.photos/600/400?random=1&grayscale",
    },
    {
      id: "st2",
      year: "2021",
      title: "The Evolution: Cadence Live",
      paragraphs: [
        "Encouraged by the joy of teaching, Jovita relaunched the project in 2021 at her school’s spring camp as Cadence Live. The program now served a larger group, combining choir work and solo training.",
        "The initiative culminated in a showcase for over 500 students, streamed on the school’s social media, giving students their first real taste of exposure and stage presence.",
      ],
      image: "https://picsum.photos/600/400?random=2&grayscale",
    },
    {
      id: "st3",
      year: "Today",
      title: "The Vision: Cadence Collective",
      paragraphs: [
        "Today, Cadence Collective is more than a program, it is a vision. Jovita aims to reach passionate musicians of all ages, both locally and internationally.",
        "Beyond performance, Cadence Collective nurtures lifelong values: confidence, resilience, collaboration, and creativity; through the music that has shaped her own life.",
      ],
      image: "https://picsum.photos/600/400?random=3&grayscale",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Cadence Collective helped me build confidence in my vocals... I definitely feel my skills have improved.",
      author: "Eliza",
      role: "Year 7",
    },
    {
      id: "t2",
      quote:
        "Working on our solos was my favourite moment because it made me feel like my voice had space to grow.",
      author: "Nabiha",
      role: "Year 7",
    },
    {
      id: "t3",
      quote:
        "It was fun, interactive, and genuinely enjoyable. Even though I couldn't turn on my camera... I still felt included.",
      author: "Serah",
      role: "Year 10",
    },
    {
      id: "t4",
      quote: "The perfect place for me to overcome my stage fear.",
      author: "Nandana",
      role: "Year 10",
    },
  ],
  team: [
    {
      id: "tm1",
      name: "Jovita",
      role: "Founder & Vocalist",
      shortBio:
        "Blends technical precision with raw emotional expression. Founder of Cadence Collective. Three-time World Champion at WCOPA 2022.",
      image: "/team/jovita.jpg",
      instagram: "https://www.instagram.com/jovitabhaumik/",
      fullBio:
        "Jovita Bhaumik is a singer-songwriter, performing artist, and the founder of Cadence Collective. She blends technical precision with raw emotional expression, creating work that feels honest, intentional, and creatively daring. Her artistry centres on meaningful storytelling and elevating the voices of young performers.",
      whyStarted:
        "Cadence Collective was born from a desire to build a space where creativity feels honest, collaborative, and unapologetically real. What began as a personal outlet for expression grew into a community that champions individuality, shared rhythm, and the courage to create without apology. It is a place where students explore ideas, stories, and emotions with confidence and authenticity.",
      credentials: [
        "Founder of Cadence Collective – 3 cohorts, 80+ graduates (2021–present)",
        "Brand Ambassador, Young Talent Music Competition (2021)",
        "Three-time World Champion, World Championship of Performing Arts (2022) (Gold & Bronze in Vocals)",
        "Distinction, Trinity Rock & Pop Vocals Grade 8 (2023)",
        "Debut single 'Loveless' released across all major platforms (2024)",
        "Performed at Carnegie Hall, New York (2024)",
        "Berklee College of Music – Aspire Summer Program Scholar (2025)",
        "Regent Music Scholar, Regent International School (2023–2026)",
      ],
      featuredIn: [
        { name: "Khaleej Times UAE", url: "https://www.khaleejtimes.com/entertainment/music/dubai-teen-berklee-carnegie-hall" },
        { name: "Dubai Eye 103.8", url: "https://www.youtube.com/watch?v=MooiDrcv6Dk" },
        { name: "Talk 100.3", url: "https://www.instagram.com/p/DNnXiRoy1Di/?hl=en" },
        { name: "PHLV Radio", url: "https://www.youtube.com/watch?v=MpOH-m4QZQs" },
        { name: "Music Asia, Los Angeles", url: "https://www.youtube.com/watch?v=74V7XW6f9cw" },
        { name: "Dubai One", url: "https://www.youtube.com/watch?v=NZ22z_HF-Bs" },
        { name: "Teachers Talk Radio", url: "https://open.spotify.com/episode/7z3tNA1Yrgkn6NNvGJqIBF?si=a903842f46e04ebb" },
        { name: "Expat Media UAE", url: "https://www.expatmedia.net/teen-singer-songwriter-jovita-bhaumik-makes-music-dubai/2025/08/" },
      ],
    },
    {
      id: "tm2",
      name: "Isabella",
      role: "Chief Content Officer",
      shortBio:
        "Shapes visual identity and storytelling. Music is her source of emotional clarity. Ensures the Collective's work is authentic and impactful.",
      image: "/team/isabella.png",
      instagram: "https://www.instagram.com/izzy_yarshenko/",
      fullBio:
        "Isabella Yarshenko serves as the Chief Content Officer of Cadence Collective, shaping the visual identity, tone, and storytelling across all platforms. She brings a sharp eye for detail, a clear creative voice, and a commitment to presenting the Collective’s work with authenticity and impact.",
      personalConnection:
        "For Isabella, music has always been a source of inspiration and emotional clarity — a way to express what can’t always be said outright. She’s drawn to the way melodies, lyrics, and rhythms create shared experiences and bring people together. That connection drives her approach to content: intentional, expressive, and rooted in genuine artistry.",
      roleFocus:
        "Isabella curates, edits, and posts content with relevant captions and hashtags, ensuring everything reflects the Collective’s personality while staying engaging, consistent, and creatively aligned.",
    },
    {
      id: "tm3",
      name: "Krish",
      role: "Chief Marketing Officer",
      shortBio:
        "Leads marketing direction. Passionate about merging music and art into a unified creative ecosystem to connect people.",
      image: "/team/krrish.png",
      imagePosition: "center bottom",
      imageScale: 1.8,
      imageTranslateY: "-15%",
      instagram: "https://www.instagram.com/ii.krr1sh/",
      fullBio:
        "Krish leads the marketing direction of Cadence Collective as Chief Marketing Officer. He focuses on shaping brand identity, developing strategy, and expanding the Collective’s reach with campaigns that are bold, thoughtful, and artist-focused.",
      personalConnection:
        "Krish is passionate about merging music and art into a unified creative ecosystem. He values the way music sparks collaboration, fuels expression, and connects people from completely different backgrounds. That belief sits at the core of his work.",
      roleFocus:
        "He drives social media strategy, audience growth, and community engagement — building pathways for the Collective to reach more artists, inspire new audiences, and strengthen its presence across platforms.",
    },
  ],
};

interface DataContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("cadence_content");
    if (savedData) {
      try {
        setContent(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved content", e);
        setContent(defaultContent);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem("cadence_content", JSON.stringify(newContent));
  };

  const resetToDefaults = () => {
    if (
      window.confirm(
        "Are you sure? This will erase all your edits and restore the original website data."
      )
    ) {
      setContent(defaultContent);
      localStorage.setItem("cadence_content", JSON.stringify(defaultContent));
    }
  };

  if (!isLoaded) return null;

  return (
    <DataContext.Provider value={{ content, updateContent, resetToDefaults }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
