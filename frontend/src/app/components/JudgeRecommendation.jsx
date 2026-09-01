import React from 'react';
import { Gavel, Trophy, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

/**
 * ReasoningColumn – individual reasoning block for one solution.
 */
const ReasoningColumn = ({ solutionIndex, score, reasoning, accentColor, lightColor, isWinner }) => (
  <div
    className="flex-1 rounded-2xl p-4"
    style={{
      background: 'rgba(255,255,255,0.55)',
      border: '1px solid rgba(255,255,255,0.7)',
      backdropFilter: 'blur(8px)',
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-xl flex-shrink-0"
        style={{ background: accentColor }}
      >
        {isWinner
          ? <ThumbsUp size={14} color="#0F1117" />
          : <ThumbsDown size={14} color="#0F1117" />
        }
      </div>
      <div>
        <p className="font-semibold text-sm" style={{ color: '#0F1117' }}>
          Solution {solutionIndex}
        </p>
        <p className="text-xs font-bold" style={{ color: '#0F1117' }}>
          Score: {score}/10
        </p>
      </div>
    </div>
    <p className="text-sm leading-relaxed" style={{ color: '#3e484f' }}>
      {reasoning}
    </p>
  </div>
);

/**
 * JudgeRecommendation – full-width verdict card with lime-green gradient.
 *
 * @param {object} props
 * @param {number} props.solution1Score
 * @param {number} props.solution2Score
 * @param {string} props.solution1Reasoning
 * @param {string} props.solution2Reasoning
 */
const JudgeRecommendation = ({
  solution1Score,
  solution2Score,
  solution1Reasoning,
  solution2Reasoning,
}) => {
  const winnerIndex = solution1Score >= solution2Score ? 1 : 2;

  return (
    <div
      className="rounded-3xl p-5 md:p-6 animate-fade-in-up animate-delay-200"
      style={{
        background: 'linear-gradient(135deg, #C9EF72 0%, #A0D65C 60%, #6ECAED 120%)',
        boxShadow: '0 8px 32px rgba(160,214,92,0.25)',
      }}
    >
      {/* Verdict header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl"
            style={{ background: 'rgba(15,17,23,0.12)' }}
          >
            <Gavel size={22} style={{ color: '#0F1117' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: '#0F1117' }}>
              Judge's Verdict
            </h3>
            <p className="text-xs font-medium" style={{ color: 'rgba(15,17,23,0.55)' }}>
              AI-powered analysis &amp; recommendation
            </p>
          </div>
        </div>

        {/* Winner chip */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: '#0F1117',
            boxShadow: '0 4px 12px rgba(15,17,23,0.25)',
          }}
        >
          <Trophy size={14} fill="#C9EF72" color="#C9EF72" />
          <span className="text-sm font-bold" style={{ color: '#C9EF72' }}>
            Winner: Solution {winnerIndex}
          </span>
        </div>
      </div>

      {/* Score bar comparison */}
      <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.4)' }}
      >
        {/* Solution 1 score */}
        <div className="flex-1 text-center">
          <p className="text-xs font-semibold mb-1" style={{ color: 'rgba(15,17,23,0.55)' }}>
            Solution 1
          </p>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: '#0F1117' }}>
            {solution1Score}<span className="text-sm font-medium">/10</span>
          </p>
          <div className="mt-1.5 h-2 rounded-full overflow-hidden"
            style={{ background: 'rgba(15,17,23,0.1)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${solution1Score * 10}%`,
                background: '#A0DDED',
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm"
          style={{ background: 'rgba(15,17,23,0.1)', color: '#0F1117' }}
        >
          vs
        </div>

        {/* Solution 2 score */}
        <div className="flex-1 text-center">
          <p className="text-xs font-semibold mb-1" style={{ color: 'rgba(15,17,23,0.55)' }}>
            Solution 2
          </p>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: '#0F1117' }}>
            {solution2Score}<span className="text-sm font-medium">/10</span>
          </p>
          <div className="mt-1.5 h-2 rounded-full overflow-hidden"
            style={{ background: 'rgba(15,17,23,0.1)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${solution2Score * 10}%`,
                background: '#DCF4A8',
              }}
            />
          </div>
        </div>
      </div>

      {/* Reasoning columns */}
      <div className="flex flex-col sm:flex-row gap-3">
        <ReasoningColumn
          solutionIndex={1}
          score={solution1Score}
          reasoning={solution1Reasoning}
          accentColor="#A0DDED"
          lightColor="rgba(160,221,237,0.3)"
          isWinner={winnerIndex === 1}
        />
        <ReasoningColumn
          solutionIndex={2}
          score={solution2Score}
          reasoning={solution2Reasoning}
          accentColor="#DCF4A8"
          lightColor="rgba(220,244,168,0.3)"
          isWinner={winnerIndex === 2}
        />
      </div>
    </div>
  );
};

export default JudgeRecommendation;
