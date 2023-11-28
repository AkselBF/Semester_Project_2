/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html", 
  "./src/html/pages/*.html", 
  "./src/js/ui/*.js",
  "./src/js/ui/forms/*.js",
  "./src/js/pages/*.js"
],
  theme: {
    extend: {
      width: {
        '280': '280px',
        '300': '300px',
        '808': '808px',
        '80%': '80%',
        '90%': '90%',
      },
      height: {
        '262': '262px',
        '356': '356px',
        '426': '426px',
        '460': '460px',
        '500': '500px',
      },
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
      'blue': '#3A4DF2',
      'button_blue': '#1D48E2',
      'home_blue_one': '#0094FF',
      'home_blue_two': '#23E5FF',
      'login_blue': '#3A7DFFD1',
      'login_second': '#002978B3',
      'login_full': '#002978e6',
      'listing_gradient': '#070B48',
      'listing_title_one': '#000AFF',
      'listing_title_two': '#000587',
      'listing_button': '#2965FF',
      'gold': '#E7C200'
    },
  },
  plugins: [],
}

