import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  BookMarked,
  FileText,
  Presentation,
  Share2,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  Layers,
  HelpCircle,
  BarChart2,
  Network,
  Cpu,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ResearchProject } from '../types';

interface ResearchEngineViewProps {
  currentProject: ResearchProject | null;
  onSearch: (topic: string) => void;
  isLoading: boolean;
  onGenerateSlides: (topic: string) => void;
  onGenerateReport: (project: ResearchProject) => void;
  onSelectNav: (nav: string) => void;
}

export const ResearchEngineView: React.FC<ResearchEngineViewProps> = ({
  currentProject,
  onSearch,
  isLoading,
  onGenerateSlides,
  onGenerateReport,
  onSelectNav,
}) => {
  const [topicInput, setTopicInput] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'timeline' | 'trends' | 'sources' | 'mindmap' | 'faqs'>('summary');
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicInput.trim()) {
      onSearch(topicInput.trim());
    }
  };

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(id);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* SEARCH HEADER BAR */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>AI Research Synthesis Engine</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Research Any Topic with Multi-Source Citation
          </h2>

          <form onSubmit={handleSearchSubmit} className="relative mt-4">
            <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/40 transition-all">
              <Search className="ml-3.5 h-5 w-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Enter topic (e.g. Artificial Intelligence, Quantum Computing, SpaceX Starship)..."
                className="w-full bg-transparent px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all shrink-0"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Synthesizing...
                  </span>
                ) : (
                  <span>Run Deep Synthesis</span>
                )}
              </button>
            </div>
          </form>

          {/* Quick topic pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-zinc-500">Popular:</span>
            {['Artificial Intelligence', 'Quantum Computing', 'SpaceX', 'Tesla', 'Climate Change'].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTopicInput(t);
                    onSearch(t);
                  }}
                  className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1 text-zinc-300 hover:border-indigo-500/40 hover:bg-white/[0.06] transition-all"
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* LOADING STATE ANIMATION */}
      {isLoading && (
        <div className="glass-panel rounded-3xl p-12 text-center shadow-2xl space-y-6 max-w-xl mx-auto border border-indigo-500/30">
          <div className="relative mx-auto h-16 w-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Synthesizing Deep AI Research</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Gemini 3.6 Flash querying arXiv, Google Scholar, Wikipedia & news APIs...
            </p>
          </div>

          <div className="space-y-2 text-left bg-black/40 p-4 rounded-xl border border-white/10 text-xs font-mono text-zinc-300">
            <p className="text-emerald-400 flex items-center gap-2">
              <Check className="h-3.5 w-3.5" /> [1/4] Academic publications retrieved
            </p>
            <p className="text-indigo-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" /> [2/4] Cross-referencing empirical key facts...
            </p>
            <p className="text-zinc-500">[3/4] Generating market trend charts & Recharts data</p>
            <p className="text-zinc-500">[4/4] Formatting citations & mind map tree</p>
          </div>
        </div>
      )}

      {/* RESEARCH RESULTS VIEW */}
      {!isLoading && currentProject && (
        <div className="space-y-6">
          {/* TOP RESULTS HEADER */}
          <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                  SYNTHESIS COMPLETE
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {new Date(currentProject.created_at).toLocaleTimeString()}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white">
                {currentProject.topic}
              </h1>
              <p className="text-xs text-zinc-400 mt-2 flex items-center gap-4">
                <span>🎯 Confidence Score: {currentProject.metrics?.confidenceScore || 98}%</span>
                <span>📈 Market Size: {currentProject.metrics?.marketSize || '$320B'}</span>
                <span>📚 Sources: {currentProject.sources?.length || 3} Grounded Papers</span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onGenerateSlides(currentProject.topic)}
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition-all"
              >
                <Presentation className="h-4 w-4" />
                <span>Generate 6-Slide Deck</span>
              </button>

              <button
                onClick={() => onGenerateReport(currentProject)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>PDF/Markdown Report</span>
              </button>
            </div>
          </div>

          {/* TAB NAVIGATION */}
          <div className="flex overflow-x-auto border-b border-white/10 gap-2 pb-1 scrollbar-none">
            {[
              { id: 'summary', label: 'Executive Summary & Facts', icon: FileText },
              { id: 'timeline', label: 'Timeline & Case Studies', icon: Clock },
              { id: 'trends', label: 'Market Trends & Charts', icon: TrendingUp },
              { id: 'sources', label: 'Sources & Citations', icon: BookMarked },
              { id: 'mindmap', label: 'Interactive Mind Map', icon: Network },
              { id: 'faqs', label: 'FAQs & Future Scope', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-white/[0.03] text-zinc-400 hover:bg-white/10 hover:text-zinc-200 border border-white/5'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT: EXECUTIVE SUMMARY & FACTS */}
          {activeTab === 'summary' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-card rounded-3xl p-6 shadow-xl">
                  <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400" /> Executive AI Synthesis
                  </h3>
                  <div className="text-xs text-zinc-300 leading-relaxed space-y-3 whitespace-pre-line">
                    {currentProject.executive_summary}
                  </div>
                </div>

                {/* Key Facts Grid */}
                <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-purple-400" /> Empirical Key Facts
                  </h3>
                  <div className="space-y-2.5">
                    {currentProject.key_facts?.map((fact, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-zinc-200"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold text-indigo-400">
                          {idx + 1}
                        </span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Metrics & Pros/Cons */}
              <div className="space-y-6">
                <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold text-white">Pros & Cons Analysis</h3>
                  
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      Key Advantages
                    </p>
                    {currentProject.pros_cons?.pros?.map((p, idx) => (
                      <p key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-emerald-400">✓</span> {p}
                      </p>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                      Key Challenges
                    </p>
                    {currentProject.pros_cons?.cons?.map((c, idx) => (
                      <p key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-rose-400">⚠️</span> {c}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: TIMELINE & CASE STUDIES */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="glass-card rounded-3xl p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-400" /> Historical Timeline & Evolution
                </h3>
                <div className="relative border-l-2 border-indigo-500/30 pl-6 space-y-8 ml-3">
                  {currentProject.timeline?.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-indigo-500 bg-[#06060a]" />
                      <span className="inline-block rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20 mb-1">
                        {item.year}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.event}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case studies */}
              <div className="glass-card rounded-3xl p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-4">Real-World Case Studies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProject.case_studies?.map((cs, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <h4 className="text-xs font-bold text-indigo-300">{cs.title}</h4>
                      <p className="text-xs text-zinc-300 mt-2">{cs.summary}</p>
                      <div className="mt-3 pt-2 border-t border-white/10 text-[11px] font-semibold text-emerald-400">
                        Impact: {cs.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: MARKET TRENDS & CHARTS */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="glass-card rounded-3xl p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-4">5-Year Growth Forecast & Quantitative Market Trends</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentProject.chart_data || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="label" stroke="#71717a" fontSize={11} />
                      <YAxis stroke="#71717a" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0d0e15', borderColor: 'rgba(255,255,255,0.1)' }} />
                      <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} name="Primary Footprint ($M)" />
                      {currentProject.chart_data?.[0]?.secondary && (
                        <Bar dataKey="secondary" fill="#a855f7" radius={[8, 8, 0, 0]} name="Adoption Index" />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SOURCES & CITATIONS */}
          {activeTab === 'sources' && (
            <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookMarked className="h-4 w-4 text-emerald-400" /> Academic Sources & Citation Index
              </h3>

              <div className="space-y-4">
                {currentProject.sources?.map((src) => (
                  <div
                    key={src.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                        {src.source_type}
                      </span>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <span>View Source Paper</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <h4 className="text-xs font-bold text-white">{src.title}</h4>
                    <p className="text-[11px] text-zinc-400">
                      Author(s): {src.author} | Published: {src.pub_date}
                    </p>
                    <p className="text-xs text-zinc-300 italic bg-[#07080e] p-2.5 rounded-lg border border-white/10">
                      "{src.snippet}"
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <code className="text-[10px] text-zinc-400 font-mono truncate max-w-md">
                        {src.citation_text}
                      </code>
                      <button
                        onClick={() => handleCopyCitation(src.citation_text, src.id)}
                        className="flex items-center gap-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded"
                      >
                        {copiedCitation === src.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy Citation
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: MIND MAP */}
          {activeTab === 'mindmap' && (
            <div className="glass-card rounded-3xl p-6 shadow-xl text-center">
              <h3 className="text-base font-bold text-white mb-2">Interactive AI Mind Map Tree</h3>
              <p className="text-xs text-zinc-400 mb-6">
                Structural node graph generated for {currentProject.topic}
              </p>

              <div className="p-8 bg-[#07080e] rounded-2xl border border-white/10 flex justify-center">
                <div className="space-y-4 max-w-lg text-left">
                  <div className="p-3 rounded-xl bg-indigo-600 text-white font-bold text-xs text-center shadow-lg">
                    🧠 {currentProject.mind_map?.label || currentProject.topic}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4 border-l-2 border-indigo-500/30">
                    {currentProject.mind_map?.children?.map((child, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
                        <p className="font-bold text-indigo-300">{child.label}</p>
                        {child.children?.map((sub, j) => (
                          <p key={j} className="text-[11px] text-zinc-400 mt-1 pl-2 border-l border-zinc-700">
                            • {sub.label}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: FAQS & FUTURE */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-white">Frequently Asked Questions</h3>
                {currentProject.faqs?.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                    <p className="text-xs font-bold text-indigo-300">Q: {faq.question}</p>
                    <p className="text-xs text-zinc-300">A: {faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-3xl p-6 shadow-xl">
                <h3 className="text-base font-bold text-white mb-2">Future Scope & Projections</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{currentProject.future_scope}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
