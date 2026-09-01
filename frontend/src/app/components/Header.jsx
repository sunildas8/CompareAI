import React from 'react';
import { Zap, Menu, X } from 'lucide-react';

/**
 * Header – top navigation bar with glassmorphism on desktop.
 * @param {object}  props
 * @param {boolean} props.sidebarOpen   – whether the sidebar is visible on mobile
 * @param {Function} props.onToggleSidebar – toggles the mobile sidebar
 */
const Header = ({ sidebarOpen, onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: 'rgba(15,17,23,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          {/* Mobile sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand mark */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-xl"
              style={{ background: 'linear-gradient(135deg,#2CA5DE,#6ECAED)' }}
            >
              <Zap size={16} fill="#fff" color="#fff" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight select-none">
              Compare<span style={{ color: '#6ECAED' }}>AI</span>
            </span>
          </div>
        </div>

        {/* Tagline – hidden on very small screens */}
        <p className="hidden sm:block text-sm font-medium"
          style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}
        >
          Compare&nbsp;·&nbsp;Judge&nbsp;·&nbsp;Decide
        </p>

        {/* Right badges */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(44,165,222,0.15)',
              color: '#6ECAED',
              border: '1px solid rgba(44,165,222,0.25)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Live
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
