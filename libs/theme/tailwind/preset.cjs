/**
 * @tailng/theme - Tailwind preset (CommonJS)
 * Maps Tailwind tokens to CSS variables provided by @tailng/theme tokens.
 *
 * Usage:
 *   // tailwind.config.cjs
 *   module.exports = {
 *     presets: [require('@tailng/theme/tailwind/preset.cjs')],
 *   };
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg: 'var(--background-color)',
        fg: 'var(--text-color)',
        border: 'var(--border-color)',
        'border-hover': 'var(--border-color-hover)',

        // Semantic
        primary: 'var(--primary-color)',
        danger: 'var(--danger-color)',
        warning: 'var(--warning-color)',
        success: 'var(--success-color)',
        info: 'var(--info-color)',

        // "on-*" helpers (useful for text color on colored bg)
        'on-primary': 'var(--on-primary-color)',
        'on-danger': 'var(--on-danger-color)',
        'on-warning': 'var(--on-warning-color)',
        'on-success': 'var(--on-success-color)',
        'on-info': 'var(--on-info-color)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        emphasized: 'var(--ease-emphasized)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
    },
  },
};
