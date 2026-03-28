'use client';
// src/components/sections/home/contact-section.tsx
// ─── Contact Form with Validation — COMPLETE ───



import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  type ContactFormData,
} from '@/validation/contact-us-schema';
import * as presets from '@/systems/animation/presets';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-btn';
import { cn } from '@/utils/cn';
import { 
  MdSend as Send,
  MdCheckCircle as CheckCircle2,
  MdErrorOutline as AlertCircle,
  MdEmail as Mail,
  MdLocationOn as MapPin,
  MdAccessTime as Clock
} from 'react-icons/md';

import { 
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaTwitter as Twitter
} from 'react-icons/fa';

import { AiOutlineLoading3Quarters as Loader2 } from 'react-icons/ai';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ─── Input Field Component ───
function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-body-sm font-medium text-[var(--fg-primary)]">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1.5 flex items-center gap-1 text-caption text-red-400"
            role="alert"
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBaseClasses = cn(
  'w-full rounded-card-sm border bg-[var(--bg-tertiary)] px-4 py-3 text-body-sm',
  'text-[var(--fg-primary)] placeholder-[var(--fg-muted)]',
  'outline-none transition-all duration-300',
  'border-[var(--border-subtle)]',
  'focus:border-[var(--border-accent)] focus:ring-2 focus:ring-green-500/20',
  'disabled:cursor-not-allowed disabled:opacity-50'
);

const inputErrorClasses = 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20';

const ContactSectionComponent = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      // Honeypot check
      if (data.website) return;

      setFormStatus('submitting');

      try {
        // TODO: Replace with actual form submission API
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Form data:', data);

        setFormStatus('success');
        reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } catch {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    },
    [reset]
  );

  return (
    <section
      id="contact"
      className="section-container"
      aria-labelledby="contact-heading"
    >
      {/* Section header */}
      <MotionWrapper preset="slideUp" className="mb-16 text-center">
        <span className="mb-4 inline-block font-mono text-body-sm font-medium uppercase tracking-wider text-[var(--fg-accent)]">
          {'// Contact'}
        </span>
        <h2
          id="contact-heading"
          className="text-display-xl font-bold tracking-tight"
        >
          Let&apos;s Work{' '}
          <span className="gradient-green-text">Together</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-[var(--fg-secondary)]">
          Have a project in mind? I&apos;d love to hear about it. Drop me a message
          and I&apos;ll get back to you within 24 hours.
        </p>
      </MotionWrapper>

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5">
        {/* ─── Left: Contact Info ─── */}
        <MotionWrapper preset="slideLeft" className="lg:col-span-2">
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'hello@hossamhassan.dev',
                href: 'mailto:hello@hossamhassan.dev',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Cairo, Egypt',
              },
              {
                icon: Clock,
                label: 'Availability',
                value: 'Open to opportunities',
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-card-sm border border-[var(--border-accent)] bg-green-500/10 text-green-500">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-body-sm font-medium text-[var(--fg-muted)]">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-body-md font-semibold text-[var(--fg-primary)] transition-colors hover:text-[var(--fg-accent)]"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-body-md font-semibold text-[var(--fg-primary)]">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="pt-4">
              <p className="mb-3 text-body-sm font-medium text-[var(--fg-muted)]">
                Find me on
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/hossamhassan', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/hossamhassan', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com/hossamhassan', label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-card-sm border border-[var(--border-subtle)] text-[var(--fg-muted)] transition-all duration-300 hover:border-[var(--border-accent)] hover:text-[var(--fg-accent)] hover:shadow-[0_0_12px_var(--glow-primary)]"
                    aria-label={`Visit ${label} profile`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability banner */}
            <GlassCard padding="sm" className="mt-4 border-green-500/20">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <p className="text-body-sm text-[var(--fg-secondary)]">
                  Currently available for{' '}
                  <span className="font-semibold text-[var(--fg-accent)]">
                    freelance & full-time
                  </span>{' '}
                  roles
                </p>
              </div>
            </GlassCard>
          </div>
        </MotionWrapper>

        {/* ─── Right: Contact Form ─── */}
        <MotionWrapper preset="slideRight" className="lg:col-span-3">
          <GlassCard padding="lg">
            <AnimatePresence mode="wait">
              {/* ─── Success State ─── */}
              {formStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={presets.transitions.springBouncy}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20"
                  >
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-heading-lg font-bold text-[var(--fg-primary)]">
                    Message Sent!
                  </h3>
                  <p className="mt-2 max-w-xs text-body-sm text-[var(--fg-muted)]">
                    Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                /* ─── Form ─── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  {/* Name & Email Row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Name" error={errors.name?.message}>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        disabled={formStatus === 'submitting'}
                        className={cn(
                          inputBaseClasses,
                          errors.name && inputErrorClasses
                        )}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                    </FormField>

                    <FormField label="Email" error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        disabled={formStatus === 'submitting'}
                        className={cn(
                          inputBaseClasses,
                          errors.email && inputErrorClasses
                        )}
                        aria-invalid={!!errors.email}
                      />
                    </FormField>
                  </div>

                  {/* Subject */}
                  <FormField label="Subject" error={errors.subject?.message}>
                    <input
                      {...register('subject')}
                      type="text"
                      placeholder="Project inquiry..."
                      disabled={formStatus === 'submitting'}
                      className={cn(
                        inputBaseClasses,
                        errors.subject && inputErrorClasses
                      )}
                      aria-invalid={!!errors.subject}
                    />
                  </FormField>

                  {/* Message */}
                  <FormField label="Message" error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tell me about your project, timeline, and budget..."
                      disabled={formStatus === 'submitting'}
                      className={cn(
                        inputBaseClasses,
                        'resize-y',
                        errors.message && inputErrorClasses
                      )}
                      aria-invalid={!!errors.message}
                    />
                  </FormField>

                  {/* Honeypot (hidden from real users, traps bots) */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <input
                      {...register('website')}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {formStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 rounded-card-sm border border-red-500/20 bg-red-500/10 px-4 py-3 text-body-sm text-red-400"
                        role="alert"
                      >
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        Something went wrong. Please try again or email me directly.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-caption text-[var(--fg-muted)]">
                      All fields are required
                    </p>

                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={formStatus === 'submitting'}
                      icon={
                        formStatus === 'submitting' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )
                      }
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </AnimatedButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </MotionWrapper>
      </div>
    </section>
  );
};

export const ContactSection = memo(ContactSectionComponent);