<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../../types/homePage').HomePageHero} - data
	 */
	export let data;
</script>

<div
	class="rounded-xl z-20 relative grid gap-4 h-[30vh] md:h-[25vw] section-container box mx-auto overflow-hidden"
>
	<SanityImage
		maxWidth={1920}
		image={data.heroImage}
		alt={data.title}
		loading="eager"
		className="rounded-xl z-12 w-full object-cover z-[-1] h-full overflow-hidden "
	/>
</div>
