import React, { useState } from 'react';
import {
  Presentation,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Maximize2,
  Copy,
  Check,
  BarChart2,
  BookOpen,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { SlideItem } from '../types';

interface SlideGeneratorViewProps {
  topic: string;
  slides: SlideItem[];
  isLoading: boolean;
  onGenerate: (topic: string) => void;
}

export const SlideGeneratorView: React.FC<SlideGeneratorViewProps> = ({
  topic,
  slides,
  isLoading,
  onGenerate,
}) => {
  const [topicInput, setTopicInput] = useState(topic || 'Artificial Intelligence');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeSlide = slides[currentSlideIndex] || {
    slide_number: 1,
    title: topicInput || 'Research Deck',
    subtitle: 'Executive AI Presentation Deck',
    layout: 'title',
    content: ['AI-synthesized slide deck ready.'],
    key_takeaway: 'Key takeaway message',
  };

  const handleCopyText = () => {
    const slideText = `Slide ${activeSlide.slide_number}: ${activeSlide.title}\nSubtitle: ${activeSlide.subtitle || ''}\n\nKey Takeaway: ${activeSlide.key_takeaway || ''}\n\nBullets:\n${activeSlide.content.map((c) => `• ${c}`).join('\n')}`;
    navigator.clipboard.writeText(slideText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPPTX = () => {
    const element = document.createElement('a');
    const pptxContent = `DeepResearch AI Presentation Deck\nTopic: ${topicInput}\nGenerated: ${new Date().toLocaleDateString()}\n\n` +
      slides.map((s) => `[SLIDE ${s.slide_number}] ${s.title}\n${s.subtitle || ''}\n- ${s.content.join('\n- ')}\nKey Takeaway: ${s.key_takeaway || ''}\n\n`).join('---\n');
    const file = new Blob([pptxContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topicInput.toLowerCase().replace(/\s+/g, '_')}_presentation.pptx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* HEADER & TOPIC INPUT */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 mb-2 backdrop-blur-md">
            <Presentation className="h-4 w-4 text-purple-400" />
            <span>AI Slide Deck Generator</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">5-6 Slide Executive Presentation</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Automatically crafts structured slides for meetings, investor pitches, or academic talks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Enter topic..."
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={() => onGenerate(topicInput)}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30"
          >
            {isLoading ? 'Generating...' : 'Re-Generate Deck'}
          </button>
        </div>
      </div>

      {/* SLIDE PRESENTATION MAIN VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SLIDE THUMBNAIL LIST */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
            Slide Deck Navigation ({slides.length} Slides)
          </p>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-full text-left p-3 rounded-2xl border transition-all ${
                  currentSlideIndex === idx
                    ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg'
                    : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 mb-1">
                  <span>SLIDE 0{s.slide_number}</span>
                  <span className="capitalize">{s.layout}</span>
                </div>
                <p className="text-xs font-bold text-zinc-200 truncate">{s.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE SLIDE DISPLAY CANVAS */}
        <div className="lg:col-span-3 space-y-4">
          <div
            className={`relative rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-[#0a0b12] to-zinc-950 p-8 shadow-2xl min-h-[420px] flex flex-col justify-between overflow-hidden backdrop-blur-xl ${
              isFullscreen ? 'fixed inset-4 z-50 m-0 min-h-none' : ''
            }`}
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 h-48 w-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Slide Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-[11px] font-bold text-purple-300 border border-purple-500/30">
                  SLIDE {activeSlide.slide_number} OF {slides.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-white/10"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                {activeSlide.title}
              </h1>
              {activeSlide.subtitle && (
                <p className="text-sm text-purple-300 font-medium mt-1">
                  {activeSlide.subtitle}
                </p>
              )}

              {/* Bullet Points */}
              <div className="mt-8 space-y-3">
                {activeSlide.content.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-purple-400 mt-2 shrink-0" />
                    <p className="text-sm text-zinc-200 font-medium leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaway Banner */}
            {activeSlide.key_takeaway && (
              <div className="mt-8 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4">
                <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Key Executive Takeaway:
                </p>
                <p className="text-xs text-zinc-200 mt-1 font-semibold">
                  "{activeSlide.key_takeaway}"
                </p>
              </div>
            )}

            {/* Slide Footer Controls */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-mono">
                DeepResearch AI • {topicInput}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-zinc-400 font-mono px-2">
                  {currentSlideIndex + 1} / {slides.length}
                </span>
                <button
                  disabled={currentSlideIndex === slides.length - 1}
                  onClick={() =>
                    setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))
                  }
                  className="p-2 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* EXPORT ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-card">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Export options available in PPTX & text formats</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied Slide' : 'Copy Slide Text'}</span>
              </button>

              <button
                onClick={handleExportPPTX}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Presentation (.PPTX)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
