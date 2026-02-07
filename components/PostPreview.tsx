import React, { forwardRef } from 'react';
import { PostConfig } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { Facebook, Instagram, Linkedin, Youtube, Globe, Phone } from 'lucide-react';

interface PostPreviewProps {
  config: PostConfig;
}

export const PostPreview = forwardRef<HTMLDivElement, PostPreviewProps>(({ config }, ref) => {
  const aspectRatioClass = ASPECT_RATIOS.find(r => r.value === config.aspectRatio)?.className || 'aspect-square';
  const containerBgClass = config.transparentBackground ? 'bg-transparent' : 'bg-white shadow-2xl';
  
  // If a global background image is set, we make the right text column semi-transparent (glassy)
  // instead of solid slate-50, so the background shows through.
  const contentBgClass = config.transparentBackground 
    ? '' 
    : config.backgroundImageUrl 
      ? 'bg-white/80 backdrop-blur-sm' 
      : 'bg-slate-50';

  return (
    <div 
      ref={ref}
      className={`w-full ${aspectRatioClass} ${containerBgClass} overflow-hidden flex flex-col relative`}
      style={{ userSelect: 'none' }}
    >
      {/* Global Background Image Layer */}
      {config.backgroundImageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={config.backgroundImageUrl} 
            alt="Background" 
            className="w-full h-full object-cover"
            style={{ 
              opacity: config.backgroundOpacity / 100,
              transform: `scale(${config.backgroundScale / 100})`,
              filter: `blur(${config.backgroundBlur}px)`
            }}
            crossOrigin="anonymous"
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        
        {/* Left Side: Image & Name */}
        <div className="md:w-5/12 h-1/2 md:h-full relative overflow-hidden group">
          {config.imageUrl && (
            <img 
              src={config.imageUrl} 
              alt="Portrait" 
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ 
                opacity: config.imageOpacity / 100,
                transform: `scale(${config.imageScale / 100})`
              }}
              crossOrigin="anonymous"
            />
          )}
          
          {/* Lower Third Overlay */}
          <div className="absolute bottom-4 left-0 w-full z-10">
             <div className={`bg-gradient-to-r ${config.themeColorFrom} ${config.themeColorTo} bg-opacity-90 py-3 px-6 shadow-lg transform -skew-x-12 -ml-4 w-11/12`}>
                <h2 className="text-white font-bold text-xl md:text-2xl transform skew-x-12 font-sans tracking-wide uppercase pl-4 drop-shadow-md">
                  {config.name}
                </h2>
             </div>
          </div>
        </div>

        {/* Right Side: Quote */}
        <div className={`md:w-7/12 h-1/2 md:h-full ${contentBgClass} flex items-center justify-center p-8 md:p-12 relative overflow-hidden`}>
           
           {/* Text Background Layer (Logo/Watermark) */}
           {config.textBackgroundImageUrl && (
             <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                <img 
                  src={config.textBackgroundImageUrl} 
                  alt="Text Background"
                  className="w-full h-full object-cover"
                  style={{ opacity: config.textBackgroundOpacity / 100 }}
                  crossOrigin="anonymous"
                />
             </div>
           )}

           {/* Decorative Quotes */}
           <div className={`absolute top-6 right-8 text-6xl text-slate-200 font-serif opacity-50 z-0 ${config.textShadow ? 'drop-shadow-sm' : ''}`}>❝</div>
           
           <div className="w-full relative z-10">
             <p 
               className={`text-slate-800 text-center leading-relaxed whitespace-pre-wrap ${config.textShadow ? 'drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]' : 'drop-shadow-sm'}`}
               style={{ 
                 fontFamily: config.fontFamily,
                 fontSize: `${config.fontSize}px`,
                 fontWeight: config.isBold ? 'bold' : 'normal'
               }}
               dir="rtl"
             >
               {config.quote}
             </p>
           </div>
           
           <div className={`absolute bottom-6 left-8 text-6xl text-slate-200 font-serif opacity-50 transform rotate-180 z-0 ${config.textShadow ? 'drop-shadow-sm' : ''}`}>❝</div>
        </div>
      </div>

      {/* Footer Bar */}
      {config.footerImageUrl ? (
        <div className="w-full z-20 relative">
          <img 
            src={config.footerImageUrl} 
            alt="Footer" 
            className="w-full h-auto object-cover block"
            crossOrigin="anonymous"
          />
        </div>
      ) : (
        <div className={`h-16 bg-gradient-to-r ${config.themeColorFrom} ${config.themeColorTo} flex items-center justify-between px-4 md:px-8 text-white z-20`}>
          {/* Contact Info Group */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm md:text-base font-semibold">
             <div className="flex items-center gap-2">
               <Phone size={18} className="text-white/80" />
               <span>{config.phoneNumber}</span>
             </div>
             <div className="flex items-center gap-2">
               <Globe size={18} className="text-white/80" />
               <span>{config.website}</span>
             </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Facebook size={18} />
            </div>
            <div className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Instagram size={18} />
            </div>
            <div className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Linkedin size={18} />
            </div>
            <div className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Youtube size={18} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

PostPreview.displayName = 'PostPreview';