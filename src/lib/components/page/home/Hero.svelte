<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../../types/homePage').HomePageHero} - data
	 */
	export let data;
</script>

<div
	class="grid z-20 gap-4 relative md:h-[35vw] section-container box mx-auto overflow-hidden h-[20vh]"
>
	<SanityImage
		maxWidth={1920}
		image={data.heroImage}
		alt={data.title}
		loading="eager"
		className="gradient-mask w-full object-cover z-[-1] h-full overflow-hidden "
	/>
</div>
