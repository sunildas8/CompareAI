import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

/** Copy-to-clipboard hook for code blocks */
const useCopyToClipboard = () => {
  const [copied, setCopied] = React.useState(false);
  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return [copied, copy];
};

/** Single code block with copy button */
const CodeBlock = ({ language, code }) => {
  const [copied, copy] = useCopyToClipboard();
  return (
    <div className="relative rounded-2xl overflow-hidden my-3"
      style={{ background: '#0F1117', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Code header bar */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6e7880' }}>
          {language || 'code'}
        </span>
        <button
          onClick={() => copy(code)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
          style={{
            background: copied ? 'rgba(92,173,60,0.15)' : 'rgba(255,255,255,0.06)',
            color: copied ? '#A0D65C' : '#6e7880',
            border: `1px solid ${copied ? 'rgba(92,173,60,0.3)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <SyntaxHighlighter
        style={oneDark}
        language={language || 'text'}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
        }}
        codeTagProps={{ style: { fontFamily: "'Fira Code','Courier New',monospace" } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

/**
 * MarkdownRenderer – renders markdown with syntax-highlighted code blocks.
 */
const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose-compare">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const code = String(children).replace(/\n$/, '');
            if (!inline && match) {
              return <CodeBlock language={match[1]} code={code} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
