// src/components/chat/chat-widget.tsx
'use client';

import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { MagneticElement } from '@/components/ui/magnetic-element';
import { useCursorState } from '@/hooks';

// Lazy load the full chat window
const ChatWindow = lazy(() =>
  import('./chat-window').then((mod) => ({ default: mod.ChatWindow }))
);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { cursorHandlers } = useCursorState();

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="absolute bottom-20 right-0 mb-2"
          >
            <Suspense
              fallback={
                <div
                  className="glass flex h-[500px] w-[380px] items-center justify-center rounded-2xl"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              }
            >
              <ChatWindow onClose={() => setIsOpen(false)} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <MagneticElement strength={0.3}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#ffffff',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          {...cursorHandlers('hover')}
          aria-label={isOpen ? 'Close chat' : 'Open AI chat'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </MagneticElement>
    </div>
  );
}