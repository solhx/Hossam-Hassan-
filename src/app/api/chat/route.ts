
// src/app/api/chat/route.ts
// ─── AI Chat API with rate limiting, error handling, streaming ───

import { NextRequest, NextResponse } from 'next/server';
import { chatMessageSchema } from '@/validation/contact-us-schema';

// ─── Rate Limiting (In-memory for Edge) ───
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;           // requests per window
const RATE_LIMIT_WINDOW = 60_000;    // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// Cleanup stale entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetAt) {
        rateLimit.delete(key);
      }
    }
  }, 60_000);
}

// ─── System Prompt ───
const SYSTEM_PROMPT = `You are Hossam Hassan's AI assistant on his portfolio website. You represent Hossam professionally and helpfully.

About Hossam:
- Full Stack MERN Developer with 3+ years of experience
- Expert in React, Next.js, TypeScript, Node.js, MongoDB, Express.js
- Skilled in Tailwind CSS, Framer Motion, Three.js, GSAP
- Passionate about performance optimization, clean code, and great UX
- Available for freelance work and full-time opportunities

Guidelines:
- Be professional, friendly, and concise
- If asked about pricing, suggest contacting Hossam directly
- If asked irrelevant questions, politely redirect to portfolio topics
- Never share personal information beyond what's on the portfolio
- Respond in the same language as the user's message
- Keep responses under 200 words unless more detail is specifically requested`;

// ─── OpenAI Handler ───
async function handleOpenAI(message: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
}

// ─── Google Generative AI Handler (Fallback) ───
async function handleGoogleAI(message: string): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) throw new Error('Google AI API key not configured');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          { role: 'user', parts: [{ text: message }] },
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Google AI API error: ${response.status}`);
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    'Sorry, I could not generate a response.'
  );
}

// ─── Route Handler ───
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'anonymous';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait a moment before trying again.',
          code: 'RATE_LIMITED',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
          },
        }
      );
    }

    // Parse and validate body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body', code: 'INVALID_BODY' },
        { status: 400 }
      );
    }

    const validation = chatMessageSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message ?? 'Invalid message',
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const { message } = validation.data;

    // Try OpenAI first, fallback to Google AI
    let reply: string;
    try {
      reply = await handleOpenAI(message);
    } catch (openAIError) {
      console.warn('[Chat API] OpenAI failed, falling back to Google AI:', openAIError);

      try {
        reply = await handleGoogleAI(message);
      } catch (googleError) {
        console.error('[Chat API] Both providers failed:', googleError);
        return NextResponse.json(
          {
            error:
              "I'm having trouble connecting right now. Please try again later or contact Hossam directly.",
            code: 'PROVIDER_ERROR',
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { reply, timestamp: new Date().toISOString() },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('[Chat API] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

// ─── OPTIONS for CORS ───
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}