// src/components/chat/chat-window.tsx
'use client';

import { IconRefresh, IconSend, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useChat } from '@/hooks';
import { ChatMessage } from './chat-message';

interface ChatWindowProps {
  onClose: () => void;
}

interface FormValues {
  message: string;
}

const SUGGESTIONS = [
  { label: '💻 Tech Stack', message: 'What tech stack does Hossam use?' },
  { label: '📁 Projects', message: 'Tell me about his projects' },
  { label: '📞 Contact', message: 'How can I contact Hossam?' },
  { label: '💼 Experience', message: "What's his work experience?" },
];

export const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const { messages, sendMessage, isLoading, clearMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { message: '' },
  });

  const message = useWatch({
    control,
    name: 'message',
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = ({ message }: FormValues) => {
    if (!message.trim() || isLoading) return;
    sendMessage(message);
    reset();
  };

  const handleSuggestion = (suggestion: string) => {
    if (isLoading) return;
    sendMessage(suggestion);
  };

  return (
    <div
      className="flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border shadow-xl"
      style={{
        backgroundColor: 'var(--color-bg-secondary, #ffffff)',
        borderColor: 'var(--color-glass-border)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* ─── Header ─── */}
      <div
        className="relative z-10 flex items-center justify-between border-b px-4 py-3"
        style={{
          backgroundColor: 'var(--color-surface-elevated, rgba(255,255,255,0.9))',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)',
              }}
            >
              <span className="text-sm">🤖</span>
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2"
              style={{
                backgroundColor: '#10b981',
                borderColor: 'var(--color-bg-secondary, #ffffff)',
              }}
            />
          </div>
          <div>
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Portfolio AI
            </h3>
            <p
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              Online • Powered by Hossam
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearMessages}
            className="rounded-full p-1.5 transition-colors duration-200 hover:bg-[rgba(var(--color-accent-rgb),0.08)]"
            style={{ color: 'var(--color-text-tertiary)' }}
            aria-label="Clear chat"
            title="Clear chat"
          >
            <IconRefresh size={16} />
          </button>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 transition-colors duration-200 hover:bg-[rgba(var(--color-accent-rgb),0.08)]"
            style={{ color: 'var(--color-text-tertiary)' }}
            aria-label="Close chat"
          >
            <IconX size={16} />
          </button>
        </div>
      </div>

      {/* ─── Messages ─── */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto overscroll-contain scroll-smooth p-4"
        style={{ backgroundColor: 'var(--color-bg)' }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <ChatMessage key={m.id} role={m.role} content={m.content} />
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-1.5 px-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Suggestions ─── */}
      <AnimatePresence>
        {messages.length <= 1 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t px-4 pb-2 pt-3"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSuggestion(s.message)}
                  className="rounded-full border px-2.5 py-1.5 text-[11px] transition-all duration-200"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                    e.currentTarget.style.backgroundColor =
                      'rgba(var(--color-accent-rgb), 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color =
                      'var(--color-text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Input ─── */}
      <div
        className="border-t p-4"
        style={{
          backgroundColor: 'var(--color-surface-elevated, rgba(255,255,255,0.9))',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--color-border)',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[rgba(var(--color-accent-rgb),0.15)]"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)',
          }}
        >
          <input
            {...register('message')}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{
              color: 'var(--color-text-primary)',
            }}
            placeholder="Ask about skills, projects..."
            disabled={isLoading || isSubmitting}
            autoComplete="off"
          />
          <motion.button
            type="submit"
            disabled={isLoading || !message?.trim()}
            whileHover={
              message?.trim() && !isLoading ? { scale: 1.05 } : {}
            }
            whileTap={
              message?.trim() && !isLoading ? { scale: 0.95 } : {}
            }
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200"
            style={{
              backgroundColor:
                message?.trim() && !isLoading
                  ? 'var(--color-accent)'
                  : 'var(--color-glass)',
              color:
                message?.trim() && !isLoading
                  ? '#ffffff'
                  : 'var(--color-text-tertiary)',
              cursor:
                message?.trim() && !isLoading
                  ? 'pointer'
                  : 'not-allowed',
            }}
          >
            {isLoading ? (
              <motion.div
                className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ) : (
              <IconSend size={14} />
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};