/** @type {import('tailwindcss').Config} */
import preline from 'preline/plugin.js'
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", './node_modules/preline/dist/*.js',],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter"],
                diplomata: ["Diplomata"],
                sofia: ["Sofia Sans"]
            }
        }
    },
    plugins: [require('@tailwindcss/forms'), preline,]
};
