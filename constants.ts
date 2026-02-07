import { PostConfig, AspectRatio } from './types';

export const ASPECT_RATIOS: { label: string; value: AspectRatio; className: string }[] = [
  { label: 'Square (1:1)', value: 'square', className: 'aspect-square' },
  { label: 'Portrait (4:5)', value: 'portrait', className: 'aspect-[4/5]' },
  { label: 'Landscape (16:9)', value: 'landscape', className: 'aspect-video' },
];

export const TECH_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Tech earth
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", // Chips
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Cyberpunk
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", // Code matrix style
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop", // Neon abstract
  "https://images.unsplash.com/photo-1531297461136-82af022f0b79?q=80&w=2070&auto=format&fit=crop", // Abstract tech
];

export const DEFAULT_POST_CONFIG: PostConfig = {
  name: 'Asif Sher Sial',
  quote: 'اے آئی انسان کی جگہ نہیں لے گی، بلکہ وہ انسان جگہ لے لے گا جو اے آئی جانتا ہوگا۔',
  phoneNumber: '0340-025-4444',
  website: 'www.brighteaglets.edu.pk',
  imageUrl: 'https://picsum.photos/800/800',
  themeColorFrom: 'from-blue-700',
  themeColorTo: 'to-purple-700',
  fontFamily: "'Noto Nastaliq Urdu', serif",
  aspectRatio: 'square', // Changed default to square
  imageOpacity: 100,
  transparentBackground: false,
  imageScale: 100,
  
  isBold: false,
  textShadow: false,
  fontSize: 32,

  backgroundImageUrl: TECH_BACKGROUNDS[0],
  backgroundOpacity: 20,
  backgroundScale: 100,
  backgroundBlur: 4,
  
  textBackgroundImageUrl: null,
  textBackgroundOpacity: 15,

  footerImageUrl: null,
};

export const COLOR_THEMES = [
  { label: 'Blue-Purple', from: 'from-blue-700', to: 'to-purple-700' },
  { label: 'Green-Teal', from: 'from-emerald-700', to: 'to-teal-600' },
  { label: 'Red-Orange', from: 'from-red-700', to: 'to-orange-600' },
  { label: 'Dark Slate', from: 'from-slate-800', to: 'to-gray-900' },
];

export const DEFAULT_FONTS = [
  { label: 'Nastaliq', value: "'Noto Nastaliq Urdu', serif" },
  { label: 'Gulzar', value: "'Gulzar', serif" },
  { label: 'Amiri', value: "'Amiri', serif" },
  { label: 'Lateef', value: "'Lateef', serif" },
  { label: 'Rakkas', value: "'Rakkas', serif" },
];