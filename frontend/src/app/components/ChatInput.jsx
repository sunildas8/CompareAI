import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Loader2 } from 'lucide-react';

/**
 * ChatInput – fixed bottom input bar with auto-growing textarea.
 *
 * @param {object}   props
 * @param {Function} props.onSend     – called with the trimmed message string
 * @param {boolean}  props.isLoading  – disables the input while processing
 */
const ChatInput = ({ onSend, isLoading, focusKey }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  /* Auto-grow the textarea up to 8 lines */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 8 * 24) + 'px';
  }, [message]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [focusKey]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = message.trim().length > 0 && !isLoading;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 md:left-64 lg:left-72 md:px-6 md:py-4"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{
            background: '#fff',
            border: '1.5px solid #e5e7eb',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocusCapture={e => {
            e.currentTarget.style.borderColor = '#2CA5DE';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(44,165,222,0.12)';
          }}
          onBlurCapture={e => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
          }}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask me anything to compare…"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-gray-400"
            style={{
              color: '#171c20',
              lineHeight: '1.5rem',
              maxHeight: '12rem',
              fontFamily: 'Inter, sans-serif',
            }}
          />

          <button
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl transition-all"
            style={{
              background: canSend ? '#2CA5DE' : '#e5e7eb',
              color: canSend ? '#fff' : '#adb5bd',
              cursor: canSend ? 'pointer' : 'not-allowed',
              boxShadow: canSend ? '0 4px 12px rgba(44,165,222,0.35)' : 'none',
              transform: canSend ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            {isLoading
              ? <Loader2 size={18} className="animate-spin" />
              : <SendHorizontal size={18} />
            }
          </button>
        </div>

        <p className="text-center text-xs mt-2" style={{ color: '#adb5bd' }}>
          CompareAI uses two AI models and an AI judge — responses may vary.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
    