import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const { language } = useApp();
  const { signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setShowPassword(false);
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    resetForm();
    setMode('login');
    onClose();
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setError(error.message);
        } else {
          handleClose();
        }
      } else if (mode === 'signup') {
        const { error } = await signUpWithEmail(email, password, displayName);
        if (error) {
          setError(error.message);
        } else {
          setSuccess(
            language === 'bn'
              ? 'অ্যাকাউন্ট তৈরি হয়েছে! আপনার ইমেইল চেক করুন।'
              : 'Account created! Check your email for verification.'
          );
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setSuccess(
            language === 'bn'
              ? 'পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে!'
              : 'Password reset link sent to your email!'
          );
        }
      }
    } catch {
      setError(language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ margin: 0 }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full max-w-md bg-black border border-neutral-800 rounded-2xl shadow-2xl px-6 py-8 sm:px-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-wider">
            {mode === 'login'
              ? (language === 'bn' ? 'লগইন করুন' : 'Welcome Back')
              : mode === 'signup'
              ? (language === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account')
              : (language === 'bn' ? 'পাসওয়ার্ড রিসেট' : 'Reset Password')}
          </h2>
          <p className="text-xs text-neutral-400 mt-1.5">
            {mode === 'login'
              ? (language === 'bn' ? 'আপনার MoonLight অ্যাকাউন্টে প্রবেশ করুন' : 'Sign in to your MoonLight account')
              : mode === 'signup'
              ? (language === 'bn' ? 'MoonLight এ যোগ দিন' : 'Join MoonLight tonight')
              : (language === 'bn' ? 'আপনার পাসওয়ার্ড রিসেট করুন' : 'Enter your email to reset password')}
          </p>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div className="flex items-start gap-2 p-3 mb-4 rounded-lg bg-red-950/50 border border-red-900/50 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-start gap-2 p-3 mb-4 rounded-lg bg-green-950/50 border border-green-900/50 text-green-300 text-xs">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          {mode === 'signup' && (
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={language === 'bn' ? 'আপনার নাম' : 'Your name'}
                className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email address'}
              required
              className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          {mode !== 'reset' && (
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                required
                minLength={6}
                className="w-full pl-11 pr-11 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => { setMode('reset'); setError(''); setSuccess(''); }}
                className="text-xs text-neutral-400 hover:text-white transition-colors"
              >
                {language === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'login'
              ? (language === 'bn' ? 'লগইন' : 'Sign In')
              : mode === 'signup'
              ? (language === 'bn' ? 'সাইন আপ' : 'Create Account')
              : (language === 'bn' ? 'রিসেট লিংক পাঠান' : 'Send Reset Link')}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center mt-5 pt-4 border-t border-neutral-800">
          {mode === 'reset' ? (
            <button
              onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              {language === 'bn' ? '← লগইনে ফিরে যান' : '← Back to login'}
            </button>
          ) : (
            <p className="text-xs text-neutral-400">
              {mode === 'login' ? (language === 'bn' ? 'অ্যাকাউন্ট নেই?' : "Don't have an account?") : (language === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?')}{' '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
                className="text-white font-semibold hover:underline"
              >
                {mode === 'login' ? (language === 'bn' ? 'সাইন আপ করুন' : 'Sign up') : (language === 'bn' ? 'লগইন করুন' : 'Sign in')}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
