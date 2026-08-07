import React, { useState } from 'react';
import { X, Database, Code2, Server, Container, Copy, Check, FileCode2 } from 'lucide-react';

interface DatabaseSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseSchemaModal: React.FC<DatabaseSchemaModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'mongo' | 'fastapi' | 'docker' | 'structure'>('sql');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSchema = `-- ==========================================
-- PostgreSQL Database Schema for DeepResearch AI
-- ==========================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar TEXT,
  role VARCHAR(50) DEFAULT 'researcher',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE research_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic VARCHAR(500) NOT NULL,
  executive_summary TEXT,
  report_markdown TEXT,
  metrics_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES research_projects(id) ON DELETE CASCADE,
  slide_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slide_content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_context VARCHAR(255),
  messages JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  mime_type VARCHAR(100),
  ocr_extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(100) NOT NULL,
  topic VARCHAR(255),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

  const mongoSchema = `// MongoDB Mongoose Schemas for Unstructured Analytics & Cache

const ResearchCacheSchema = new Schema({
  topic: { type: String, required: true, index: true },
  groundingSources: [{ title: String, url: String, snippet: String }],
  rawVectorEmbeddings: [Number],
  createdAt: { type: Date, default: Date.now, expires: '7d' }
});

const OCRLogSchema = new Schema({
  userId: String,
  filename: String,
  extractedTables: [[String]],
  extractedText: String,
  timestamp: { type: Date, default: Date.now }
});`;

  const fastapiCode = `# FastAPI Python Backend Entry Point (backend/api/main.py)

from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from google import genai
import os

app = FastAPI(title="DeepResearch AI FastAPI Backend", version="3.6.0")
security = HTTPBearer()

ai_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class ResearchRequest(BaseModel):
    topic: str
    search_depth: str = "deep"

@app.post("/api/v1/research/synthesize")
async def synthesize_research(req: ResearchRequest):
    response = ai_client.models.generate_content(
        model="gemini-3.6-flash",
        contents=f"Deep academic research synthesis for topic: {req.topic}"
    )
    return {"status": "success", "data": response.text}`;

  const dockerCode = `# Multi-Stage Dockerfile for Production Deployment

FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.11-slim AS backend
WORKDIR /api
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

EXPOSE 3000
CMD ["node", "dist/server.cjs"]`;

  const folderStructure = `frontend/
  ├── src/
  │   ├── components/
  │   │   ├── Navbar.tsx
  │   │   ├── Sidebar.tsx
  │   │   ├── LandingPage.tsx
  │   │   ├── ResearchEngineView.tsx
  │   │   ├── SlideGeneratorView.tsx
  │   │   ├── ReportGeneratorView.tsx
  │   │   ├── OCRScannerView.tsx
  │   │   ├── VoiceAssistantView.tsx
  │   │   ├── MindMapView.tsx
  │   │   └── SettingsView.tsx
  │   ├── types.ts
  │   └── App.tsx
  └── server.ts
backend/
  ├── api/
  │   ├── research.py
  │   ├── ocr.py
  │   └── voice.py
  ├── models/
  │   └── db_models.py
  └── security/
      └── jwt.py`;

  const getCode = () => {
    switch (activeTab) {
      case 'sql': return sqlSchema;
      case 'mongo': return mongoSchema;
      case 'fastapi': return fastapiCode;
      case 'docker': return dockerCode;
      case 'structure': return folderStructure;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#07080e]/90 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/20 border border-emerald-500/30 shadow-lg shadow-emerald-600/10">
              <Code2 className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Full Stack Architecture & Database Schemas</h3>
              <p className="text-xs text-zinc-400">PostgreSQL, MongoDB, FastAPI, Docker & Folder Structure</p>
            </div>
          </div>

          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 gap-2 py-3">
          {[
            { id: 'sql', label: 'PostgreSQL Schemas' },
            { id: 'mongo', label: 'MongoDB Schemas' },
            { id: 'fastapi', label: 'FastAPI Backend (Python)' },
            { id: 'docker', label: 'Dockerfile Config' },
            { id: 'structure', label: 'Folder Hierarchy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code View */}
        <div className="flex-1 overflow-y-auto mt-4 relative">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-white/20 z-10"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>

          <pre className="p-4 rounded-2xl bg-[#06060a] border border-white/10 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto">
            <code>{getCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
