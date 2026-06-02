/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'tech-black': '#0a0a0a',
        'tech-gray-deep': '#1a1a1a',
        'tech-gray': '#2a2a2a',
        'tech-steel': '#4a4a4a',
        'tech-silver': '#a0a0a0',
        'tech-titanium': '#e0e0e0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};