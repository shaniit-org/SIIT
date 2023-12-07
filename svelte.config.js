import { optimizeImports } from 'carbon-preprocess-svelte';
import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        sveltePreprocess({
            scss: true,
            preserve: ['ld+json']
        }),
        optimizeImports()
    ],
    kit: {
        adapter: adapter({
            // See below for an explanation of these options
            routes: {
                include: ['/*'],
                exclude: ['<all>']
            }
        })
    }
};

export default config;
