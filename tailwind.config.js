/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF4A00',
          orangeDark: '#CC3B00',
          coral: '#FF7A59',
          ink: '#161032',
          black: '#0B0B0F',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF4A00 0%, #FF7A59 50%, #FFB199 100%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,11,15,0.04), 0 8px 24px rgba(11,11,15,0.06)',
        cardHover: '0 4px 10px rgba(11,11,15,0.06), 0 16px 32px rgba(11,11,15,0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
