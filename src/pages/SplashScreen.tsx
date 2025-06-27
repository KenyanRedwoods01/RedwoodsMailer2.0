import React from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const typedElementRef = React.useRef<HTMLSpanElement>(null);
  const typedRef = React.useRef<Typed | null>(null);

  React.useEffect(() => {
    if (typedElementRef.current) {
      typedRef.current = new Typed(typedElementRef.current, {
        strings: ['Secure', 'Private', 'Scalable'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/auth');
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
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + '%'}
              cy={Math.random() * 100 + '%'}
              r={Math.random() * 50 + 10}
              fill={theme === 'dark' ? 'rgba(49, 130, 206, 0.1)' : 'rgba(49, 130, 206, 0.05)'}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
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
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <motion.path
                d="M60 10C32.4 10 10 32.4 10 60C10 87.6 32.4 110 60 110C87.6 110 110 87.6 110 60C110 32.4 87.6 10 60 10Z"
                stroke={theme === 'dark' ? '#63B3ED' : '#3182CE'}
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M40 50L55 65L80 40"
                stroke={theme === 'dark' ? '#63B3ED' : '#3182CE'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              />
              <motion.path
                d="M40 70H80"
                stroke={theme === 'dark' ? '#63B3ED' : '#3182CE'}
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 3.5 }}
              />
              <motion.path
                d="M40 80H70"
                stroke={theme === 'dark' ? '#63B3ED' : '#3182CE'}
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 4 }}
              />
            </svg>
          </motion.div>

          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Redwoods Mailer
          </motion.h1>

          <motion.div
            className="text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            The <span ref={typedElementRef} className="text-blue-500 font-semibold"></span> Email Platform
          </motion.div>

          <motion.p
            className="text-lg mb-10 max-w-2xl mx-auto opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            A customizable email platform supporting personal, professional, organizational, and institutional use with powerful features and modern design.
          </motion.p>

          <motion.button
            className={`px-8 py-3 rounded-lg font-medium text-white ${
              theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors shadow-lg`}
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <motion.div
          className="text-sm opacity-70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          © {new Date().getFullYear()} Redwoods Dev Team · MIT License
        </motion.div>
      </footer>
    </div>
  );
};

export default SplashScreen;
