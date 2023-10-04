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
		transition: 500ms all;
		transform-origin: center;
	}
	img[data-loaded='false'] {
		filter: blur(5px);
		opacity: 0.5;
		scale: 0.99;
	}
	img[data-loaded='true'] {
		scale: 1;
	}
</style>
