import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { optimizeImports } from 'carbon-preprocess-svelte';

import { nodePolyfills } from 'vite-plugin-node-polyfills';
const ENV = process.env.NODE_ENV;

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: [optimizeImports()]
		}),
		nodePolyfills()
	],
	ssr: {
		noExternal: ENV === 'production' ? ['instantsearch.js', 'algoliasearch', '@carbon/charts'] : []
	}
});
