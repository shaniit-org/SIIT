<!-- SanityImage.svelte -->
<script>
	import getImageProps from './config';

	let loaded = false;
	/**
	 * @type {SanityImage}
	 */
	export let image;
	export let className = '';
	export let loading = 'lazy';
	export let alt = '';
	export let maxWidth = 600;
</script>

<img
	class={className}
	data-loaded={loaded}
	on:load={() => (loaded = true)}
	alt={alt || ' '}
	{...getImageProps({
		image,
		maxWidth: maxWidth
	})}
	{loading}
/>

<style>
	img {
		transition: 1s opacity;
	}
	img[data-loaded='false'] {
		opacity: 0;
	}
</style>
