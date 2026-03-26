// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Next.js config via compat layer
  ...compat.extends('next/core-web-vitals'),

  // Global ignores
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
    ],
  },

  // Custom rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Disable the problematic rule that causes the crash
      'react/display-name': 'off',
      
      // Relax rules for the portfolio
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // Allow using `any` in specific patterns
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  }
);