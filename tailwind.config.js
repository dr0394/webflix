/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'webflix-gold': '#CBAA6E',
        'webflix-gold-light': '#F3E4A8',
        'webflix-gold-dark': '#C6A667',
        'webflix-dark': '#111111',
        'gradient-metallic': 'linear-gradient(135deg, #C0C0C0, #E5E5E5, #A8A8A8)',
        'gradient-shimmer': 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
        'gradient-glow': 'linear-gradient(135deg, #FFD700, #FFA500)',
        'gradient-silver-dark': 'linear-gradient(135deg, #708090, #2F4F4F)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'silver-lg': '0 10px 25px -3px rgba(192, 192, 192, 0.3), 0 4px 6px -2px rgba(192, 192, 192, 0.1)',
        'silver-xl': '0 20px 25px -5px rgba(192, 192, 192, 0.3), 0 10px 10px -5px rgba(192, 192, 192, 0.1)',
        'silver': '0 4px 6px -1px rgba(192, 192, 192, 0.2), 0 2px 4px -1px rgba(192, 192, 192, 0.1)',
      },
    },
  },
  plugins: [],
};