/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter400: 'var(--font-inter400)',
        inter700: 'var(--font-inter700)',
        playfair400: 'var(--font-playfair400)',
      },
      colors: {
        tBlack: '#232323',
        tWhite: '#f5f5f5',
        tGray: '#AFAFAF',
        tForm: '#666666',
        'light-300': '#F5F5F5',
        'light-500': '#EDEDEB',
        'light-700': '#DFDFDB',
        'light-900': '#D6D6D1',
        'dark-900': '#09090a',
        'dark-700': '#121214',
        'dark-500': '#202024',
        'dark-300': '#29292e',
        primary: '#26a9e0',
        secondary: '#57585a',
        tertiary: '#1f87b5',
        accent: '#e06026',
        successDark: '#015f43',
        successMid: '#00875f',
        successLight: '#00B37E',
        fail: '#E25858',
      },
    },
  },
  plugins: [],
}
