import React, { useState, useRef } from 'react';
import { PostPreview } from './components/PostPreview';
import { EditorPanel } from './components/EditorPanel';
import { DEFAULT_POST_CONFIG } from './constants';
import { PostConfig } from './types';
import { generateUrduQuote } from './services/geminiService';
import { Layout } from 'lucide-react';
import { toPng } from 'html-to-image';

const App: React.FC = () => {
  const [config, setConfig] = useState<PostConfig>(DEFAULT_POST_CONFIG);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGenerateQuote = async (topic: string) => {
    setIsGenerating(true);
    try {
      const newQuote = await generateUrduQuote(topic);
      setConfig(prev => ({ ...prev, quote: newQuote }));
    } catch (error) {
      alert("Failed to generate quote. Please ensure your API Key is valid.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async () => {
    if (previewRef.current === null) {
      return;
    }

    try {
      // Ensure fonts are fully loaded before capturing
      await document.fonts.ready;

      const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `urdu-post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
      alert('Failed to export image. Please try again or check console for details.');
    }
  };

  // Checkboard pattern for transparent background visualization
  const previewWrapperClass = config.transparentBackground 
    ? "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50" 
    : "bg-white";

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-8 flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-700 to-purple-700 p-3 rounded-lg text-white shadow-lg">
          <Layout size={24} />
        </div>
        <div>
           <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Urdu Post Studio</h1>
           <p className="text-slate-500 text-sm">Create professional social media content in seconds</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Preview */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className={`w-full max-w-3xl ${previewWrapperClass} p-2 rounded-sm shadow-sm border border-slate-200 transition-colors`}>
             <PostPreview ref={previewRef} config={config} />
          </div>
          <div className="mt-4 text-center text-slate-400 text-sm">
             Preview Mode
          </div>
        </div>

        {/* Right Column: Editor */}
        <div className="lg:col-span-4 h-full">
          <EditorPanel 
            config={config} 
            setConfig={setConfig} 
            onGenerateQuote={handleGenerateQuote}
            isGenerating={isGenerating}
            onExport={handleExport}
          />
        </div>

      </main>
    </div>
  );
};

export default App;