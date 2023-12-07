import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const ENV = process.env.NODE_ENV;

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ENV === 'production' ? ['instantsearch.js', 'algoliasearch', '@carbon/charts'] : []
	}
});
