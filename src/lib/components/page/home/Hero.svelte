<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../../types/homePage').HomePageHero} - data
	 */
	export let data;
</script>

<div class="grid gap-4 relative w-full md:h-[35vw] overflow-hidden h-[20vh]">
	<SanityImage
		maxWidth={1920}
		image={data.heroImage}
		alt={data.title}
		loading="eager"
		className=" w-full object-cover z-[-1] h-full "
	/>
</div>
