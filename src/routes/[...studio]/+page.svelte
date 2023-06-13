<script>
	import { renderStudio } from 'sanity';
	import { onMount } from 'svelte';
	import sanityConfig from '$lib/studio/sanity.config';

	/**
	 * @type {HTMLDivElement}
	 */
	let studioEl;

	onMount(() => {
		if (studioEl) {
			renderStudio(studioEl, sanityConfig);
		}
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="robots" content="noindex" />
	<meta name="referrer" content="same-origin" />
</svelte:head>

<div id="svelte-studio">
	<div bind:this={studioEl} />
</div>

<style>
	#svelte-studio {
		height: 100vh;
	}

	#svelte-studio > div {
		height: 100%;
	}
</style>
