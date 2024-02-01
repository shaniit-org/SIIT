import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

const ENV = process.env.NODE_ENV;

export default defineConfig({
	plugins: [sveltekit(), nodePolyfills()],
	ssr: {
		noExternal: ENV === 'production' ? ['instantsearch.js', 'algoliasearch', '@carbon/charts'] : []
	}
});
