const tailngPreset = require('./libs/theme/tailwind/tailng.preset.cjs');
const tailngPlugin = require('./libs/theme/tailwind/tailng.plugin.cjs');

module.exports = {
  presets: [tailngPreset],

  content: [
    './apps/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],

  // Keep theme clean; preset already maps CSS variables.
  theme: {
    extend: {},
  },

  // ✅ DO NOT call it
  plugins: [tailngPlugin],
};