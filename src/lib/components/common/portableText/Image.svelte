<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 *  @type {SanityImage})}>
	 */
	export let portableText;
	const image = portableText.value;
</script>

<SanityImage className="w-full my-6 aspect-video  mx-auto" {image} alt={image.alt} maxWidth={800} />
