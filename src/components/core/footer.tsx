// src/components/core/footer.tsx
// ─── Premium Footer with Green Accent ───

import { cn } from '@/utils/cn';
import { 
  MdEmail as Mail
} from 'react-icons/md';

import { 
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaTwitter as Twitter
} from 'react-icons/fa';

import { 
  AiFillHeart as Heart
} from 'react-icons/ai';


const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/hossamhassan',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/hossamhassan',
    icon: Linkedin,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/hossamhassan',
    icon: Twitter,
  },
  {
    label: 'Email',
    href: 'mailto:hello@hossamhassan.dev',
    icon: Mail,
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-[var(--border-subtle)]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Green glow at top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              className="inline-block text-heading-md font-bold tracking-tighter transition-colors hover:text-[var(--fg-accent)]"
              aria-label="Back to top"
            >
              <span className="text-[var(--fg-primary)]">Hossam</span>
              <span className="gradient-green-text"> Hassan</span>
            </a>
            <p className="mt-2 max-w-xs text-body-sm text-[var(--fg-muted)]">
              Full Stack MERN Developer crafting high-performance web experiences.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {['Expertise', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-body-sm text-[var(--fg-muted)] transition-colors duration-300 hover:text-[var(--fg-accent)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--fg-muted)] transition-all duration-300 hover:border-[var(--border-accent)] hover:text-[var(--fg-accent)] hover:shadow-[0_0_12px_var(--glow-primary)]"
                aria-label={`Visit ${label} profile`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 text-caption text-[var(--fg-muted)] md:flex-row">
          <p>
            © {currentYear} Hossam Hassan. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with{' '}
            <Heart className="inline h-3 w-3 text-green-500" aria-label="love" />{' '}
            using{' '}
            <span className="font-medium text-[var(--fg-accent)]">Next.js</span>
            {' & '}
            <span className="font-medium text-[var(--fg-accent)]">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}