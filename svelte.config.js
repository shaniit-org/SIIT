import adapter from '@sveltejs/adapter-auto';
import { optimizeImports } from 'carbon-preprocess-svelte';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess({
			scss: true
		}),
		optimizeImports()
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
