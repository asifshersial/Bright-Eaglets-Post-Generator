import React, { useState } from 'react';
import { PostConfig } from '../types';
import { COLOR_THEMES, DEFAULT_FONTS, ASPECT_RATIOS, TECH_BACKGROUNDS } from '../constants';
import { Wand2, Download, Image as ImageIcon, Type, User, Phone, Globe, Upload, Layout, Droplets, Layers, ZoomIn, Wallpaper, PanelBottom, Bold, Dice5, Activity, FileImage, Type as TypeIcon } from 'lucide-react';

interface EditorPanelProps {
  config: PostConfig;
  setConfig: React.Dispatch<React.SetStateAction<PostConfig>>;
  onGenerateQuote: (topic: string) => Promise<void>;
  isGenerating: boolean;
  onExport: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ config, setConfig, onGenerateQuote, isGenerating, onExport }) => {
  const [topic, setTopic] = useState('Artificial Intelligence');
  const [fontList, setFontList] = useState(DEFAULT_FONTS);

  const handleChange = (key: keyof PostConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('backgroundImageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('textBackgroundImageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const setRandomTechBackground = () => {
    const randomBg = TECH_BACKGROUNDS[Math.floor(Math.random() * TECH_BACKGROUNDS.length)];
    handleChange('backgroundImageUrl', randomBg);
  };

  const handleFooterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('footerImageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      // Clean name: remove extension
      const fontName = file.name.replace(/\.[^/.]+$/, "");
      const fontFace = new FontFace(fontName, buffer);
      
      const loadedFont = await fontFace.load();
      document.fonts.add(loadedFont);
      
      // Update available fonts list
      setFontList(prev => [...prev, { label: fontName, value: `"${fontName}"` }]);
      // Automatically select the new font
      handleChange('fontFamily', `"${fontName}"`);
      
    } catch (err) {
      console.error("Error loading font:", err);
      alert("Failed to load font. Please ensure it is a valid font file (TTF/OTF/WOFF).");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 h-full overflow-y-auto flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <span className="bg-slate-900 text-white p-1 rounded">Editor</span>
        Customize Post
      </h2>

      <div className="space-y-6 flex-1">
        
        {/* Quote Generation Section */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Wand2 size={16} className="text-purple-600" />
            AI Quote Generator
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Topic (e.g., Success, AI)"
            />
            <button
              onClick={() => onGenerateQuote(topic)}
              disabled={isGenerating}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isGenerating ? 'Thinking...' : 'Generate'}
            </button>
          </div>
        </div>

        {/* Text Fields */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
               <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                <Type size={14} /> Font Style
              </label>
              <label className="cursor-pointer text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded flex items-center gap-1 transition-colors">
                <Upload size={12} />
                Install New
                <input 
                  type="file" 
                  accept=".ttf,.otf,.woff,.woff2" 
                  className="hidden" 
                  onChange={handleFontUpload}
                />
              </label>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {fontList.map((font, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChange('fontFamily', font.value)}
                  className={`px-2 py-1.5 text-sm rounded border truncate ${
                    config.fontFamily === font.value 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                  style={{ fontFamily: font.value }}
                  title={font.label}
                >
                  {font.label}
                </button>
              ))}
            </div>

            {/* Font Options: Size, Bold, Shadow */}
            <div className="flex gap-2 mb-4 items-center bg-slate-50 p-2 rounded border border-slate-100">
              <div className="flex-1">
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  Size: {config.fontSize}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="80"
                  step="1"
                  value={config.fontSize}
                  onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <button
                onClick={() => handleChange('isBold', !config.isBold)}
                className={`p-2 rounded border transition-colors ${
                  config.isBold 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                title="Toggle Bold"
              >
                <Bold size={18} />
              </button>
              <button
                onClick={() => handleChange('textShadow', !config.textShadow)}
                className={`p-2 rounded border transition-colors ${
                  config.textShadow 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                title="Toggle Text Shadow"
              >
                <TypeIcon size={18} className="drop-shadow-sm" />
              </button>
            </div>

            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
               Quote Text (Urdu)
            </label>
            <textarea
              value={config.quote}
              onChange={(e) => handleChange('quote', e.target.value)}
              rows={4}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-md text-right text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              style={{ fontFamily: config.fontFamily, fontWeight: config.isBold ? 'bold' : 'normal' }}
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
              <User size={14} /> Name
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                <Phone size={14} /> Phone
              </label>
              <input
                type="text"
                value={config.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
            <div>
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                <Globe size={14} /> Website
              </label>
              <input
                type="text"
                value={config.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Layout & Media */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
           
           <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
              <Layout size={14} /> Aspect Ratio
            </label>
            <div className="flex gap-2">
              {ASPECT_RATIOS.map((ratio) => (
                <button
                  key={ratio.value}
                  onClick={() => handleChange('aspectRatio', ratio.value)}
                  className={`flex-1 py-2 px-1 text-xs sm:text-sm font-medium rounded-md border transition-all ${
                    config.aspectRatio === ratio.value
                      ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {ratio.label.split(' ')[0]} <span className="text-xs opacity-75 block sm:inline">({ratio.label.split('(')[1].replace(')', '')})</span>
                </button>
              ))}
            </div>
           </div>

           {/* Subject Image Controls */}
           <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
              <ImageIcon size={14} /> Subject Image
            </label>
            <div className="space-y-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                {config.imageUrl ? (
                  <img src={config.imageUrl} alt="preview" className="w-12 h-12 rounded object-cover border border-slate-200" />
                ) : (
                   <div className="w-12 h-12 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-300">
                    <User size={20} />
                  </div>
                )}
                <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                {config.imageUrl && (
                  <button onClick={() => handleChange('imageUrl', null)} className="text-red-500 text-xs hover:underline">Remove</button>
                )}
              </div>
              
              {config.imageUrl && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                      <Droplets size={12} /> Opacity: {config.imageOpacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.imageOpacity}
                      onChange={(e) => handleChange('imageOpacity', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                      <ZoomIn size={12} /> Zoom: {config.imageScale}%
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="200"
                      step="5"
                      value={config.imageScale}
                      onChange={(e) => handleChange('imageScale', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>
           </div>
           
           {/* Text Area Background / Logo Layer */}
           <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
              <FileImage size={14} /> Text Background / Logo
            </label>
            <div className="space-y-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                {config.textBackgroundImageUrl ? (
                   <img src={config.textBackgroundImageUrl} alt="text-bg-preview" className="w-12 h-12 rounded object-cover border border-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-300">
                    <FileImage size={20} />
                  </div>
                )}
                <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleTextBackgroundUpload}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300"
                    />
                </div>
                {config.textBackgroundImageUrl && (
                  <button onClick={() => handleChange('textBackgroundImageUrl', null)} className="text-red-500 text-xs hover:underline">Clear</button>
                )}
              </div>
              
              {config.textBackgroundImageUrl && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                      <Droplets size={12} /> Opacity: {config.textBackgroundOpacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.textBackgroundOpacity}
                      onChange={(e) => handleChange('textBackgroundOpacity', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                    />
                  </div>
                </div>
              )}
            </div>
           </div>

           {/* Background Image Controls */}
           <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
              <Wallpaper size={14} /> Main Background
            </label>
            <div className="space-y-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
              {/* Random Tech BG Button */}
              <button 
                onClick={setRandomTechBackground}
                className="w-full py-2 bg-slate-800 text-white rounded text-xs font-medium flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
              >
                <Dice5 size={14} />
                Random Tech Background
              </button>

              <div className="flex items-center gap-3">
                {config.backgroundImageUrl ? (
                   <img src={config.backgroundImageUrl} alt="bg-preview" className="w-12 h-12 rounded object-cover border border-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-300">
                    <Wallpaper size={20} />
                  </div>
                )}
                <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundUpload}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300"
                    />
                </div>
                {config.backgroundImageUrl && (
                  <button onClick={() => handleChange('backgroundImageUrl', null)} className="text-red-500 text-xs hover:underline">Clear</button>
                )}
              </div>
              
              {config.backgroundImageUrl && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                      <Droplets size={12} /> BG Opacity: {config.backgroundOpacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.backgroundOpacity}
                      onChange={(e) => handleChange('backgroundOpacity', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                      <ZoomIn size={12} /> BG Zoom: {config.backgroundScale}%
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="200"
                      step="5"
                      value={config.backgroundScale}
                      onChange={(e) => handleChange('backgroundScale', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
                      <Activity size={12} /> BG Blur: {config.backgroundBlur}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={config.backgroundBlur}
                      onChange={(e) => handleChange('backgroundBlur', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                    />
                  </div>
                </div>
              )}
            </div>
           </div>

           {/* Footer & Color Theme */}
           <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
               <PanelBottom size={14} /> Footer Style
            </label>
            
            {/* Custom Footer Upload */}
            <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
               <label className="block text-xs font-medium text-slate-600 mb-2">Custom Footer Image (Optional)</label>
               <div className="flex items-center gap-2">
                 <input
                    type="file"
                    accept="image/*"
                    onChange={handleFooterUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300"
                  />
                  {config.footerImageUrl && (
                    <button onClick={() => handleChange('footerImageUrl', null)} className="text-red-500 text-xs hover:underline whitespace-nowrap">Remove</button>
                  )}
               </div>
               <p className="text-[10px] text-slate-400 mt-1">Replaces the standard gradient footer.</p>
            </div>

            {!config.footerImageUrl && (
              <>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Color Theme</label>
                <div className="flex gap-2">
                  {COLOR_THEMES.map((theme, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleChange('themeColorFrom', theme.from);
                        handleChange('themeColorTo', theme.to);
                      }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.from} ${theme.to} ${
                        config.themeColorFrom === theme.from ? 'ring-2 ring-offset-2 ring-slate-800' : ''
                      }`}
                      title={theme.label}
                    />
                  ))}
                </div>
              </>
            )}
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <input
                  type="checkbox"
                  id="transparentBg"
                  checked={config.transparentBackground}
                  onChange={(e) => handleChange('transparentBackground', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="transparentBg" className="text-sm text-slate-700 font-medium cursor-pointer flex items-center gap-2">
                  <Layers size={14} />
                  Transparent Background
                </label>
            </div>
           </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <button
          onClick={onExport}
          className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Download size={20} />
          Download Post
        </button>
      </div>
    </div>
  );
};