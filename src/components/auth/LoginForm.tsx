import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Globe, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-0"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-br from-blue-900 to-cyan-700 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative">
              <Globe className="h-16 w-16 text-cyan-400 drop-shadow-[0_0_10px_cyan]" />
              <div className="absolute inset-0 h-16 w-16 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-full blur-xl opacity-40 animate-pulse"></div>
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fadeInUp">
            Welcome back to GlobeTrotter
          </h2>
          <p className="mt-2 text-lg text-gray-300 animate-fadeInUp delay-150">
            Sign in to your account to continue planning your adventures
          </p>
        </div>

        <form
          className="mt-8 space-y-6 bg-black/70 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.4)] border border-cyan-700 relative z-10"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-900/80 border border-red-600 rounded-lg p-4 backdrop-blur-sm animate-shake">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-cyan-400 mb-2 tracking-wide"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-cyan-600" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-black/30 border border-cyan-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-cyan-300 placeholder-cyan-700 backdrop-blur-sm transition-shadow duration-300 shadow-cyan-600/30 focus:shadow-cyan-600"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-cyan-400 mb-2 tracking-wide"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-cyan-600" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-black/30 border border-cyan-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-cyan-300 placeholder-cyan-700 backdrop-blur-sm transition-shadow duration-300 shadow-cyan-600/30 focus:shadow-cyan-600"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-cyan-400 hover:text-cyan-200 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-cyan-300">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-cyan-600 rounded bg-black/30"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm select-none">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-black bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-600"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-cyan-300">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onToggleForm}
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Add some custom animations via Tailwind keyframes */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out 2;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;


