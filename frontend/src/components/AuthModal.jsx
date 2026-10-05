import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, LogIn, UserPlus, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '11737737742-dqmb8bm0jn313cqiqp1lidjlha1vdi00.apps.googleusercontent.com';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const googleBtnRef = useRef(null);

  // Initialize and render Google Sign In button
  useEffect(() => {
    if (!isOpen) return;

    let checkInterval = null;

    const initGoogle = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            type: 'standard',
            theme: 'filled_black',
            size: 'large',
            text: isLogin ? 'signin_with' : 'signup_with',
            shape: 'pill',
            logo_alignment: 'left',
            width: 320,
          });
        } catch (err) {
          console.warn('Google Sign-In initialization note:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      checkInterval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(checkInterval);
          initGoogle();
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [isOpen, isLogin]);

  if (!isOpen) return null;

  // Handle Google OAuth Credential
  const handleGoogleResponse = async (googleResponse) => {
    setErrorMsg('');
    setSuccessMsg('');
    setGoogleLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: googleResponse.credential }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Google authentication failed');
      }

      // Persist credentials
      if (data.token) localStorage.setItem('hotel_token', data.token);
      if (data.user) localStorage.setItem('hotel_user', JSON.stringify(data.user));

      setSuccessMsg(`Welcome, ${data.user.name || 'Guest'}!`);

      setTimeout(() => {
        if (onSuccess) onSuccess(data.user);
        onClose();
      }, 700);
    } catch (err) {
      console.error('Google Auth Error:', err);
      setErrorMsg(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle Standard Email & Password Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const endpoint = isLogin
      ? `${API_BASE}/api/auth/login`
      : `${API_BASE}/api/auth/register`;

    const payload = isLogin
      ? { email: email.trim(), password }
      : { name: name.trim(), email: email.trim(), password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Save to localStorage
      if (data.token) localStorage.setItem('hotel_token', data.token);
      if (data.user) localStorage.setItem('hotel_user', JSON.stringify(data.user));

      setSuccessMsg(data.message || (isLogin ? 'Logged in successfully' : 'Registered successfully'));

      setTimeout(() => {
        if (onSuccess) onSuccess(data.user);
        onClose();
      }, 700);
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg(err.message || 'Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-hotel-emerald-dark border border-hotel-gold/40 rounded-2xl shadow-2xl overflow-hidden text-white font-sans max-h-[95vh] overflow-y-auto">
        
        {/* Top Decorative Header */}
        <div className="relative bg-gradient-to-r from-hotel-emerald-dark via-hotel-emerald to-hotel-emerald-dark p-6 text-center border-b border-hotel-gold/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-hotel-gold/50 flex items-center justify-center bg-hotel-gold/10">
            <Sparkles className="w-5 h-5 text-hotel-gold" />
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-wider text-hotel-gold">
            EQUALIRIO
          </h3>
          <p className="text-[11px] tracking-[0.25em] uppercase text-hotel-gold-light opacity-90 mt-0.5">
            Guest Concierge Portal
          </p>

          {/* Toggle Tabs */}
          <div className="mt-5 grid grid-cols-2 p-1 bg-black/30 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                isLogin
                  ? 'bg-hotel-gold text-hotel-emerald-dark shadow-gold font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                !isLogin
                  ? 'bg-hotel-gold text-hotel-emerald-dark shadow-gold font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          
          {/* Official Google Sign-In Button */}
          <div className="flex flex-col items-center justify-center gap-2 pt-1">
            <div
              ref={googleBtnRef}
              className="w-full flex justify-center min-h-[44px]"
            ></div>
            {googleLoading && (
              <span className="text-xs text-hotel-gold animate-pulse">Connecting with Google...</span>
            )}
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-white/15 w-full"></div>
            <span className="bg-hotel-emerald-dark px-3 text-[10px] tracking-widest uppercase text-gray-400 shrink-0">
              or use email
            </span>
            <div className="border-t border-white/15 w-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Register: Name Input */}
            {!isLogin && (
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-hotel-gold mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-hotel-gold/60 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-hotel-gold transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-[11px] font-serif uppercase tracking-wider text-hotel-gold mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-hotel-gold/60 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@equalirio.com"
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-hotel-gold transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[11px] font-serif uppercase tracking-wider text-hotel-gold mb-1 flex items-center justify-between">
                <span>Password</span>
                {!isLogin && (
                  <span className="text-[10px] text-gray-400 font-sans">8+ chars</span>
                )}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-hotel-gold/60 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-hotel-gold transition-colors"
                />
              </div>
            </div>

            {/* Alerts */}
            {errorMsg && (
              <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-xl flex items-start gap-2 text-red-200 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-900/40 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-emerald-200 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-hotel-gold to-hotel-gold-dark hover:from-hotel-gold-light hover:to-hotel-gold text-hotel-emerald-dark font-bold text-xs uppercase tracking-widest transition-all shadow-gold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Equalirio</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Guest Profile</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-black/30 border-t border-white/10 text-center text-[11px] text-gray-400">
          By signing in, you access VIP suite reservations and personalized concierge services.
        </div>
      </div>
    </div>
  );
}
