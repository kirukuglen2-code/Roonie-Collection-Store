/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-white': '#fafafa',
        'deep-charcoal': '#333333',
        'primary': {
          500: '#3b82f6',
          600: '#2563eb',
        },
        'accent': {
          100: '#fef3c7',
          400: '#f59e0b',
          800: '#92400e',
        },
      },
    },
  },
  plugins: [],
}