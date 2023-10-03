const starlightPlugin = require('@astrojs/starlight-tailwind');

// Generated color palettes
const accent = { 200: '#aec9ff', 600: '#1451ff', 900: '#0c2975', 950: '#0c204f' };
const gray = { 100: '#f6f6f6', 200: '#edeeee', 300: '#c2c2c2', 400: '#8b8b8c', 500: '#585858', 700: '#383838', 800: '#262727', 900: '#181818' };

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
			fontFamily: {
				sans: ['Inter Variable'],
			},
		},
	},
	plugins: [starlightPlugin()],
};