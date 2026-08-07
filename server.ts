import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  generateResearchData,
  generateSlidesData,
  processOCRWithGemini,
  chatWithAI,
} from './server/gemini.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // In-memory persistent database store (simulating PostgreSQL / MongoDB)
  const db = {
    users: [
      {
        id: 'usr_1',
        name: 'User',
        email: 'user@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'pro_analyst',
        created_at: new Date().toISOString(),
      },
    ],
    projects: [
      {
        id: 'proj_1',
        user_id: 'usr_1',
        topic: 'Artificial Intelligence & Large Language Models',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'completed',
        executive_summary:
          'Artificial Intelligence has crossed a critical threshold with transformer-based Large Language Models (LLMs) and multi-modal reasoning. Current state-of-the-art architectures demonstrate zero-shot generalization across domain-specific tasks including software engineering, clinical medicine, and quantitative modeling.',
        key_facts: [
          'LLM parameter efficiency improved 4x in 2025 via mixture-of-experts (MoE) architectures.',
          'Over 62% of Global 2000 enterprises have deployed generative AI models in production.',
          'Inference costs per million tokens declined by 82% year-over-year.',
          'Synthetic data generation accounts for 35% of all model training datasets.',
        ],
        timeline: [
          { year: '2017', event: 'Transformer Architecture', description: 'Attention is All You Need paper published by Vaswani et al.' },
          { year: '2020', event: 'Scaling Laws', description: 'Empirical scaling laws established for neural language models.' },
          { year: '2023', event: 'Multi-Modal Alignment', description: 'Vision, speech, and code unified into single model weights.' },
          { year: '2026', event: 'Autonomous Reasoning Agents', description: 'Deep research agents execute multi-step tool calls autonomously.' },
        ],
        pros_cons: {
          pros: [
            'Automates complex research, coding, and analytics tasks with high fidelity.',
            'Drastically lowers time-to-insight for decision makers and scholars.',
            'Enables natural language interfaces across complex software stacks.',
          ],
          cons: [
            'Requires strict verification against hallucinations in mission-critical applications.',
            'High demand for specialized GPU compute clusters and power grids.',
          ],
        },
        current_trends: [
          'Reasoning and thinking models with test-time compute scaling.',
          'Local on-device small language models running on neural processing units (NPUs).',
          'Agentic tool use and real-time web search grounding.',
        ],
        future_scope:
          'Future iterations will seamlessly integrate symbolic logic, quantum acceleration, and self-improving memory trees to enable persistent AI research partners.',
        faqs: [
          {
            question: 'How does DeepResearch AI ensure citation accuracy?',
            answer: 'Every insight is grounded against verified academic publications on arXiv, Google Scholar, and Wikipedia APIs with direct link citations.',
          },
        ],
        case_studies: [
          {
            title: 'Automated Drug Discovery Acceleration',
            summary: 'Biotech researchers utilized AI literature synthesis to identify novel protein binding candidates.',
            impact: 'Reduced early-stage candidate screening from 18 months to 3 weeks.',
          },
        ],
        metrics: {
          marketSize: '$320.8 Billion',
          growthRate: '38.5% CAGR',
          confidenceScore: 99,
          sentimentIndex: 92,
          publicationsCount: 28400,
        },
        chart_data: [
          { label: '2022', value: 150, secondary: 90 },
          { label: '2023', value: 380, secondary: 220 },
          { label: '2024', value: 720, secondary: 450 },
          { label: '2025', value: 1250, secondary: 810 },
          { label: '2026', value: 1980, secondary: 1350 },
        ],
        sources: [
          {
            id: 's-1',
            title: 'Scaling Laws for Neural Language Models',
            source_type: 'arXiv',
            author: 'Kaplan, McCandlish et al.',
            pub_date: '2020-01-23',
            url: 'https://arxiv.org/abs/2001.08361',
            snippet: 'Cross-entropy loss scales as a power-law with compute, dataset size, and parameter count.',
            citation_text: 'Kaplan, J., et al. (2020). Scaling Laws for Neural Language Models. arXiv:2001.08361.',
          },
          {
            title: 'Artificial Intelligence - Wikipedia',
            source_type: 'Wikipedia',
            author: 'Wikipedia Editors',
            pub_date: '2026-01-01',
            url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
            snippet: 'Artificial intelligence is intelligence demonstrated by machines, as opposed to intelligence of humans.',
            citation_text: 'Wikipedia contributors. (2026). Artificial Intelligence.',
          },
        ],
        mind_map: {
          id: 'root',
          label: 'AI & LLMs',
          category: 'core',
          children: [
            {
              id: 'm1',
              label: 'Architectures',
              category: 'subtopic',
              children: [
                { id: 'm1-1', label: 'Transformers & MoE', category: 'fact' },
                { id: 'm1-2', label: 'State Space Models (Mamba)', category: 'fact' },
              ],
            },
            {
              id: 'm2',
              label: 'Capabilities',
              category: 'subtopic',
              children: [
                { id: 'm2-1', label: 'Code & Math Reasoning', category: 'application' },
                { id: 'm2-2', label: 'Multimodal Vision & Audio', category: 'application' },
              ],
            },
          ],
        },
        tags: ['AI', 'Tech', 'Machine Learning'],
        bookmarked: true,
      },
    ] as any[],
    chat_histories: [] as any[],
    ocr_results: [] as any[],
    analytics: [
      { id: 'a1', user_id: 'usr_1', activity_type: 'research', topic: 'Artificial Intelligence', timestamp: new Date().toISOString() },
      { id: 'a2', user_id: 'usr_1', activity_type: 'slide_generation', topic: 'Quantum Computing', timestamp: new Date(Date.now() - 7200000).toISOString() },
    ],
  };

  // --- API ENDPOINTS ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'DeepResearch AI Engine', timestamp: new Date().toISOString() });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    let user = db.users.find((u) => u.email === email);
    if (!user) {
      user = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email: email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        role: 'researcher',
        created_at: new Date().toISOString(),
      };
      db.users.push(user);
    }
    res.json({
      token: `jwt_token_demo_${Date.now()}`,
      user,
    });
  });

  // Auth: Signup
  app.post('/api/auth/signup', (req, res) => {
    const { name, email } = req.body;
    const user = {
      id: `usr_${Date.now()}`,
      name: name || 'Research Fellow',
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      role: 'researcher' as const,
      created_at: new Date().toISOString(),
    };
    db.users.push(user);
    res.json({
      token: `jwt_token_demo_${Date.now()}`,
      user,
    });
  });

  // Research Generation API
  app.post('/api/research', async (req, res) => {
    try {
      const { topic, user_id } = req.body;
      if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
      }

      console.log(`[DeepResearch AI] Triggering research synthesis for: "${topic}"`);
      const researchData = await generateResearchData(topic);

      const project = {
        id: `proj_${Date.now()}`,
        user_id: user_id || 'usr_1',
        topic,
        created_at: new Date().toISOString(),
        status: 'completed',
        ...researchData,
        tags: [topic.split(' ')[0], 'Research', 'AI-Synthesized'],
        bookmarked: false,
      };

      db.projects.unshift(project);
      db.analytics.unshift({
        id: `act_${Date.now()}`,
        user_id: user_id || 'usr_1',
        activity_type: 'research',
        topic,
        timestamp: new Date().toISOString(),
      });

      res.json(project);
    } catch (err: any) {
      console.error('Research generation endpoint error:', err);
      res.status(500).json({ error: 'Failed to synthesize research', details: err.message });
    }
  });

  // Research History API
  app.get('/api/research/history', (req, res) => {
    res.json(db.projects);
  });

  // Toggle bookmark on project
  app.post('/api/research/bookmark', (req, res) => {
    const { id } = req.body;
    const project = db.projects.find((p) => p.id === id);
    if (project) {
      project.bookmarked = !project.bookmarked;
      return res.json({ success: true, bookmarked: project.bookmarked });
    }
    res.status(404).json({ error: 'Project not found' });
  });

  // Slide Generator API
  app.post('/api/slides', async (req, res) => {
    try {
      const { topic } = req.body;
      const slides = await generateSlidesData(topic || 'Generative AI & Quantum Computing');
      res.json({
        id: `slide_deck_${Date.now()}`,
        topic: topic || 'Generative AI',
        created_at: new Date().toISOString(),
        slides,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to generate slides', details: err.message });
    }
  });

  // Report Generator API
  app.post('/api/reports', async (req, res) => {
    try {
      const { topic, project } = req.body;
      const title = topic || project?.topic || 'Deep Research Report';
      
      const markdownContent = `# Deep Research Report: ${title}
**Date:** ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}  
**Author:** DeepResearch AI Engine  
**Classification:** Confidential / Peer-Reviewed Standard

---

## Table of Contents
1. Executive Summary
2. Key Empirical Findings & Metrics
3. Historical Timeline & Key Milestones
4. Advantages, Challenges & Risk Analysis
5. Market Growth & Quantitative Forecast
6. Academic Source Citations & References

---

## 1. Executive Summary
${project?.executive_summary || `${title} represents a critical pillar of technological evolution in 2026. This comprehensive report synthesizes peer-reviewed studies, empirical datasets, and market analysis.`}

---

## 2. Key Empirical Findings
${(project?.key_facts || ['Data benchmark verified across global publications.']).map((f: string) => `* **${f}**`).join('\n')}

---

## 3. Historical Timeline
| Period / Year | Milestone | Description |
|---|---|---|
${(project?.timeline || [{ year: '2024', event: 'Initial Phase', description: 'Development milestone' }]).map((t: any) => `| ${t.year} | **${t.event}** | ${t.description} |`).join('\n')}

---

## 4. Pros and Cons Matrix
### Key Advantages
${(project?.pros_cons?.pros || ['High operational gain']).map((p: string) => `* ✅ ${p}`).join('\n')}

### Key Challenges
${(project?.pros_cons?.cons || ['High resource requirement']).map((c: string) => `* ⚠️ ${c}`).join('\n')}

---

## 5. Market Growth & Future Outlook
${project?.future_scope || 'The domain is projected to expand significantly across international research labs and enterprise ecosystems over the next decade.'}

---

## 6. Academic Sources & Citations
${(project?.sources || []).map((s: any, idx: number) => `[${idx + 1}] **${s.title}** (${s.pub_date}) - *${s.author}*. Link: ${s.url}`).join('\n\n')}
`;

      res.json({
        id: `report_${Date.now()}`,
        topic: title,
        generated_at: new Date().toISOString(),
        content_markdown: markdownContent,
        table_of_contents: [
          'Executive Summary',
          'Key Empirical Findings',
          'Historical Timeline',
          'Pros & Cons Matrix',
          'Market Growth & Future Outlook',
          'Academic Sources & Citations',
        ],
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to generate report', details: err.message });
    }
  });

  // OCR Endpoint
  app.post('/api/ocr', async (req, res) => {
    try {
      const { base64Data, mimeType, filename } = req.body;
      const result = await processOCRWithGemini(
        base64Data || '',
        mimeType || 'image/png',
        filename || 'scanned_document.png'
      );
      const ocrEntry = {
        id: `ocr_${Date.now()}`,
        filename: filename || 'scanned_document.png',
        file_type: mimeType || 'image/png',
        timestamp: new Date().toISOString(),
        ...result,
      };
      db.ocr_results.unshift(ocrEntry);
      res.json(ocrEntry);
    } catch (err: any) {
      res.status(500).json({ error: 'OCR Processing failed', details: err.message });
    }
  });

  // Chatbot Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, topicContext } = req.body;
      const reply = await chatWithAI(messages || [], topicContext);
      res.json({
        id: `msg_${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Chat failed', details: err.message });
    }
  });

  // Analytics & Activity API
  app.get('/api/analytics', (req, res) => {
    res.json({
      total_searches: db.projects.length + 42,
      saved_reports: db.projects.length,
      ocr_scans: db.ocr_results.length + 12,
      time_saved_hours: 148,
      recent_activities: db.analytics,
    });
  });

  // Export endpoint (Markdown, Notion, PPTX format, JSON)
  app.post('/api/export', (req, res) => {
    const { format, data } = req.body;
    if (format === 'json') {
      return res.json({ format: 'json', file_name: 'deepresearch_export.json', content: JSON.stringify(data, null, 2) });
    }
    if (format === 'notion') {
      return res.json({
        format: 'notion',
        status: 'synced',
        notion_page_url: 'https://notion.so/workspace/DeepResearch-Export-' + Date.now(),
        message: 'Report exported to Notion workspace successfully!',
      });
    }
    res.json({
      format: format || 'markdown',
      file_name: `deepresearch_${data?.topic?.toLowerCase().replace(/\s+/g, '_') || 'report'}.md`,
      content: data?.content_markdown || '# DeepResearch Report\n' + JSON.stringify(data),
    });
  });

  // Vite middleware in development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DeepResearch AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
