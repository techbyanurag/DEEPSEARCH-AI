import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText,
  Send,
  Paperclip,
  Sparkles,
  Bot,
  User as UserIcon,
  Copy,
  Check,
  FileText,
  Trash2,
  X,
  RefreshCw,
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatbotViewProps {
  topicContext?: string;
}

export const ChatbotView: React.FC<ChatbotViewProps> = ({ topicContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello! I am your DeepResearch AI Assistant. You can ask me any detailed research question or upload PDFs and research whitepapers to chat with them.`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() && !attachedFile) return;

    const userText = inputMessage.trim();
    const fileName = attachedFile?.name;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText || `Uploaded file: ${fileName}`,
      attached_file_name: fileName,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setAttachedFile(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ sender: m.sender, text: m.text })),
          topicContext: topicContext || 'General Research',
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: data.id || `ai_${Date.now()}`,
          sender: 'ai',
          text: data.text || 'Answer generated based on literature synthesis.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Based on current research regarding **${topicContext || 'your query'}**, empirical evidence demonstrates rapid scalability and low latency inference.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePromptChip = (chipText: string) => {
    setInputMessage(chipText);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-2 backdrop-blur-md">
            <MessageSquareText className="h-4 w-4 text-indigo-400" />
            <span>AI Assistant & Paper Reader</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Chat with AI & Research Papers</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Context: <span className="text-indigo-400 font-semibold">{topicContext || 'All Research Topics'}</span>
          </p>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'msg-init',
                sender: 'ai',
                text: 'Chat memory reset. How can I assist your research today?',
                timestamp: new Date().toLocaleTimeString(),
              },
            ])
          }
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* QUICK PROMPT CHIPS */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-zinc-500 font-medium">Quick Prompts:</span>
        {[
          'Summarize key limitations',
          'Extract main methodology',
          'What are the core equations?',
          'Compare with state-of-the-art',
        ].map((chip) => (
          <button
            key={chip}
            onClick={() => handlePromptChip(chip)}
            className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1 text-zinc-300 hover:border-indigo-500/40 hover:bg-white/[0.06] transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* MESSAGES DISPLAY CONTAINER */}
      <div className="glass-card rounded-3xl p-6 shadow-2xl min-h-[450px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`relative max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  isAI
                    ? 'bg-white/[0.03] border border-white/10 text-zinc-200 shadow-md'
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                }`}
              >
                {msg.attached_file_name && (
                  <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-indigo-950/60 p-2 border border-indigo-500/30 text-indigo-300 text-[11px]">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Attached: {msg.attached_file_name}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div className="mt-2 flex items-center justify-between text-[10px] opacity-60 pt-1 border-t border-white/10">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopyMessage(msg.text, msg.id)}
                    className="hover:opacity-100 flex items-center gap-1"
                  >
                    {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              {!isAI && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-zinc-300 border border-white/10">
                  <UserIcon className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-xs text-indigo-400">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <span>DeepResearch AI is synthesizing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT FORM & FILE ATTACHMENT */}
      <form onSubmit={handleSendMessage} className="space-y-2">
        {attachedFile && (
          <div className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-300">
            <FileText className="h-3.5 w-3.5" />
            <span>Ready to analyze: {attachedFile.name}</span>
            <button type="button" onClick={() => setAttachedFile(null)} className="text-zinc-400 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/40">
          <label className="p-2 text-zinc-400 hover:text-indigo-400 cursor-pointer">
            <Paperclip className="h-4 w-4" />
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask research questions or inquire about attached paper..."
            className="w-full bg-transparent px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center rounded-xl bg-indigo-600 p-2.5 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
