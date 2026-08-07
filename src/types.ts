export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'researcher' | 'pro_analyst' | 'admin';
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ResearchSource {
  id: string;
  title: string;
  source_type: 'Wikipedia' | 'arXiv' | 'Google Scholar' | 'GitHub' | 'News' | 'Research Paper';
  author?: string;
  pub_date?: string;
  url: string;
  snippet: string;
  citation_text: string;
}

export interface TimelineEvent {
  year: string;
  event: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CaseStudy {
  title: string;
  summary: string;
  impact: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface MindMapNode {
  id: string;
  label: string;
  details?: string;
  category?: 'core' | 'subtopic' | 'fact' | 'application';
  children?: MindMapNode[];
}

export interface ResearchProject {
  id: string;
  user_id: string;
  topic: string;
  created_at: string;
  status: 'completed' | 'analyzing' | 'failed';
  executive_summary: string;
  key_facts: string[];
  timeline: TimelineEvent[];
  pros_cons: {
    pros: string[];
    cons: string[];
  };
  current_trends: string[];
  future_scope: string;
  faqs: FAQItem[];
  case_studies: CaseStudy[];
  metrics: {
    marketSize: string;
    growthRate: string;
    confidenceScore: number;
    sentimentIndex: number;
    publicationsCount: number;
  };
  chart_data: ChartDataPoint[];
  sources: ResearchSource[];
  mind_map: MindMapNode;
  tags?: string[];
  bookmarked?: boolean;
}

export interface SlideItem {
  slide_number: number;
  title: string;
  subtitle?: string;
  layout: 'title' | 'overview' | 'facts' | 'chart' | 'future' | 'references';
  content: string[];
  key_takeaway?: string;
  chart_data?: ChartDataPoint[];
}

export interface SlideProject {
  id: string;
  project_id: string;
  topic: string;
  created_at: string;
  slides: SlideItem[];
}

export interface ReportDocument {
  id: string;
  project_id: string;
  topic: string;
  generated_at: string;
  content_markdown: string;
  table_of_contents: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
  code_snippets?: string[];
  attached_file_name?: string;
}

export interface OCRResult {
  id: string;
  filename: string;
  file_type: string;
  extracted_text: string;
  extracted_tables?: string[][];
  summary: string;
  translation?: string;
  notes?: string[];
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: 'research' | 'slide_generation' | 'report_export' | 'ocr_scan' | 'voice_query';
  topic: string;
  timestamp: string;
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  custom_gemini_key: string;
  notifications_enabled: boolean;
  voice_language: 'en-US' | 'hi-IN';
  auto_save_reports: boolean;
  search_depth: 'fast' | 'deep' | 'academic';
}
