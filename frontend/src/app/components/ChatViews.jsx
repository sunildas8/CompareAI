import React from 'react';
import { Zap } from 'lucide-react';

/**
 * TypingIndicator – animated dots to show AI is thinking.
 */
const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl w-fit"
    style={{ background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
  >
    <span className="typing-dot" />
    <span className="typing-dot" />
    <span className="typing-dot" />
  </div>
);

/**
 * WelcomeScreen – shown before any conversation is started.
 */
const WelcomeScreen = () => {
 
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
      {/* Hero icon */}
      <div
        className="flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
        style={{
          background: 'linear-gradient(135deg,#2CA5DE 0%,#6ECAED 100%)',
          boxShadow: '0 12px 40px rgba(44,165,222,0.25)',
        }}
      >
        <Zap size={36} fill="#fff" color="#fff" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: '#0F1117' }}>
        Welcome to <span style={{ color: '#2CA5DE' }}>CompareAI</span>
      </h1>
      <p className="max-w-md text-base mb-10" style={{ color: '#6e7880' }}>
        Ask any question and get two independent AI answers, then let our
        judge decide which one is better.
      </p>
    </div>
  );
};

/**
 * ResultsView – the main comparison layout with two solutions + judge.
 */
const ResultsView = ({ data, children }) => (
  <div className="flex flex-col gap-5">
    {/* Problem banner */}
    <div
      className="rounded-2xl px-5 py-4"
      style={{
        background: 'rgba(15,17,23,0.05)',
        border: '1px solid rgba(15,17,23,0.08)',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#6e7880' }}>
        Your question
      </p>
      <p className="font-semibold text-base" style={{ color: '#0F1117' }}>
        {data.problem}
      </p>
    </div>

    {/* Solutions grid */}
    {children}
  </div>
);

export { WelcomeScreen, ResultsView, TypingIndicator };
