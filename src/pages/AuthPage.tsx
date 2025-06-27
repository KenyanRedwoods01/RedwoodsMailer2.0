import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Mail, Lock, User, Building, Globe, Phone } from 'lucide-react';

type UserType = 'personal' | 'organization' | 'institution' | 'developer' | 'freelancer' | 'startup' | 'ngo' | 'government' | 'religious' | 'healthcare';

interface AuthFormProps {
  formType: 'login' | 'signup';
  onToggleForm: () => void;
}

const AuthPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [formType, setFormType] = useState<'login' | 'signup'>('login');

  const toggleForm = () => {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Background SVG Animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#1a365d' : '#ebf8ff'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#2d3748' : '#bee3f8'} />
            </linearGradient>
          </defs>
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gradient)"
            initial={{ opacity: 0.4 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Redwoods Mailer
        </motion.div>
        <motion.button
          className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
          {/* Left Column - Branding */}
          <motion.div 
            className={`w-full md:w-5/12 p-8 flex flex-col justify-center items-center text-white ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <motion.path
                  d="M60 10C32.4 10 10 32.4 10 60C10 87.6 32.4 110 60 110C87.6 110 110 87.6 110 60C110 32.4 87.6 10 60 10Z"
                  stroke="white"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
                <motion.path
                  d="M40 50L55 65L80 40"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                />
                <motion.path
                  d="M40 70H80"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 3 }}
                />
                <motion.path
                  d="M40 80H70"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 3.5 }}
                />
              </svg>
            </div>
            <motion.h2 
              className="text-3xl font-bold mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Welcome to Redwoods Mailer
            </motion.h2>
            <motion.p 
              className="text-center mb-8 opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              The secure, private, and scalable email platform for all your communication needs.
            </motion.p>
            <motion.div
              className="space-y-4 w-full max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                  <Lock size={20} />
                </div>
                <div>Secure Communication</div>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                  <User size={20} />
                </div>
                <div>Customizable Experience</div>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                  <Globe size={20} />
                </div>
                <div>Global Accessibility</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Auth Form */}
          <motion.div 
            className={`w-full md:w-7/12 p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AuthForm formType={formType} onToggleForm={toggleForm} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <motion.div
          className="text-sm opacity-70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          © {new Date().getFullYear()} Redwoods Dev Team · MIT License
        </motion.div>
      </footer>
    </div>
  );
};

const AuthForm: React.FC<AuthFormProps> = ({ formType, onToggleForm }) => {
  const { theme } = useTheme();
  const [userType, setUserType] = useState<UserType>('personal');

  return (
    <div>
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {formType === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
      </motion.h2>

      {formType === 'signup' && (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-sm font-medium mb-2">Account Type</label>
          <select 
            className={`w-full p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
          >
            <option value="personal">Personal</option>
            <option value="organization">Organization</option>
            <option value="institution">Institution</option>
            <option value="developer">Developer</option>
            <option value="freelancer">Freelancer</option>
            <option value="startup">Startup</option>
            <option value="ngo">NGO</option>
            <option value="government">Government</option>
            <option value="religious">Religious</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </motion.div>
      )}

      <motion.form 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {formType === 'signup' && (
          <>
            {/* Dynamic fields based on user type */}
            {userType === 'personal' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className={`flex items-center p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    <User size={20} className="mr-2 text-gray-400" />
                    <input 
                      type="text" 
                      className={`w-full bg-transparent focus:outline-none`}
                      placeholder="Enter your full name" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className={`flex items-center p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    <Phone size={20} className="mr-2 text-gray-400" />
                    <input 
                      type="tel" 
                      className={`w-full bg-transparent focus:outline-none`}
                      placeholder="Enter your phone number" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <div className={`flex items-center p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    <Globe size={20} className="mr-2 text-gray-400" />
                    <input 
                      type="text" 
                      className={`w-full bg-transparent focus:outline-none`}
                      placeholder="Enter your country" 
                    />
                  </div>
                </div>
              </>
            )}

            {userType === 'organization' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Organization Name</label>
                  <div className={`flex items-center p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    <Building size={20} className="mr-2 text-gray-400" />
                    <input 
                      type="text" 
                      className={`w-full bg-transparent focus:outline-none`}
                      placeholder="Enter organization name" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Domain</label>
                  <div className={`flex items-center p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    <Globe size={20} className="mr-2 text-gray-400" />
                    <input 
                      type="text" 
                      className={`w-full bg-transparent focus:outline-none`}
                      placeholder="Enter your domain" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Admin Name</label>
                  <div className={`flex items-center p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    <User size={20} className="mr-2 text-gray-400" />
                    <input 
                      type="text" 
                      className={`w-full bg-transparent focus:outline-none`}
                      placeholder="Enter admin name" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <div className={`flex items-center p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    <Building size={20} className="mr-2 text-gray-400" />
                    <input 
                      type="text" 
                      className={`w-full bg-transparent focus:outline-none`}
                      placeholder="Enter your industry" 
                    />
                  </div>
                </div>
              </>
            )}

            {/* Similar blocks for other user types would be added here */}
          </>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <div className={`flex items-center p-3 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-gray-50 border-gray-300 text-gray-900'
          }`}>
            <Mail size={20} className="mr-2 text-gray-400" />
            <input 
              type="email" 
              className={`w-full bg-transparent focus:outline-none`}
              placeholder="Enter your email" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className={`flex items-center p-3 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-gray-50 border-gray-300 text-gray-900'
          }`}>
            <Lock size={20} className="mr-2 text-gray-400" />
            <input 
              type="password" 
              className={`w-full bg-transparent focus:outline-none`}
              placeholder="Enter your password" 
            />
          </div>
        </div>

        {formType === 'login' && (
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
        )}

        <motion.button
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } transition-colors shadow-md`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {formType === 'login' ? 'Sign In' : 'Create Account'}
        </motion.button>

        <div className="text-center mt-6">
          <p>
            {formType === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={onToggleForm}
              className="text-blue-500 hover:underline font-medium"
            >
              {formType === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default AuthPage;
