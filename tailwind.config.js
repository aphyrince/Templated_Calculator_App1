/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#000000',
                secondary: '#757575',
                third: '#1E1E1E',
                btn: '#D9D9D9',
                accent: '#FF8D28',
            },
        },
    },
    plugins: [],
};
