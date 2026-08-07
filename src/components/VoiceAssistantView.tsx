import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Globe2,
  ArrowRight,
  Presentation,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface VoiceAssistantViewProps {
  onStartResearch: (topic: string) => void;
  onGenerateSlides: (topic: string) => void;
}

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({
  onStartResearch,
  onGenerateSlides,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceLanguage, setVoiceLanguage] = useState<'en-US' | 'hi-IN'>('en-US');
  const [aiResponseText, setAiResponseText] = useState(
    'Welcome to DeepResearch Voice Assistant. Click the microphone orb or select a voice command chip below.'
  );

  const sampleCommands = [
    'Create slides for Quantum Computing',
    'Summarize SpaceX Starship project',
    'Explain Climate Change geo-engineering simply',
    'Generate report on Artificial Intelligence',
  ];

  const handleToggleListen = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript('Listening for your voice command...');

      // Web Speech API fallback simulation
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        try {
          const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.lang = voiceLanguage;
          recognition.onresult = (event: any) => {
            const spokenText = event.results[0][0].transcript;
            setTranscript(spokenText);
            processVoiceCommand(spokenText);
            setIsListening(false);
          };
          recognition.onerror = () => {
            setIsListening(false);
          };
          recognition.start();
        } catch (e) {
          console.log('Speech recognition fallback simulation mode');
          setTimeout(() => {
            const sim = 'Summarize Quantum Computing breakthroughs';
            setTranscript(sim);
            processVoiceCommand(sim);
            setIsListening(false);
          }, 3000);
        }
      } else {
        setTimeout(() => {
          const sim = 'Summarize Quantum Computing breakthroughs';
          setTranscript(sim);
          processVoiceCommand(sim);
          setIsListening(false);
        }, 3000);
      }
    }
  };

  const processVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();

    if (lower.includes('slide') || lower.includes('presentation')) {
      const topic = command.replace(/create slides for|make slides on|presentation on/gi, '').trim() || 'Quantum Computing';
      const text = voiceLanguage === 'hi-IN'
        ? `तैयार है! मैं ${topic} के लिए 5 से 6 स्लाइड प्रस्तुति बना रहा हूँ।`
        : `Understood. Generating a 6-slide presentation deck for ${topic}.`;
      setAiResponseText(text);
      speakText(text);
      setTimeout(() => onGenerateSlides(topic), 1500);
    } else if (lower.includes('report') || lower.includes('summarize')) {
      const topic = command.replace(/generate report on|summarize topic|explain/gi, '').trim() || 'Artificial Intelligence';
      const text = voiceLanguage === 'hi-IN'
        ? `ज़रूर! मैं ${topic} पर विस्तृत शोध रिपोर्ट तैयार कर रहा हूँ।`
        : `Synthesizing literature and market reports for ${topic}.`;
      setAiResponseText(text);
      speakText(text);
      setTimeout(() => onStartResearch(topic), 1500);
    } else {
      const text = voiceLanguage === 'hi-IN'
        ? `मुख्य शोध अंतर्दृष्टि के अनुसार, तकनीक में तेजी से विकास देखा जा रहा है।`
        : `DeepResearch AI synthesis indicates strong empirical backing and high adoption across academic and enterprise labs.`;
      setAiResponseText(text);
      speakText(text);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceLanguage;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 text-center">
      {/* HEADER */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md">
          <Mic className="h-4 w-4 text-purple-400" />
          <span>Multilingual Voice AI Assistant</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Voice Commands & Speech Synthesis</h2>
        <p className="text-xs text-zinc-400 max-w-xl mx-auto">
          Supports English and Hindi speech recognition. Speak voice commands to trigger research synthesis or slide deck creation.
        </p>

        {/* Language selector toggle */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.04] p-1">
            <button
              onClick={() => setVoiceLanguage('en-US')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                voiceLanguage === 'en-US'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              English (en-US)
            </button>
            <button
              onClick={() => setVoiceLanguage('hi-IN')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                voiceLanguage === 'hi-IN'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Hindi (हिन्दी)
            </button>
          </div>
        </div>
      </div>

      {/* ANIMATED PULSING ORB */}
      <div className="relative py-12 flex flex-col items-center justify-center">
        <div
          className={`relative flex h-36 w-36 items-center justify-center rounded-full transition-all duration-500 ${
            isListening
              ? 'bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 ring-8 ring-purple-500/30 scale-110 shadow-2xl shadow-purple-500/50'
              : isSpeaking
              ? 'bg-gradient-to-tr from-indigo-500 via-emerald-500 to-teal-500 ring-8 ring-emerald-500/30 animate-pulse scale-105'
              : 'bg-gradient-to-tr from-indigo-600 to-purple-600 hover:scale-105 shadow-xl shadow-purple-900/30'
          }`}
        >
          <button
            onClick={handleToggleListen}
            className="flex h-32 w-32 items-center justify-center rounded-full bg-[#06060a] transition-transform border border-white/10"
          >
            {isListening ? (
              <Mic className="h-10 w-10 text-rose-400 animate-pulse" />
            ) : isSpeaking ? (
              <Volume2 className="h-10 w-10 text-emerald-400 animate-bounce" />
            ) : (
              <Mic className="h-10 w-10 text-indigo-400" />
            )}
          </button>
        </div>

        <p className="mt-6 text-xs font-bold text-zinc-200">
          {isListening
            ? 'Listening... Speak now'
            : isSpeaking
            ? 'Voice AI responding...'
            : 'Click Orb to Start Listening'}
        </p>

        {transcript && (
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-mono text-indigo-300">
            "{transcript}"
          </div>
        )}
      </div>

      {/* AI RESPONSE BOX */}
      <div className="glass-card rounded-2xl p-6 shadow-xl text-left space-y-2">
        <p className="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Voice Assistant Output
        </p>
        <p className="text-xs text-zinc-200 leading-relaxed font-medium">{aiResponseText}</p>
      </div>

      {/* SAMPLE VOICE COMMAND CHIPS */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <p className="text-xs font-bold text-zinc-400">Try Spoken Commands or Click Chips:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleCommands.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscript(cmd);
                processVoiceCommand(cmd);
              }}
              className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 hover:bg-white/[0.06] transition-all text-xs text-zinc-300 text-left"
            >
              <span>"{cmd}"</span>
              <ArrowRight className="h-3.5 w-3.5 text-purple-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
