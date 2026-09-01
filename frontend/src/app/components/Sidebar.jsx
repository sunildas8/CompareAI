import React from 'react';
import { MessageSquare, Clock, ChevronRight, PlusCircle, X } from 'lucide-react';

/**
 * Sidebar – displays chat history.
 * On mobile it renders as a full-height overlay drawer.
 */
const Sidebar = ({ history, activeId, onSelect, onNewComparison, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'fixed md:relative z-50 md:z-auto',
          'top-0 left-0 md:top-auto md:left-auto',
          'h-full md:h-full',
          'w-72 md:w-64 lg:w-72',
          'flex flex-col flex-shrink-0',
          'transition-transform duration-300 ease-in-out md:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
        style={{
          background: '#0F1117',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          zIndex: 1000,
        }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            History
          </h2>
          <button
            onClick={onClose}
            className="md:hidden text-white/40 hover:text-white/80 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* New chat button */}
        <div className="px-3 mb-3">
          <button
            onClick={onNewComparison}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: 'rgba(44,165,222,0.12)',
              color: '#6ECAED',
              border: '1px solid rgba(44,165,222,0.2)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(44,165,222,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(44,165,222,0.12)'}
          >
            <PlusCircle size={15} />
            New comparison
          </button>
        </div>

        {/* History list */}
        <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-1">
          {history.length === 0 ? (
            <p className="text-xs text-center mt-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
              No history yet
            </p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => { onSelect(item.id); onClose(); }}
                className="flex items-start gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all group"
                style={{
                  background: activeId === item.id
                    ? 'rgba(44,165,222,0.15)'
                    : 'transparent',
                  border: activeId === item.id
                    ? '1px solid rgba(44,165,222,0.2)'
                    : '1px solid transparent',
                }}
                onMouseEnter={e => {
                  if (activeId !== item.id)
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  if (activeId !== item.id)
                    e.currentTarget.style.background = 'transparent';
                }}
              >
                <MessageSquare
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: activeId === item.id ? '#6ECAED' : 'rgba(255,255,255,0.3)' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate"
                    style={{ color: activeId === item.id ? '#fff' : 'rgba(255,255,255,0.65)' }}
                  >
                    {item.problem}
                  </p>
                  <p className="flex items-center gap-1 text-xs mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    <Clock size={10} />
                    {item.time}
                  </p>
                </div>
                {activeId === item.id && (
                  <ChevronRight size={14} style={{ color: '#6ECAED', flexShrink: 0 }} />
                )}
              </button>
            ))
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
