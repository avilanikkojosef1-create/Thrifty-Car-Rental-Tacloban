import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Hardcoded demo access
    if (email === 'bandolonmich@gmail.com' && password === 'Thrifty') {
      localStorage.setItem('thrifty_admin_mock', 'true');
      navigate('/admin');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface-light flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-2xl font-bold text-charcoal mb-2">Admin Portal</h1>
          <p className="font-inter text-sm text-charcoal/60">Sign in to manage fleet and blog posts.</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm font-inter">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal bg-white"
                placeholder="admin@thrifty.com"
              />
            </div>
          </div>
          <div>
            <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-gold text-[#FFFFFF] rounded px-4 py-3.5 font-poppins font-bold shadow-md transition-all hover:bg-gold-hover disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="font-inter text-sm text-charcoal/50 hover:text-primary-gold transition-colors"
          >
            ← Back to website
          </button>
        </div>
      </div>
    </div>
  );
}
