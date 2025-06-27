import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        /* Import custom fonts */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

        /* Reset and base styles */
        *, *::before, *::after {
          box-sizing: border-box;
          transition: all 0.15s ease-in-out;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Nunito', sans-serif;
          color: #1F2937;
          background-color: #F9FAFB;
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Montserrat', sans-serif;
          margin-top: 0;
          font-weight: 600;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #9CA3AF;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }

        /* Focus styles for accessibility */
        :focus-visible {
          outline: 2px solid #FF7A00;
          outline-offset: 2px;
        }

        /* Animation classes */
        .fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .fade-out {
          animation: fadeOut 0.2s ease-out forwards;
        }

        .slide-in-top {
          animation: slideInFromTop 0.3s ease-out forwards;
        }

        .slide-in-right {
          animation: slideInFromRight 0.3s ease-out forwards;
        }

        .pulse {
          animation: pulse 2s infinite ease-in-out;
        }

        /* Utility classes */
        .rounded-corners {
          border-radius: 0.5rem;
        }

        .rounded-full {
          border-radius: 9999px;
        }

        .orange-gradient {
          background: linear-gradient(90deg, #FF7A00, #FFA04D, #FF7A00);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        /* Keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.98);
          }
        }

        @keyframes slideInFromTop {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(20px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}
    />
  );
};

export default GlobalStyles;
