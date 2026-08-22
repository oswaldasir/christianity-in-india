import React from 'react';

export const Icon = ({ name, className = '' }: { name: string; className?: string }) => {
  switch (name) {
    case 'cross':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <linearGradient id="grad-cross" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="shadow-cross" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#D97706" floodOpacity="0.4"/>
            </filter>
          </defs>
          <path d="M10 2h4v6h6v4h-6v10h-4v-10h-6v-4h6v-6z" fill="url(#grad-cross)" filter="url(#shadow-cross)"></path>
        </svg>
      );
    case 'church':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <linearGradient id="grad-church" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
            <filter id="shadow-church" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#6D28D9" floodOpacity="0.4"/>
            </filter>
          </defs>
          <path d="M11 2h2v2h-2v-2zm-1 4h4v3.2l5 3v9.8h-6v-5h-2v5h-6v-9.8l5-3v-3.2zm2 5.5l-3 1.8v6.7h2v-4h2v4h2v-6.7l-3-1.8z" fill="url(#grad-church)" filter="url(#shadow-church)"></path>
        </svg>
      );
    case 'music':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <linearGradient id="grad-music" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            <filter id="shadow-music" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#BE185D" floodOpacity="0.4"/>
            </filter>
          </defs>
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-8h6v-6h-8zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="url(#grad-music)" filter="url(#shadow-music)"></path>
        </svg>
      );
    case 'medical':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <linearGradient id="grad-medical" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <filter id="shadow-medical" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#B91C1C" floodOpacity="0.4"/>
            </filter>
          </defs>
          <path d="M4.5 10.5h4.5v-4.5c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v4.5h4.5c.83 0 1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5h-4.5v4.5c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5v-4.5h-4.5c-.83 0-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5z" fill="url(#grad-medical)" filter="url(#shadow-medical)"></path>
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <defs>
            <linearGradient id="grad-book" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <filter id="shadow-book" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#1D4ED8" floodOpacity="0.4"/>
            </filter>
          </defs>
          <path d="M18 2h-12c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm0 18h-12v-2h12v2zm0-4h-12v-12h12v12z" fill="url(#grad-book)" filter="url(#shadow-book)"></path>
        </svg>
      );
    default:
      return null;
  }
};
