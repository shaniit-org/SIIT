/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/**/*.{html,js,svelte,ts}'],
    theme: {
        fontFamily: {
            san: ['GreatHorKham Yangon', 'sans-serif']
        },
        extend: {
            colors: {
                'theme-primary': '#D0E2FF',
                'theme-dark': '#161616',
                'theme-muted': '#e8e8e8',
                'theme-secondary': '#E8DAFF'
            },
            gridTemplateColumns: {
                'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
                'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))'
            }
        }
    },
    plugins: [require('@tailwindcss/typography')]
};
