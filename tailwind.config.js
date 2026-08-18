/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617',
          900: '#0f172a',
          850: '#131e36',
          800: '#1e293b',
          750: '#28354d',
          700: '#334155',
          600: '#475569',
        },
        navy: {
          950: '#070B19',
          900: '#0B132B',
          800: '#1C2541',
          700: '#2A365C',
        },
        cyan: {
          brand: '#0ea5e9',
          light: '#38bdf8',
          accent: '#7dd3fc',
        },
        lab: {
          glass: 'rgba(15, 23, 42, 0.85)',
          border: 'rgba(51, 65, 85, 0.65)',
        }
      },
      fontFamily: {
        sans: ["'IBM Plex Sans Thai'", 'Inter', 'Prompt', 'sans-serif'],
        mono: ["'IBM Plex Sans Thai'", 'Inter', 'monospace'],
      },
      lineHeight: {
        relaxed: '1.75',
        loose: '2',
      }
    },
  },
  plugins: [],
}
