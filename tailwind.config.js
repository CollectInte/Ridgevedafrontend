/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: '16px',
        xl: '35px',
      },
    },
    colors: {
      transparent: 'transparent',
      'black': '#0C1228',
      'surface1': '#646570',
      'surface2': '#ABB0B4',
      'white': '#ffffff',
      'surface': '#EFF0F3',
      'outline': '#E4E4E4',
      'blue': '#2D4FE1',
      'yellow': '#F4D118',
      'pink': '#E13789',
      'green': '#63E483',
      'purple': '#5B45F3',
      'grey': 'rgba(39, 75, 227, 0.10)',
      'line': 'rgba(229, 229, 229, 0.10)',
    },
  },
  plugins: [],
}