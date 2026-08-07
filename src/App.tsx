/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { ResearchEngineView } from './components/ResearchEngineView';
import { SlideGeneratorView } from './components/SlideGeneratorView';
import { ReportGeneratorView } from './components/ReportGeneratorView';
import { ChatbotView } from './components/ChatbotView';
import { OCRScannerView } from './components/OCRScannerView';
import { VoiceAssistantView } from './components/VoiceAssistantView';
import { MindMapView } from './components/MindMapView';
import { SettingsView } from './components/SettingsView';
import { DatabaseSchemaModal } from './components/DatabaseSchemaModal';
import { User, ResearchProject, SlideItem, AppSettings } from './types';

export default function App() {
  const [activeNav, setActiveNav] = useState<string>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [user, setUser] = useState<User | null>({
    id: 'usr_1',
    name: 'User',
    email: 'user@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'pro_analyst',
    created_at: new Date().toISOString(),
  });

  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [currentProject, setCurrentProject] = useState<ResearchProject | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>('Artificial Intelligence & LLMs');
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDBModalOpen, setIsDBModalOpen] = useState(false);

  // Settings
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'dark',
    custom_gemini_key: '',
    notifications_enabled: true,
    voice_language: 'en-US',
    auto_save_reports: true,
    search_depth: 'deep',
  });

  // Fetch initial history from server
  useEffect(() => {
    fetch('/api/research/history')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setCurrentProject(data[0]);
          setCurrentTopic(data[0].topic);
        }
      })
      .catch((err) => console.log('Server history fetch error fallback:', err));
  }, []);

  // Handle research search
  const handleStartResearch = async (topic: string) => {
    setCurrentTopic(topic);
    setIsLoading(true);
    setActiveNav('research');

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, user_id: user?.id || 'usr_1' }),
      });

      const project: ResearchProject = await response.json();
      setCurrentProject(project);
      setProjects((prev) => [project, ...prev.filter((p) => p.id !== project.id)]);

      // Pre-generate slides
      handleGenerateSlides(topic);
    } catch (err) {
      console.error('Research synthesis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle generating slides
  const handleGenerateSlides = async (topic: string) => {
    try {
      const response = await fetch('/api/slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (data.slides) {
        setSlides(data.slides);
      }
    } catch (err) {
      console.error('Slide generation error:', err);
    }
  };

  const handleToggleBookmark = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
    fetch('/api/research/bookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#06060a] text-zinc-100' : 'bg-slate-50 text-slate-900'} font-sans antialiased transition-colors`}>
      {/* Top Navbar */}
      <Navbar
        user={user}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenVoice={() => setActiveNav('voice')}
        onOpenDBModal={() => setIsDBModalOpen(true)}
        onSelectNav={setActiveNav}
        activeNav={activeNav}
        onSearchTopic={handleStartResearch}
        onLogout={() => setUser(null)}
      />

      <div className="flex">
        {/* Sidebar Navigation */}
        <Sidebar
          activeNav={activeNav}
          onSelectNav={setActiveNav}
          savedCount={projects.length}
        />

        {/* Main Content View Switcher */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          {activeNav === 'landing' && (
            <LandingPage
              onStartResearch={handleStartResearch}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenDBModal={() => setIsDBModalOpen(true)}
            />
          )}

          {activeNav === 'dashboard' && (
            <DashboardView
              user={user}
              projects={projects}
              onSelectProject={(proj) => {
                setCurrentProject(proj);
                setCurrentTopic(proj.topic);
                setActiveNav('research');
              }}
              onStartResearch={handleStartResearch}
              onToggleBookmark={handleToggleBookmark}
              onSelectNav={setActiveNav}
            />
          )}

          {(activeNav === 'research' || activeNav === 'sources') && (
            <ResearchEngineView
              currentProject={currentProject}
              onSearch={handleStartResearch}
              isLoading={isLoading}
              onGenerateSlides={(topic) => {
                handleGenerateSlides(topic);
                setActiveNav('slides');
              }}
              onGenerateReport={() => setActiveNav('reports')}
              onSelectNav={setActiveNav}
            />
          )}

          {activeNav === 'slides' && (
            <SlideGeneratorView
              topic={currentTopic}
              slides={slides}
              isLoading={isLoading}
              onGenerate={handleGenerateSlides}
            />
          )}

          {activeNav === 'reports' && (
            <ReportGeneratorView
              currentProject={currentProject}
              onGenerateReport={() => {}}
              isLoading={isLoading}
            />
          )}

          {activeNav === 'chatbot' && (
            <ChatbotView topicContext={currentTopic} />
          )}

          {activeNav === 'ocr' && <OCRScannerView />}

          {activeNav === 'voice' && (
            <VoiceAssistantView
              onStartResearch={handleStartResearch}
              onGenerateSlides={(topic) => {
                handleGenerateSlides(topic);
                setActiveNav('slides');
              }}
            />
          )}

          {activeNav === 'mindmap' && (
            <MindMapView
              mindMap={currentProject?.mind_map || null}
              topic={currentTopic}
            />
          )}

          {activeNav === 'settings' && (
            <SettingsView
              user={user}
              settings={settings}
              onUpdateSettings={(newSet) => setSettings((prev) => ({ ...prev, ...newSet }))}
              onOpenDBModal={() => setIsDBModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Auth & Login Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u, token) => setUser(u)}
      />

      {/* Architecture & DB Schema Modal */}
      <DatabaseSchemaModal
        isOpen={isDBModalOpen}
        onClose={() => setIsDBModalOpen(false)}
      />
    </div>
  );
}
