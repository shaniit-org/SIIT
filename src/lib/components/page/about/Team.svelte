<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';

	/**
	 * @type {import('$lib/types').Author[]}
	 */
	export let data;
</script>

<div>
	<div class="section-container box">
		<h2 class="h2 mb-8 md:mb-12">Our Awesome Team</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-6">
			{#each data as dat}
				<div class="aspect-square items-center flex flex-col gap-4">
					<div
						class=" aspect-square w-full h-full rounded-token overflow-hidden group transition-all duration-500"
					>
						<SanityImage
							image={dat.profile}
							alt="image"
							className="aspect-video object-cover w-full h-full group-hover:scale-105 transition-all duration-500 cursor-pointer"
						/>
					</div>

					<h3 class="dark:text-surface-300 h3 mb-2 text-xl">
						{dat.role}
					</h3>
				</div>
			{/each}
		</div>
	</div>
</div>
