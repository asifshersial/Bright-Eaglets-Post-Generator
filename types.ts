export type AspectRatio = 'square' | 'portrait' | 'landscape';

export interface PostConfig {
  name: string;
  quote: string;
  phoneNumber: string;
  website: string;
  imageUrl: string | null;
  themeColorFrom: string;
  themeColorTo: string;
  fontFamily: string;
  aspectRatio: AspectRatio;
  imageOpacity: number;
  transparentBackground: boolean;
  imageScale: number;
  
  // Font options
  isBold: boolean;
  textShadow: boolean;
  fontSize: number;

  // New Background options
  backgroundImageUrl: string | null;
  backgroundOpacity: number;
  backgroundScale: number;
  backgroundBlur: number;

  // Text Area Background options
  textBackgroundImageUrl: string | null;
  textBackgroundOpacity: number;

  // New Footer options
  footerImageUrl: string | null;
}

export interface SocialIconProps {
  className?: string;
}