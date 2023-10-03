<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import { ClickableTile } from 'carbon-components-svelte';
	/**
	 * @type {import('../../../types/termPage').Term}
	 */
	export let term;
	/**
	 * @type {import('../../../types/homePage').HomePageHero} - data
	 */
	export let data;
</script>

<div
	class=" grid grid-rows-[auto_1fr] gap-4 justify-end relative w-full min-h-[60vh] md:min-h-[700px]"
>
	<SanityImage
		maxWidth={1150}
		image={data.heroImage}
		alt={data.title}
		loading="eager"
		className="h-full w-full object-cover absolute z-[-1]"
	/>
	{#if term}
		<ClickableTile
			href="/terms/{term.slug.current}"
			class=" max-w-[90%] md:max-w-[400px] h-auto space-y-2 mt-auto row-start-2 relative"
		>
			<div class="p-4">
				<div class="flex items-center justify-between">
					<span>Term Of The Day</span>
					<span>Jan 8, 2023</span>
				</div>
				<h2 class="text-xl md:text-2xl lg:mb-4 mt-3">{term.title}</h2>
				<p class="text-sm md:text-base leading-relaxed mt-2">
					{term.description}
				</p>
			</div>
		</ClickableTile>
	{/if}
</div>
