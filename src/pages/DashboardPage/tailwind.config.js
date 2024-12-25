/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Tailwind'in hangi dosyalarda kullanılacağını belirtir
    ],
    theme: {
      extend: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
          },
      },
      
    },
    plugins: [],
  };
  