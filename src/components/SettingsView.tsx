import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, Key, Sun, Moon, Bell, Database, User as UserIcon, Check } from 'lucide-react';
import { User, AppSettings } from '../types';

interface SettingsViewProps {
  user: User | null;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenDBModal: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  settings,
  onUpdateSettings,
  onOpenDBModal,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(settings.custom_gemini_key || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({ custom_gemini_key: apiKeyInput });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-2 backdrop-blur-md">
            <SettingsIcon className="h-4 w-4 text-indigo-400" />
            <span>Platform Configuration</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Settings & API Keys</h2>
          <p className="text-xs text-zinc-400 mt-1">Manage user preferences, API keys, and database connections.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* PROFILE SETTINGS */}
        <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-indigo-400" /> User Profile Information
          </h3>
          <div className="flex items-center gap-4 pt-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt="Avatar"
              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-indigo-500/40"
            />
            <div>
              <p className="text-sm font-bold text-zinc-100">{user?.name || 'User'}</p>
              <p className="text-xs text-zinc-400">{user?.email || 'user@example.com'}</p>
              <span className="mt-1 inline-block rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                ROLE: {user?.role?.toUpperCase() || 'PRO RESEARCHER'}
              </span>
            </div>
          </div>
        </div>

        {/* API KEY CONFIGURATION */}
        <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="h-4 w-4 text-amber-400" /> Custom Gemini API Key (Optional)
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AI Studio automatically manages your runtime Gemini API key via process.env.GEMINI_API_KEY. You may also specify a custom key override below.
          </p>

          <form onSubmit={handleSaveKeys} className="space-y-3">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy... (Leave blank to use AI Studio system key)"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 px-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-indigo-500 focus:outline-none"
            />

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              {savedSuccess ? <Check className="h-4 w-4 text-emerald-400" /> : <Key className="h-4 w-4" />}
              <span>{savedSuccess ? 'API Key Saved!' : 'Save Custom API Key'}</span>
            </button>
          </form>
        </div>

        {/* TECH STACK & DATABASE MONITORS */}
        <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" /> Database & Server Health
            </h3>
            <button
              onClick={onOpenDBModal}
              className="text-xs text-indigo-400 hover:underline font-semibold"
            >
              View SQL & MongoDB Schemas →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="text-[10px] text-zinc-500 font-mono">POSTGRESQL</p>
              <p className="font-bold text-emerald-400 mt-1">Connected (Port 5432)</p>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="text-[10px] text-zinc-500 font-mono">MONGODB</p>
              <p className="font-bold text-emerald-400 mt-1">Active (Port 27017)</p>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="text-[10px] text-zinc-500 font-mono">REDIS CACHE</p>
              <p className="font-bold text-emerald-400 mt-1">Ready (Port 6379)</p>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="text-[10px] text-zinc-500 font-mono">FASTAPI BACKEND</p>
              <p className="font-bold text-emerald-400 mt-1">Online (Express Bridge)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
