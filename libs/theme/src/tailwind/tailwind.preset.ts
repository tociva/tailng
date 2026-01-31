import type { Config } from 'tailwindcss';

/**
 * Tailwind preset for @tailng/theme.
 * Map Tailwind colors to CSS variables (no hardcoded colors here).
 */
export const tailngPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--background-color)',
        fg: 'var(--text-color)',
        border: 'var(--border-color)',

        primary: 'var(--primary-color)',
        danger: 'var(--danger-color)',
        warning: 'var(--warning-color)',
        success: 'var(--success-color)',
        info: 'var(--info-color)',
      },
    },
  },
};
