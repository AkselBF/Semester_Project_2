/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html", 
  "./src/html/*.html", 
  "./src/js/ui/*.js"
],
  theme: {
    extend: {
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
        'widescreen': { 'raw': '(min-aspect-ratio: 3/2)' },
        'tallscreen': { 'raw': '(min-aspect-ratio: 13/20)' },
      },
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scaleY(0)' },
          '80%': { transform: 'scaleY(1.2)' },
          '100%': { transform: 'scaleY(1)' },
        }
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards',
      }
    },
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'trans_black': '#000000cc',
      'dark_gray': '#1E1E1E',
      'darker_gray': '#171717',
      'button_blue': '#1D48E2',
      'login_blue': '#3A7DFFD1',
      'login_second': '#002978B3',
      'login_full': '#002978e6',
      'gold': '#E7C200'
    },
  },
  plugins: [],
}

