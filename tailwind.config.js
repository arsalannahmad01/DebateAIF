module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      }
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      'float-delayed': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
      },
    },
    animation: {
      float: 'float 6s ease-in-out infinite',
      'float-delayed': 'float-delayed 8s ease-in-out infinite',
    },
  },
  plugins: [],
} 