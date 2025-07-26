/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052FF',
        background: '#000000',
        card: '#1a1a1a',
        input: '#2a2a2a',
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
        }
      },
    },
  },
  plugins: [],
} 