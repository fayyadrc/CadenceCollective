export interface TeamMember {
  id: string; // Added ID for editing stability
  name: string;
  role: string;
  shortBio: string;
  image?: string;
  imagePosition?: string; // CSS object-position value (e.g., "center top", "right center")
  imageScale?: number; // Scale factor for the image (e.g., 1.5 to zoom in)
  imageTranslateY?: string; // CSS translateY value (e.g., "-20%" to move up)
  fullBio?: string;
  whyStarted?: string;
  credentials?: string[];
  featuredIn?: { name: string; url?: string }[];
  personalConnection?: string;
  roleFocus?: string;
  instagram?: string; // Instagram handle or URL
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  iconType: 'globe' | 'users' | 'award' | 'mic';
}

export interface StoryBlock {
  id: string;
  year: string;
  title: string;
  paragraphs: string[];
  image: string;
}

export interface SiteContent {
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
  };
  stats: StatItem[];
  mission: {
    title: string;
    text: string;
    subText: string;
  };
  vision: {
    title: string;
    text: string;
  };
  story: StoryBlock[];
  testimonials: Testimonial[];
  team: TeamMember[];
}

export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  span: 'small' | 'medium' | 'large';
}
