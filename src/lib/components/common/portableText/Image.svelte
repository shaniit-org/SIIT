<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 *  @type {SanityImage})}>
	 */
	export let portableText;
	const image = portableText.value;
</script>

<SanityImage
	className="card w-auto my-6 max-h-max  mx-auto object-contain rounded-token"
	{image}
	alt={image.alt}
	maxWidth={1000}
/>
