/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                entrance: 'entrance 150ms ease-in-out',
                riseup: 'riseup 150ms ease-in-out',
            },
            keyframes: {
                entrance: {
                    '0%': { transform: 'translateX(10px)' },
                    '100%': { transform: 'translateX(0px)' },
                },
                riseup: {
                    '0%': { transform: 'translateY(10px)' },
                    '100%': {transform: 'translateY(0px)' },
                }
            },
        },
    },
    plugins: [],
}
