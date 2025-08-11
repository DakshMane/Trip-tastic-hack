// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { Globe, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

// interface SignupFormProps {
//   onToggleForm: () => void;
// }

// const SignupForm: React.FC<SignupFormProps> = ({ onToggleForm }) => {
//   const { signup, isLoading } = useAuth();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }
    
//     try {
//       await signup(name, email, password);
//     } catch (err) {
//       setError('Failed to create account');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>
      
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <div className="relative">
//               <Globe className="h-16 w-16 text-white drop-shadow-lg" />
//               <div className="absolute inset-0 h-16 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
//             </div>
//           </div>
//           <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Join GlobeTrotter</h2>
//           <p className="mt-2 text-lg text-gray-200">Create your account and start planning amazing adventures</p>
//         </div>

//         <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 relative z-10" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 backdrop-blur-sm">
//               <p className="text-sm text-red-200">{error}</p>
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
//                 Full name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300 backdrop-blur-sm"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
//                 Email address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300 backdrop-blur-sm"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="new-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300 backdrop-blur-sm"
//                   placeholder="Create a password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-3 text-gray-300 hover:text-white transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
//                 Confirm password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   autoComplete="new-password"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300 backdrop-blur-sm"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-3 text-gray-300 hover:text-white transition-colors"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               required
//               className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-white/20 rounded bg-white/10"
//             />
//             <label htmlFor="terms" className="ml-2 block text-sm text-gray-200">
//               I agree to the{' '}
//               <a href="#" className="text-cyan-300 hover:text-cyan-200">Terms of Service</a>
//               {' '}and{' '}
//               <a href="#" className="text-cyan-300 hover:text-cyan-200">Privacy Policy</a>
//             </label>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               {isLoading ? 'Creating account...' : 'Create account'}
//             </button>
//           </div>

//           <div className="text-center">
//             <p className="text-sm text-gray-200">
//               Already have an account?{' '}
//               <button
//                 type="button"
//                 onClick={onToggleForm}
//                 className="font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
//               >
//                 Sign in
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';// ✅ match exact file name
import { Globe, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface SignupFormProps {
  onToggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleForm }) => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await signup(name.trim(), email.trim(), password);
    } catch {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative">
              <Globe className="h-16 w-16 text-white drop-shadow-lg" />
              <div className="absolute inset-0 h-16 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Join GlobeTrotter</h2>
          <p className="mt-2 text-lg text-gray-200">Create your account and start planning amazing adventures</p>
        </div>

        <form
          className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 relative z-10"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-300 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-300"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-300 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-white/20 rounded bg-white/10"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-200">
              I agree to the{' '}
              <a href="#" className="text-cyan-300 hover:text-cyan-200">Terms of Service</a> and{' '}
              <a href="#" className="text-cyan-300 hover:text-cyan-200">Privacy Policy</a>
            </label>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          {/* Toggle to Sign In */}
          <div className="text-center">
            <p className="text-sm text-gray-200">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onToggleForm}
                className="font-medium text-cyan-300 hover:text-cyan-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
