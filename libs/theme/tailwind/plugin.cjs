/**
 * @tailng/theme - Tailwind plugin (CommonJS)
 * Adds a few small utilities that leverage theme variables.
 *
 * Usage:
 *   // tailwind.config.cjs
 *   module.exports = {
 *     plugins: [require('@tailng/theme/tailwind/plugin.cjs')],
 *   };
 */
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, addBase }) {
  // Base defaults (optional but handy)
  addBase({
    ':root': {
      color: 'var(--text-color)',
      backgroundColor: 'var(--background-color)',
    },
  });

  // Utilities
  addUtilities(
    {
      '.tng-ring': {
        outline: 'none',
        boxShadow: '0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--primary-color) 35%, transparent)',
      },
      '.tng-ring-danger': {
        outline: 'none',
        boxShadow: '0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--danger-color) 35%, transparent)',
      },
      '.tng-border': {
        borderWidth: 'var(--border-width)',
        borderColor: 'var(--border-color)',
      },
      '.tng-border-hover:hover': {
        borderColor: 'var(--border-color-hover)',
      },
      '.tng-disabled': {
        color: 'var(--disable-color)',
        cursor: 'not-allowed',
        opacity: '0.7',
      },
    },
    { variants: ['responsive', 'hover', 'focus'] }
  );
});
