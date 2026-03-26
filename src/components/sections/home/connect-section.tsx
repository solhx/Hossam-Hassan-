// src/components/sections/home/connect-section.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap, gsapEase, duration as dur } from '@/systems/animation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import { MagneticElement } from '@/components/ui/magnetic-element';
import { useCursorState, useReducedMotion } from '@/hooks';
import { transitions } from '@/systems/animation/motion-variants';
import {  motionEase } from '@/systems/animation/easing';
import { Send, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';
import { IconBrandGithub ,IconBrandLinkedin ,IconBrandWhatsapp} from '@tabler/icons-react';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: portfolioData.email,
    href: `mailto:${portfolioData.email}`,
  },
  {
    icon: <Phone size={18} />,
    label: 'Phone',
    value: portfolioData.phone,
    href: `tel:${portfolioData.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: 'Egypt',
    href: '#',
  },
];

const socials = [
  {
    icon: <IconBrandGithub size={20} />,
    href: portfolioData.github,
    label: 'GitHub',
  },
  {
    icon: <IconBrandLinkedin size={20} />,
    href: portfolioData.linkedin,
    label: 'LinkedIn',
  },
  {
    icon: <IconBrandWhatsapp size={20} />,
    href: portfolioData.whatsapp,
    label: 'WhatsApp',
  },
];


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
    <div className="form-field group relative">
      <label
        className="mb-2 block text-sm font-medium"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 block text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cursorHandlers } = useCursorState();
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Replace with your EmailJS or API call
      // await emailjs.send(serviceId, templateId, data, publicKey);
      console.log('Form submitted:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Form fields stagger in
      gsap.from('.form-field', {
        y: 40,
        opacity: 0,
        duration: dur.medium,
        stagger: 0.1,
        ease: gsapEase.smooth,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Contact info items
      gsap.from('.contact-info-item', {
        x: -30,
        opacity: 0,
        duration: dur.medium,
        stagger: 0.1,
        ease: gsapEase.smooth,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Social icons
      gsap.from('.social-icon', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.social-icons',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const inputClasses = `
    w-full rounded-xl border bg-transparent px-4 py-3.5 text-base
    transition-all duration-300 outline-none
    focus:ring-2 focus:ring-[rgba(var(--color-accent-rgb),0.3)]
    focus:border-[var(--color-accent)]
    placeholder:text-[var(--color-text-tertiary)]
  `;

  return (
    <section ref={sectionRef} id="connect" className="section-padding relative">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-main">
        <SectionHeading
          overline="// 06 — Connect"
          title="Let's Create Together"
          description="Have a project in mind? I'd love to hear about it. Drop me a message and let's build something extraordinary."
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.5fr]">
          {/* Left: Contact Info */}
          <div>
            <div className="contact-info mb-10 space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-info-item group flex items-center gap-4 transition-colors duration-300"
                  {...cursorHandlers('link')}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-glass)',
                      border: '1px solid var(--color-glass-border)',
                    }}
                  >
                    <span style={{ color: 'var(--color-accent)' }}>{item.icon}</span>
                  </div>
                  <div>
                    <span
                      className="block text-xs uppercase tracking-wider"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm font-medium transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Separator */}
            <div
              className="mb-8 h-px w-full"
              style={{ backgroundColor: 'var(--color-border)' }}
            />

            {/* Socials */}
            <div>
              <p
                className="mb-4 text-sm font-medium"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                Find me on
              </p>
              <div className="social-icons flex gap-3">
                {socials.map((social) => (
                  <MagneticElement key={social.label} strength={0.3}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: 'var(--color-glass)',
                        border: '1px solid var(--color-glass-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                      aria-label={social.label}
                      {...cursorHandlers('hover')}
                    >
                      {social.icon}
                    </a>
                  </MagneticElement>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div className="mt-8">
              <AnimatedButton
                href="/Hossam-Hassan-Resume.pdf"
                variant="outline"
                size="md"
                icon={<ArrowUpRight size={16} />}
              >
                Download Resume
              </AnimatedButton>
            </div>
          </div>

          {/* Right: Form */}
          <GlassCard className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex min-h-[400px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ backgroundColor: 'rgba(var(--color-accent-rgb), 0.1)' }}
                  >
                    <Send size={32} style={{ color: 'var(--color-accent)' }} />
                  </motion.div>
                  <h3
                    className="mb-2 text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name & Email row */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField label="Name" error={errors.name?.message}>
                      <input
                        {...register('name')}
                        placeholder="John Doe"
                        className={inputClasses}
                        style={{
                          borderColor: errors.name
                            ? '#f87171'
                            : 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </FormField>

                    <FormField label="Email" error={errors.email?.message}>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="john@example.com"
                        className={inputClasses}
                        style={{
                          borderColor: errors.email
                            ? '#f87171'
                            : 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </FormField>
                  </div>

                  {/* Subject */}
                  <FormField label="Subject" error={errors.subject?.message}>
                    <input
                      {...register('subject')}
                      placeholder="Project collaboration"
                      className={inputClasses}
                      style={{
                        borderColor: errors.subject
                          ? '#f87171'
                          : 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </FormField>

                  {/* Message */}
                  <FormField label="Message" error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className={`${inputClasses} resize-none`}
                      style={{
                        borderColor: errors.message
                          ? '#f87171'
                          : 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </FormField>

                  {/* Submit */}
                  <div className="pt-2">
                    <AnimatedButton
                      variant="primary"
                      size="lg"
                      icon={
                        isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            ⟳
                          </motion.div>
                        ) : (
                          <Send size={18} />
                        )
                      }
                      onClick={handleSubmit(onSubmit)}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </AnimatedButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}