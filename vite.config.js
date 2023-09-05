import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { optimizeImports } from 'carbon-preprocess-svelte';
const ENV = process.env.NODE_ENV;

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: [optimizeImports()]
		})
	],
	ssr: {
		noExternal: ENV === 'production' ? ['instantsearch.js', 'algoliasearch'] : []
	}
});
