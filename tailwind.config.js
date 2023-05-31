/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'theme-primary': '#D0E2FF',
                'theme-dark': '#161616',
                'theme-muted': '#e8e8e8',
                'theme-secondary': '#E8DAFF'
            }
        }
    },
    plugins: []
};
