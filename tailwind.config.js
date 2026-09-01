/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          emerald: '#0c2e26',
          'emerald-light': '#144539',
          'emerald-dark': '#061713',
          gold: '#c9a050',
          'gold-light': '#e0be75',
          'gold-dark': '#9b7832',
          cream: '#faf7f2',
          sand: '#f2eae0',
          dark: '#121615',
          charcoal: '#1c2220',
          muted: '#8a9490',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'luxury': '0 20px 50px rgba(12, 46, 38, 0.15)',
        'gold': '0 10px 30px rgba(201, 160, 80, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      }
    },
  },
  plugins: [],
}
