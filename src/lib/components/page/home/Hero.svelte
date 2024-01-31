<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../../types/homePage').HomePageHero} - data
	 */
	export let data;
</script>

<div class="rounded-xl z-20 relative grid gap-4 h-[30vh] md:h-[30vw] section-container box mx-auto">
	<SanityImage
		maxWidth={1920}
		image={data.heroImage}
		alt={data.title}
		loading="eager"
		className="rounded-xl z-12 w-full object-cover z-[-1] h-full overflow-hidden "
	/>
	<div
		class="z-[-13] card rounded-full backdrop-blur w-[90%] blur-[300px] aspect-square absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-90%] variant-gradient-primary-secondary bg-gradient-to-tl opacity-40"
	/>
</div>
