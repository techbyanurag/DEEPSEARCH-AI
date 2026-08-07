import React from 'react';
import {
  LayoutDashboard,
  Search,
  BookMarked,
  MessageSquareText,
  Presentation,
  FileSpreadsheet,
  Scan,
  Mic,
  Network,
  Settings,
  Sparkles,
  ChevronRight,
  Database,
  Rocket,
} from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  savedCount,
}) => {
  const navItems = [
    { id: 'landing', label: 'Overview & Product', icon: Rocket },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'research', label: 'AI Research Engine', icon: Search, badge: 'Core' },
    { id: 'sources', label: 'Sources & Citations', icon: BookMarked },
    { id: 'chatbot', label: 'AI Chatbot & PDFs', icon: MessageSquareText },
    { id: 'slides', label: 'AI Slide Generator', icon: Presentation },
    { id: 'reports', label: 'Report Generator', icon: FileSpreadsheet },
    { id: 'ocr', label: 'OCR & Document Scan', icon: Scan },
    { id: 'voice', label: 'Voice Assistant', icon: Mic },
    { id: 'mindmap', label: 'AI Mind Map', icon: Network },
    { id: 'settings', label: 'Settings & Keys', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#07080e]/90 backdrop-blur-xl py-4 hidden md:flex md:flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-6 px-3">
        {/* Navigation Sections */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Research Suite
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectNav(item.id)}
                  className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-500/15 text-white border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isActive ? 'text-indigo-400' : 'text-zinc-400 group-hover:text-zinc-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="rounded-md bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-300 border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Stats Card */}
        <div className="mx-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 shadow-inner backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Saved Library
            </span>
            <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
              {savedCount} Projects
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            Gemini 3.6 Flash synthesizing multi-source research in real time.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Backend Active
          </span>
          <span className="font-mono text-[10px] text-zinc-400">Port: 3000</span>
        </div>
      </div>
    </aside>
  );
};
