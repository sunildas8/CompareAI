import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SolutionCard from './components/SolutionCard';
import JudgeRecommendation from './components/JudgeRecommendation';
import ChatInput from './components/ChatInput';
import { WelcomeScreen, ResultsView, TypingIndicator } from './components/ChatViews';
import './index.css';
import axios from 'axios';

/**
 * App – root component that orchestrates the full CompareAI experience.
 *
 * State:
 *  - conversations  : array of { id, problem, result }
 *  - activeId       : id of the currently displayed conversation
 *  - isLoading      : true while "waiting" for AI response (simulated)
 *  - sidebarOpen    : mobile sidebar visibility
 */
const App = () => {
  const [conversations, setConversations] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputFocusKey, setInputFocusKey] = useState(0);

  const mainRef = useRef(null);

  useEffect(() => {
    const loadComparisons = async () => {
      try {
        const response = await axios.get('http://localhost:3000/comparisons');
        const comparisons = response.data?.comparisons || [];

        setConversations(comparisons);
        setHistory(comparisons.map(({ id, problem, createdAt }) => ({
          id,
          problem,
          time: new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })));
      } catch (err) {
        console.error('Failed to load comparison history:', err);
      }
    };

    loadComparisons();
  }, []);

  /* Scroll to bottom whenever the active conversation changes */
  useEffect(() => {
    mainRef.current?.scrollTo({ top: mainRef.current.scrollHeight, behavior: 'smooth' });
  }, [activeId, isLoading]);

  /** Handle a new message from the chat input. */
  const handleSend = async (message) => {
    const id = Date.now().toString();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Optimistically add a loading entry
    setConversations((prev) => [...prev, { id, problem: message, result: null }]);
    setHistory((prev) => [{ id, problem: message, time: timestamp }, ...prev]);
    setActiveId(id);
    setIsLoading(true);
    setSidebarOpen(false);

    try {
      const response = await axios.post('http://localhost:3000/invoke', {
        input: message
      });

      const data = response.data;
      const result = data?.result;

      if (!result) {
        throw new Error('No result found in API response');
      }

      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, result } : c))
      );
    } catch (err) {
      console.error('Comparison failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle clicking a history item in the sidebar. */
  const handleSelectHistory = (id) => {
    setActiveId(id);
    setSidebarOpen(false);
  };

  const handleNewComparison = () => {
    setActiveId(null);
    setSidebarOpen(false);
    setInputFocusKey((key) => key + 1);
  };

  const activeConversation = conversations.find((c) => c.id === activeId);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#F6F8F6' }}>
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      {/* Body – sidebar + main content */}
      <div className="flex flex-1 overflow-hidden" style={{ paddingTop: '4rem' /* header height */ }}>

        {/* Sidebar */}
        <Sidebar
          history={history}
          activeId={activeId}
          onSelect={handleSelectHistory}
          onNewComparison={handleNewComparison}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main scrollable area */}
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto flex flex-col"
          style={{ paddingBottom: '8rem' /* chat input height */ }}
        >
          {/* No conversation started yet */}
          {!activeConversation && !isLoading && (
            <WelcomeScreen
              onExampleClick={handleSend}
            />
          )}

          {/* Active conversation content */}
          {activeConversation && (
            <div className="flex-1 px-4 py-6 md:px-8 max-w-screen-xl mx-auto w-full">
              <ResultsView data={activeConversation}>

                {/* Waiting for result */}
                {!activeConversation.result ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i}
                          className="rounded-3xl p-5 animate-pulse"
                          style={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderTop: `4px solid ${i === 1 ? '#A0DDED' : '#DCF4A8'}`,
                            minHeight: 220,
                          }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl" style={{ background: '#eaeef3' }} />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 rounded" style={{ background: '#eaeef3', width: '40%' }} />
                              <div className="h-2 rounded" style={{ background: '#eaeef3', width: '25%' }} />
                            </div>
                          </div>
                          {[1, 0.8, 0.6, 0.9, 0.5].map((w, j) => (
                            <div key={j} className="h-2.5 rounded mb-2" style={{ background: '#eaeef3', width: `${w * 100}%` }} />
                          ))}
                          <TypingIndicator />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {/* Two solution cards side by side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                      <SolutionCard
                        index={1}
                        content={activeConversation.result.solution_1}
                        score={activeConversation.result.jude_recommendation.solution_1_score}
                        accentColor="#A0DDED"
                        lightColor="rgba(160,221,237,0.2)"
                        isWinner={
                          activeConversation.result.jude_recommendation.solution_1_score >=
                          activeConversation.result.jude_recommendation.solution_2_score
                        }
                      />
                      <SolutionCard
                        index={2}
                        content={activeConversation.result.solution_2}
                        score={activeConversation.result.jude_recommendation.solution_2_score}
                        accentColor="#DCF4A8"
                        lightColor="rgba(220,244,168,0.2)"
                        isWinner={
                          activeConversation.result.jude_recommendation.solution_2_score >
                          activeConversation.result.jude_recommendation.solution_1_score
                        }
                      />
                    </div>

                    {/* Judge recommendation – full width below */}
                    <JudgeRecommendation
                      solution1Score={activeConversation.result.jude_recommendation.solution_1_score}
                      solution2Score={activeConversation.result.jude_recommendation.solution_2_score}
                      solution1Reasoning={activeConversation.result.jude_recommendation.solution_1_reasoning}
                      solution2Reasoning={activeConversation.result.jude_recommendation.solution_2_reasoning}
                    />
                  </div>
                )}
              </ResultsView>
            </div>
          )}
          {/* Fixed bottom input */}
          <ChatInput onSend={handleSend} isLoading={isLoading} focusKey={inputFocusKey} />
        </main>
      </div>

    </div>
  );
};

export default App;