import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	integrations: [starlight({
		title: 'Kastau Terjemahan',
		logo: {
			src: './src/assets/logo.png',
			replacesTitle: true
		},
		social: {
			github: 'https://github.com/antroy-tech/kastau-terjemahan',
			discord: 'https://discord.gg/eY7U3SqdkW'
		},
		sidebar: [{
			label: 'Guides',
			items: [
				// Each item here is one entry in the navigation menu.
				{
					label: 'Example Guide',
					link: '/guides/example/'
				}]
		}, {
			label: 'Reference',
			autogenerate: {
				directory: 'reference'
			}
		}],
		customCss: [
			'./src/tailwind.css',
			'@fontsource-variable/inter',
		],
	}), tailwind({
		applyBaseStyles: false,
	})]
});