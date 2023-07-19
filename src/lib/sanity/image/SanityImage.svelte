<!-- SanityImage.svelte -->
<script>
	import getImageProps from './config';

	let loaded = false;
	/**
	 * @type {SanityImage}
	 */
	export let image;
	export let className = '';
	/**
	 * @type {'lazy' | 'eager'}
	 */
	export let loading = 'lazy';
	export let alt = '';
	export let maxWidth = 800;
	$: imageProps = getImageProps({ image, maxWidth });
</script>

<img
	class={className}
	data-loaded={loaded}
	on:load={() => (loaded = true)}
	alt={alt || ' '}
	{...imageProps}
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
