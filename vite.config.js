import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { optimizeImports } from 'carbon-preprocess-svelte';

export default defineConfig({
    plugins: [
        sveltekit({
            preprocess: [optimizeImports()]
        })
    ]
});
