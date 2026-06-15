import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useCart();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setEmail('');
      setPassword('');
      setName('');
      setConfirmPassword('');
      setShowSuccess(false);
      setTab('login');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    const displayName = name.trim() || email.split('@')[0];
    login(email.trim(), displayName);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !name.trim()) return;
    if (password !== confirmPassword) return;
    login(email.trim(), name.trim());
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[80] flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-primary-500 px-6 py-8 text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <i className="ri-close-line" />
            </button>
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 text-white mx-auto mb-3">
              <i className="ri-user-smile-line text-2xl" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-primary-100 mt-1">
              {tab === 'login'
                ? 'Sign in to access your account and orders'
                : 'Join our parish community today'}
            </p>
          </div>

          {/* Success State */}
          {showSuccess ? (
            <div className="px-6 py-10 text-center">
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-500 mx-auto mb-3">
                <i className="ri-check-line text-3xl" />
              </span>
              <p className="text-lg font-semibold text-foreground-900">Successfully signed in!</p>
              <p className="text-sm text-foreground-500 mt-1">Welcome to St. Joan of Arc</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-background-200">
                <button
                  onClick={() => setTab('login')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    tab === 'login'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setTab('register')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    tab === 'register'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Form */}
              <div className="px-6 py-5">
                {tab === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-background-50 text-foreground-800 placeholder:text-foreground-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-background-50 text-foreground-800 placeholder:text-foreground-400"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-1.5 text-foreground-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                        Remember me
                      </label>
                      <button type="button" className="text-primary-500 hover:text-primary-600 cursor-pointer whitespace-nowrap">
                        Forgot password?
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Sign In
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-background-50 text-foreground-800 placeholder:text-foreground-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-background-50 text-foreground-800 placeholder:text-foreground-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-background-50 text-foreground-800 placeholder:text-foreground-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800 placeholder:text-foreground-400 ${
                          confirmPassword && password !== confirmPassword
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-background-300 focus:border-primary-400'
                        }`}
                        required
                      />
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Create Account
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}