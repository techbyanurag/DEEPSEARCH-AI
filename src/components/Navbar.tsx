import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Mic,
  Bell,
  Sun,
  Moon,
  User as UserIcon,
  BookOpen,
  Code2,
  FileText,
  Scan,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAuth: () => void;
  onOpenVoice: () => void;
  onOpenDBModal: () => void;
  onSelectNav: (nav: string) => void;
  activeNav: string;
  onSearchTopic: (topic: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  theme,
  onToggleTheme,
  onOpenAuth,
  onOpenVoice,
  onOpenDBModal,
  onSelectNav,
  activeNav,
  onSearchTopic,
  onLogout,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchTopic(searchInput.trim());
      onSelectNav('research');
      setSearchInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07080e]/80 backdrop-blur-xl transition-colors">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectNav('landing')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07080e]">
                <Sparkles className="h-5 w-5 text-indigo-400 transition-transform group-hover:rotate-12" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gradient-primary text-lg font-bold tracking-tight">
                  DeepResearch
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  AI v3.6
                </span>
              </div>
              <p className="hidden text-[11px] text-zinc-400 sm:block">
                Autonomous GenAI Research Platform
              </p>
            </div>
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="hidden max-w-md flex-1 px-6 md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search any topic (e.g. Artificial Intelligence, Quantum Computing)..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-10 text-sm text-zinc-100 placeholder-zinc-500 transition-all focus:border-indigo-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
            <button
              type="button"
              onClick={onOpenVoice}
              title="Voice Assistant"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              <Mic className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right Action Icons & User Control */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Developer Tech Stack & DB Schema button */}
          <button
            onClick={onOpenDBModal}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/20 hover:bg-white/[0.08] transition-all"
            title="View Full Stack Architecture & Schemas"
          >
            <Code2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Stack & Schemas</span>
          </button>

          {/* Voice Assistant Button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300 hover:bg-purple-500/20 transition-all"
          >
            <Mic className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            <span className="hidden sm:inline">Voice AI</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#07080e]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0d0e15]/95 p-4 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-xs font-semibold text-zinc-200">Notifications</h4>
                  <span className="text-[10px] text-indigo-400 font-mono">2 New</span>
                </div>
                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="rounded-lg bg-white/[0.04] p-2.5 border border-white/5">
                    <p className="font-medium text-zinc-200">Research Complete</p>
                    <p className="mt-0.5 text-zinc-400 text-[11px]">
                      "Artificial Intelligence & LLMs" synthesis finished.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] p-2.5 border border-white/5">
                    <p className="font-medium text-zinc-200">New arXiv Citations</p>
                    <p className="mt-0.5 text-zinc-400 text-[11px]">
                      3 new peer-reviewed papers matching your topics.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1 pr-2.5 hover:border-white/20 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-7 w-7 rounded-lg object-cover ring-1 ring-white/20"
                />
                <span className="hidden text-xs font-medium text-zinc-200 sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="h-3 w-3 text-zinc-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#0d0e15]/95 p-2 shadow-2xl backdrop-blur-2xl">
                  <div className="border-b border-white/10 p-2.5">
                    <p className="text-xs font-semibold text-zinc-100">{user.name}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                    <span className="mt-1 inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                      PRO RESEARCHER
                    </span>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => {
                        onSelectNav('dashboard');
                        setShowProfileMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-white/10 transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onSelectNav('settings');
                        setShowProfileMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-white/10 transition-colors"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                      Settings & Keys
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowProfileMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              <UserIcon className="h-3.5 w-3.5" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
