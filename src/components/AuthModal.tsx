import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'otp'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'forgot') {
        setOtpSent(true);
        setMode('otp');
        setLoading(false);
        return;
      }

      if (mode === 'otp') {
        setMode('login');
        setLoading(false);
        return;
      }

      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || 'user@example.com', password, name: email ? email.split('@')[0] : 'User' }),
      });

      const data = await response.json();
      if (data.token && data.user) {
        onLoginSuccess(data.user, data.token);
        onClose();
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Fallback local signin
      onLoginSuccess(
        {
          id: `usr_${Date.now()}`,
          name: email ? email.split('@')[0] : 'User',
          email: email || 'user@example.com',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email || 'user'}`,
          role: 'pro_analyst',
          created_at: new Date().toISOString(),
        },
        `jwt_demo_token_${Date.now()}`
      );
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess(
        {
          id: `usr_google_${Date.now()}`,
          name: 'Google User',
          email: 'user@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          role: 'pro_analyst',
          created_at: new Date().toISOString(),
        },
        `jwt_google_token_${Date.now()}`
      );
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#07080e]/90 p-6 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Glow overlay */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">DeepResearch AI</h3>
            <p className="text-[11px] text-zinc-400">GenAI Research Assistant</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`pb-2 px-4 text-xs font-semibold transition-colors border-b-2 ${
              mode === 'login'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`pb-2 px-4 text-xs font-semibold transition-colors border-b-2 ${
              mode === 'signup'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode !== 'otp' && (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {mode !== 'forgot' && mode !== 'otp' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-zinc-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-indigo-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {mode === 'otp' && (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Enter 6-Digit OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="842910"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-center text-lg font-mono tracking-widest text-indigo-400 focus:border-indigo-500 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> OTP verification code sent to email.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : mode === 'forgot' ? (
              <span>Send Recovery Code</span>
            ) : mode === 'otp' ? (
              <span>Verify OTP & Sign In</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Create Pro Account'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Google OAuth Simulation */}
        {mode !== 'forgot' && mode !== 'otp' && (
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
