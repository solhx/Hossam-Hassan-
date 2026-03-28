// src/validation/contact-us-schema.ts
// ─── Zod validation for contact form ───

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be under 255 characters'),

  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be under 200 characters'),

  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message must be under 5000 characters'),

  // Honeypot field for spam prevention
  website: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Chat message validation ───
export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message too long (max 2000 characters)'),
});

export type ChatMessageData = z.infer<typeof chatMessageSchema>;