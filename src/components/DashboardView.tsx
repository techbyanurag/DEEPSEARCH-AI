import React from 'react';
import {
  Search,
  BookMarked,
  Presentation,
  FileText,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  Bookmark,
  Trash2,
  Share2,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { ResearchProject, User } from '../types';

interface DashboardViewProps {
  user: User | null;
  projects: ResearchProject[];
  onSelectProject: (project: ResearchProject) => void;
  onStartResearch: (topic: string) => void;
  onToggleBookmark: (id: string) => void;
  onSelectNav: (nav: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  projects,
  onSelectProject,
  onStartResearch,
  onToggleBookmark,
  onSelectNav,
}) => {
  const trendingTopics = [
    { topic: 'Quantum Computing Supremacy', count: '14.2k searches', trend: '+42%' },
    { topic: 'Artificial Intelligence & LLMs', count: '38.9k searches', trend: '+88%' },
    { topic: 'SpaceX Starship & Mars Orbit', count: '9.4k searches', trend: '+15%' },
    { topic: 'Nuclear Fusion Tokamak Reactors', count: '11.8k searches', trend: '+29%' },
    { topic: 'Climate Change Geo-Engineering', count: '8.2k searches', trend: '+19%' },
  ];

  const analyticsChartData = [
    { month: 'Jan', searches: 24, reports: 12, slides: 8 },
    { month: 'Feb', searches: 45, reports: 22, slides: 15 },
    { month: 'Mar', searches: 68, reports: 38, slides: 28 },
    { month: 'Apr', searches: 92, reports: 54, slides: 42 },
    { month: 'May', searches: 120, reports: 76, slides: 61 },
    { month: 'Jun', searches: 158, reports: 98, slides: 84 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-zinc-950 via-indigo-950/30 to-zinc-950 p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-3 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Pro Analyst Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Welcome back, {user ? user.name : 'User'}
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Synthesize multi-source academic papers, generate 6-slide decks, and perform OCR document scans with Gemini 3.6 Flash.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectNav('research')}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              <Search className="h-4 w-4" />
              <span>New AI Research</span>
            </button>
            <button
              onClick={() => onSelectNav('ocr')}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/10 transition-colors"
            >
              <FileText className="h-4 w-4 text-emerald-400" />
              <span>OCR Document Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Total Researches</span>
            <Search className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{projects.length + 42}</p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +18.4% this month
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Saved Reports</span>
            <FileText className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{projects.length}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Exportable PDF/Markdown</p>
        </div>

        <div className="glass-card rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Citations Tracked</span>
            <BookMarked className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">1,480</p>
          <p className="text-[11px] text-zinc-400 mt-1">arXiv & Wikipedia grounded</p>
        </div>

        <div className="glass-card rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Time Saved (Hours)</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">148 hrs</p>
          <p className="text-[11px] text-amber-400 mt-1">92% faster synthesis</p>
        </div>
      </div>

      {/* ANALYTICS CHARTS & TRENDING TOPICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-400" />
                Research Activity & Analytics
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Monthly AI synthesis volume and generated presentation decks
              </p>
            </div>
            <span className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-[11px] font-mono text-indigo-400 border border-indigo-500/20">
              Live Recharts
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsChartData}>
                <defs>
                  <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d0e15', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#f4f4f5', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="searches" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSearches)" />
                <Area type="monotone" dataKey="reports" stroke="#a855f7" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="glass-card rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              Trending Research Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => onStartResearch(t.topic)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.06] transition-all text-left"
                >
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{t.topic}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{t.count}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {t.trend}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RECENT RESEARCH HISTORY LIST */}
      <div className="glass-card rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Recent Research Projects</h3>
            <p className="text-xs text-zinc-400">Click any project to view full reports, slides, or mind maps</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                      {proj.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {new Date(proj.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleBookmark(proj.id)}
                    className="text-zinc-400 hover:text-amber-400 transition-colors"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${proj.bookmarked ? 'fill-amber-400 text-amber-400' : ''}`}
                    />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-zinc-100">{proj.topic}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                  {proj.executive_summary}
                </p>

                <div className="mt-4 flex items-center gap-4 text-[11px] text-zinc-400">
                  <span>📊 {proj.key_facts?.length || 5} Facts</span>
                  <span>📚 {proj.sources?.length || 3} Citations</span>
                  <span>🎯 Score: {proj.metrics?.confidenceScore || 98}%</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Open Full Synthesis</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectNav('slides')}
                    className="p-1.5 text-zinc-400 hover:text-purple-400 rounded-lg hover:bg-white/10 transition-colors"
                    title="Generate Slides"
                  >
                    <Presentation className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onSelectNav('reports')}
                    className="p-1.5 text-zinc-400 hover:text-emerald-400 rounded-lg hover:bg-white/10 transition-colors"
                    title="Generate Report"
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
