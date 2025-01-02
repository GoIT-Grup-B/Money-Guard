/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        screens: {
            'mobile': '320px',
            // => @media (min-width: 320px) { ... }

            'tablet': '768px',
            // => @media (min-width: 768px) { ... }

            'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
        },
    },
    plugins: [],
}

