/** @type {import('tailwindcss').Config} */
import { join } from 'path';
import { customDarkTheme } from './src/lib/themes';
// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
export default {
	darkMode: 'class', // or 'media' or 'class'
	content: [
		'./src/**/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		fontFamily: {
			san: ['GreatHorKham Yangon', 'sans-serif']
		},
		extend: {
			colors: {},
			gridTemplateColumns: {
				'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
				'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		skeleton({
			themes: {
				custom: [customDarkTheme]
			}
		})
	]
};
