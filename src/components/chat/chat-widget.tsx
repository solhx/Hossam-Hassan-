'use client';
// src/components/chat/chat-widget.tsx
// ─── AI Chat Widget: Premium Green Theme ───



import {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as presets from '@/systems/animation/presets';
import { cn } from '@/utils/cn';
import { MessageSquare, X, Send, Bot, User, AlertCircle, Loader2 } from 'lucide-react';

// ─── Types ───
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
  timestamp: Date;
}

type ChatStatus = 'idle' | 'loading' | 'error' | 'rate-limited';

// ─── Generate unique ID ───
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ─── Chat Bubble Component ───
const ChatBubble = memo(function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  return (
    <motion.div
      variants={presets.slideUp}
      initial="hidden"
      animate="visible"
      className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-green-500 text-white'
            : isError
              ? 'bg-red-500/20 text-red-400'
              : 'border border-[var(--border-accent)] bg-[var(--bg-tertiary)] text-[var(--fg-accent)]'
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : isError ? (
          <AlertCircle className="h-3.5 w-3.5" />
        ) : (
          <Bot className="h-3.5 w-3.5" />
        )}
      </div>

      {/* Message */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2.5 text-body-sm leading-relaxed',
          isUser
            ? 'rounded-br-md bg-green-500 text-white'
            : isError
              ? 'rounded-bl-md border border-red-500/20 bg-red-500/10 text-red-300'
              : 'rounded-bl-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[var(--fg-primary)]'
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
});

// ─── Typing Indicator ───
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3"
    >
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-accent)] bg-[var(--bg-tertiary)] text-[var(--fg-accent)]">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-green-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Chat Widget ───
const ChatWidgetComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "👋 Hi! I'm Hossam's AI assistant. Ask me anything about his skills, experience, or projects!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<ChatStatus>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();

      const trimmedInput = input.trim();
      if (!trimmedInput || status === 'loading') return;

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: trimmedInput,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setStatus('loading');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmedInput }),
          signal: AbortSignal.timeout(15_000), // 15s timeout
        });

        const data = await response.json();

        if (!response.ok) {
          const errorCode = data?.code ?? 'UNKNOWN';

          if (response.status === 429) {
            setStatus('rate-limited');
            setMessages((prev) => [
              ...prev,
              {
                id: generateId(),
                role: 'error',
                content: 'Slow down! Please wait a moment before sending another message.',
                timestamp: new Date(),
              },
            ]);
            // Auto-reset after 30s
            setTimeout(() => setStatus('idle'), 30_000);
            return;
          }

          throw new Error(data?.error ?? `Error: ${response.status}`);
        }

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setStatus('idle');
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.name === 'AbortError'
              ? 'Request timed out. Please try again.'
              : error.message
            : 'Something went wrong. Please try again.';

        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: 'error',
            content: errorMessage,
            timestamp: new Date(),
          },
        ]);
        setStatus('error');

        // Auto-reset error status
        setTimeout(() => setStatus('idle'), 3000);
      }
    },
    [input, status]
  );

  // Send on Enter (Shift+Enter for newline in future textarea upgrade)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <>
      {/* ─── Toggle Button ─── */}
      <motion.button
        className={cn(
          'fixed bottom-6 right-6 z-[201] flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300',
          isOpen
            ? 'bg-[var(--bg-tertiary)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)]'
            : 'bg-green-500 text-white shadow-green-500/30 hover:bg-green-400 hover:shadow-green-500/40'
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
        )}
      </motion.button>

      {/* ─── Chat Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={presets.transitions.snappy}
            className="fixed bottom-24 right-6 z-[200] flex h-[min(500px,70vh)] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] shadow-2xl"
            role="dialog"
            aria-label="Chat with AI assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-body-sm font-semibold text-[var(--fg-primary)]">
                  AI Assistant
                </h3>
                <p className="text-caption text-[var(--fg-muted)]">
                  {status === 'loading'
                    ? 'Thinking...'
                    : status === 'rate-limited'
                      ? 'Please wait...'
                      : 'Ask me anything'}
                </p>
              </div>

              {/* Status indicator */}
              <div className="ml-auto flex items-center gap-1.5">
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    status === 'loading'
                      ? 'animate-pulse bg-yellow-500'
                      : status === 'error'
                        ? 'bg-red-500'
                        : status === 'rate-limited'
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                  )}
                />
                <span className="text-caption text-[var(--fg-muted)]">
                  {status === 'loading'
                    ? 'Processing'
                    : status === 'error'
                      ? 'Error'
                      : status === 'rate-limited'
                        ? 'Rate limited'
                        : 'Online'}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 space-y-4 overflow-y-auto px-5 py-4"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {status === 'loading' && <TypingIndicator />}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="border-t border-[var(--border-subtle)] px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    status === 'rate-limited'
                      ? 'Please wait...'
                      : 'Ask about Hossam...'
                  }
                  disabled={status === 'loading' || status === 'rate-limited'}
                  className={cn(
                    'flex-1 rounded-xl border bg-[var(--bg-tertiary)] px-4 py-2.5 text-body-sm text-[var(--fg-primary)] placeholder-[var(--fg-muted)] outline-none transition-all duration-300',
                    'border-[var(--border-subtle)] focus:border-[var(--border-accent)] focus:ring-2 focus:ring-green-500/20',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  maxLength={2000}
                  autoComplete="off"
                  aria-label="Type your message"
                />

                <motion.button
                  type="submit"
                  disabled={
                    !input.trim() ||
                    status === 'loading' ||
                    status === 'rate-limited'
                  }
                  className={cn(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                    input.trim() && status === 'idle'
                      ? 'bg-green-500 text-white shadow-md shadow-green-500/20 hover:bg-green-400'
                      : 'bg-[var(--bg-tertiary)] text-[var(--fg-muted)]'
                  )}
                  whileHover={input.trim() ? { scale: 1.05 } : undefined}
                  whileTap={input.trim() ? { scale: 0.95 } : undefined}
                  aria-label="Send message"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </motion.button>
              </div>

              {/* Character count */}
              {input.length > 1500 && (
                <p
                  className={cn(
                    'mt-1.5 text-right text-caption',
                    input.length > 1900 ? 'text-red-400' : 'text-[var(--fg-muted)]'
                  )}
                >
                  {input.length}/2000
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(ChatWidgetComponent);