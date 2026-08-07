import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Search,
  ArrowRight,
  BookOpen,
  Presentation,
  FileText,
  Scan,
  Mic,
  Network,
  Check,
  ChevronDown,
  Star,
  Zap,
  Globe2,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface LandingPageProps {
  onStartResearch: (topic: string) => void;
  onOpenAuth: () => void;
  onOpenDBModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartResearch,
  onOpenAuth,
  onOpenDBModal,
}) => {
  const [topicInput, setTopicInput] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const sampleTopics = [
    'Artificial Intelligence',
    'Quantum Computing',
    'SpaceX Starship',
    'Tesla FSD & Robotics',
    'Climate Change Solutions',
    'Nuclear Fusion Energy',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicInput.trim()) {
      onStartResearch(topicInput.trim());
    }
  };

  const features = [
    {
      title: 'Autonomous Research Engine',
      description: 'Synthesizes multi-source research from Wikipedia, arXiv, Google Scholar, and news papers with verified citations.',
      icon: Search,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'AI Slide Generator (5-6 Slides)',
      description: 'Generates polished, presenter-ready slide decks with bullet points, charts, and key takeaways exportable to PPTX.',
      icon: Presentation,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Publication PDF Reports',
      description: 'Generates structured research papers complete with Cover Page, Table of Contents, Executive Summary, and References.',
      icon: FileText,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'OCR Text & Table Extractor',
      description: 'Upload scanned PDFs or images to instantly extract structured tables, verbatim text, summaries, and translations.',
      icon: Scan,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Multilingual Voice Assistant',
      description: 'Ask questions, create slides, or summarize topics via voice commands with full English and Hindi TTS support.',
      icon: Mic,
      gradient: 'from-rose-500 to-red-500',
    },
    {
      title: 'Interactive AI Mind Maps',
      description: 'Visualizes complex research domains into interactive node hierarchies for effortless structural understanding.',
      icon: Network,
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Evelyn Reed',
      role: 'Senior Research Fellow, MIT AI Lab',
      comment: 'DeepResearch AI reduced our paper literature synthesis time by 80%. The arXiv citation grounding is remarkably reliable.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Strategy, TechVentures',
      comment: 'Generating a 6-slide executive deck in 15 seconds before investor calls has completely transformed our workflow.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Priya Sharma',
      role: 'PhD Scholar, Quantum Physics',
      comment: 'The voice assistant in Hindi and English plus OCR paper scanning makes digesting technical whitepapers effortless.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      q: 'How does DeepResearch AI synthesize research data?',
      a: 'DeepResearch AI utilizes Gemini 3.6 Flash coupled with search grounding across academic platforms (arXiv, Google Scholar, Wikipedia) to aggregate, cross-reference, and structure key facts, empirical charts, timeline events, and citations.',
    },
    {
      q: 'Can I export reports and presentation slides?',
      a: 'Yes! Slide decks can be viewed interactively or downloaded. Reports can be exported directly as Markdown files, Notion documents, or saved to your personal dashboard.',
    },
    {
      q: 'Does the OCR module support table extraction?',
      a: 'Absolutely. The OCR engine uses multimodal vision intelligence to extract both continuous body text and complex 2D table structures from uploaded images and PDFs.',
    },
    {
      q: 'Is voice interaction available in multiple languages?',
      a: 'Yes! The voice assistant supports both English and Hindi speech recognition and text-to-speech feedback.',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#06060a] text-zinc-100 min-h-screen">
      {/* Background Animated Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative px-4 pt-12 pb-20 md:pt-20 md:pb-32 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-500/10 mb-6 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Next-Generation GenAI Research Assistant</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gradient max-w-4xl mx-auto leading-tight">
            Research Any Topic & Generate Reports, Slides, and Mind Maps Instantly
          </h1>

          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-normal">
            DeepResearch AI synthesizes executive summaries, academic citations, arXiv sources, 6-slide presentation decks, voice responses, and OCR table extraction in seconds.
          </p>

          {/* Interactive Search Bar Launcher */}
          <div className="mt-10 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-2xl backdrop-blur-2xl focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/40 transition-all"
            >
              <Search className="ml-3.5 h-5 w-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Enter any topic (e.g., Quantum Computing, Artificial Intelligence)..."
                className="w-full bg-transparent px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 transition-all shrink-0"
              >
                <span>Synthesize AI Research</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Quick Sample Topic Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-zinc-500 font-medium mr-1">Try searching:</span>
              {sampleTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => onStartResearch(topic)}
                  className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-zinc-300 hover:border-indigo-500/50 hover:bg-white/[0.06] transition-all"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <p className="text-2xl font-extrabold text-indigo-400">100M+</p>
              <p className="text-xs text-zinc-400 mt-1">Indexed Sources & Papers</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <p className="text-2xl font-extrabold text-purple-400">&lt; 10s</p>
              <p className="text-xs text-zinc-400 mt-1">Synthesis Latency</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <p className="text-2xl font-extrabold text-emerald-400">99.2%</p>
              <p className="text-xs text-zinc-400 mt-1">Citation Accuracy Score</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <p className="text-2xl font-extrabold text-pink-400">100%</p>
              <p className="text-xs text-zinc-400 mt-1">Full-Stack Production Ready</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRODUCT FEATURES SECTION */}
      <section className="px-4 py-16 bg-white/[0.01] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Complete Autonomous AI Research Suite
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Everything required to go from raw prompt to academic reports, slides, mind maps, and voice responses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feat.gradient} p-0.5 shadow-lg mb-5`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07080e]">
                      <Icon className="h-5 w-5 text-indigo-300" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL STACK ARCHITECTURE CARD */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-zinc-950 via-indigo-950/30 to-zinc-950 p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-3">
                <Cpu className="h-3.5 w-3.5" />
                Backend Architecture Verified
              </div>
              <h3 className="text-2xl font-bold text-white">
                Powered by FastAPI, PostgreSQL, MongoDB, Redis & Gemini 3.6 Flash
              </h3>
              <p className="mt-2 text-xs text-zinc-300 max-w-xl">
                Explore the complete production-grade backend tables, JWT auth, OCR pipelines, and Docker deployment configurations.
              </p>
            </div>

            <button
              onClick={onOpenDBModal}
              className="flex items-center gap-2 rounded-xl bg-white text-zinc-950 font-bold px-5 py-3 text-xs shadow-xl hover:bg-zinc-100 transition-all shrink-0"
            >
              <span>View Stack Schemas</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="px-4 py-16 bg-white/[0.01] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-white">Trusted by Researchers & Scholars Worldwide</h2>
            <p className="mt-2 text-xs text-zinc-400">
              Empowering university labs, PhD scholars, and executive strategy teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100">{t.name}</h4>
                    <p className="text-[11px] text-zinc-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white">Transparent Plans</h2>
          <p className="mt-2 text-xs text-zinc-400">
            Choose the ideal tier for individual research or lab teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-200">Free Scholar</h3>
              <p className="mt-1 text-xs text-zinc-400">For students & quick queries</p>
              <div className="mt-4 text-3xl font-black text-white">$0 <span className="text-xs font-normal text-zinc-400">/mo</span></div>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> 10 Deep Researches/mo</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Wikipedia & arXiv Sources</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> 5-Slide Presentation Deck</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Basic OCR Text Extraction</li>
              </ul>
            </div>
            <button
              onClick={onOpenAuth}
              className="mt-8 w-full rounded-xl border border-white/10 bg-white/[0.05] py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Analyst (Featured) */}
          <div className="rounded-2xl border-2 border-indigo-500/80 bg-[#0d0e18] p-6 flex flex-col justify-between relative shadow-2xl shadow-indigo-500/20">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-lg">
              Most Popular
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Pro Analyst</h3>
              <p className="mt-1 text-xs text-indigo-300">For PhDs, CTOs & strategists</p>
              <div className="mt-4 text-3xl font-black text-white">$29 <span className="text-xs font-normal text-zinc-400">/mo</span></div>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-200">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Unlimited AI Researches</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Multi-Source Academic Grounding</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> 6-Slide Decks + PPTX Export</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> OCR Table & Vision Scanner</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> English & Hindi Voice Assistant</li>
              </ul>
            </div>
            <button
              onClick={onOpenAuth}
              className="mt-8 w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-200">Enterprise Lab</h3>
              <p className="mt-1 text-xs text-zinc-400">For research labs & teams</p>
              <div className="mt-4 text-3xl font-black text-white">$99 <span className="text-xs font-normal text-zinc-400">/mo</span></div>
              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Custom API Key Integration</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Team Collaboration Workspace</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Export to Notion & Markdown</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-400" /> Dedicated Cloud SQL Instance</li>
              </ul>
            </div>
            <button
              onClick={onOpenAuth}
              className="mt-8 w-full rounded-xl border border-white/10 bg-white/[0.05] py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 transition-colors"
            >
              Contact Enterprise
            </button>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="px-4 py-16 max-w-3xl mx-auto border-t border-white/10">
        <h2 className="text-2xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-left text-xs font-semibold text-zinc-200 hover:bg-white/[0.04] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs leading-relaxed text-zinc-400 border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#040407] py-10 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="font-bold text-zinc-300">DeepResearch AI Platform</span>
          </div>
          <p>© 2026 DeepResearch AI Inc. Engineered with React 19, Express & Gemini 3.6 Flash.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenDBModal} className="text-indigo-400 hover:underline">
              Architecture & Schemas
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
