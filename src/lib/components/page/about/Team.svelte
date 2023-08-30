<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	import { Tile } from 'carbon-components-svelte';

	/**
	 * @type {import('$lib/types').Author[]}
	 */
	export let data;
</script>

<Tile class="bg-theme-muted bg-opacity-50">
	<div class="section-container box">
		<h2 class="text-4xl leading-[1.1] md:text-4xl mb-8 md:mb-12">Our Awesome Team</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-6">
			{#each data as dat}
				<div class="aspect-square items-center flex flex-col gap-4">
					<div class=" aspect-square w-full h-full rounded-full overflow-hidden">
						<SanityImage
							image={dat.profile}
							alt="image"
							className="aspect-video object-cover w-full h-full"
						/>
					</div>
					<h3 class="text-xl mt-4 text-center">{dat.role}</h3>
				</div>
			{/each}
		</div>
	</div>
</Tile>
