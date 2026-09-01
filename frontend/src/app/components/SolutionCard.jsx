import React from 'react';
import { Bot, Star } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

/**
 * ScoreBadge – animated circular score badge.
 */
const ScoreBadge = ({ score, accentColor }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const fraction = score / 10;
  const dashOffset = circumference * (1 - fraction);

  return (
    <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
      {/* Background ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="4" />
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <span className="relative text-sm font-bold" style={{ color: '#0F1117' }}>
        {score}<span className="text-xs font-medium">/10</span>
      </span>
    </div>
  );
};

/**
 * SolutionCard – displays one AI solution with markdown content and a score badge.
 *
 * @param {object}  props
 * @param {number}  props.index        – 1 or 2
 * @param {string}  props.content      – markdown string
 * @param {number}  props.score        – 0-10
 * @param {string}  props.accentColor  – border / badge color
 * @param {string}  props.lightColor   – subtle background tint
 * @param {boolean} props.isWinner     – whether this solution won
 */
const SolutionCard = ({ index, content, score, accentColor, lightColor, isWinner }) => {
  return (
    <div
      className="flex flex-col rounded-3xl overflow-hidden animate-fade-in-up"
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
        borderTop: `4px solid ${accentColor}`,
        animationDelay: `${(index - 1) * 0.1}s`,
      }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid #f0f4f9' }}
      >
        <div className="flex items-center gap-2.5">
          {/* Icon */}
          <div className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
            style={{ background: lightColor }}
          >
            <Bot size={18} style={{ color: accentColor }} />
          </div>
          <div>
            <h3 className="font-semibold text-base" style={{ color: '#0F1117' }}>
              Solution {index}
            </h3>
            <p className="text-xs" style={{ color: '#6e7880' }}>AI Model {index}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isWinner && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'linear-gradient(90deg,#C9EF72,#A0D65C)',
                color: '#0F1117',
              }}
            >
              <Star size={10} fill="#0F1117" /> Winner
            </span>
          )}
          <ScoreBadge score={score} accentColor={accentColor} />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 px-5 py-4 overflow-y-auto" style={{ maxHeight: '55vh' }}>
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
};

export default SolutionCard;
