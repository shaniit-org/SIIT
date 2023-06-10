<script>
	import { Tile, ImageLoader } from 'carbon-components-svelte';

	const data = Array.from({ length: 8 }, (_, i) => i + 1);
</script>

<Tile class="bg-theme-muted bg-opacity-50">
	<div class="section-container box">
		<h2 class="text-4xl leading-[1.1] md:text-4xl mb-8">Our Awesome Team</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-6">
			{#each data as _}
				<div class="aspect-square items-center rounded-full flex flex-col gap-4">
					<div class="p-4 aspect-video w-full h-full">
						<ImageLoader
							src="/images/bg.png"
							alt="image"
							class="rounded-full  aspect-video object-cover w-full h-full"
						/>
					</div>
					<h3 class="text-xl">Head of SIIT</h3>
				</div>
			{/each}
		</div>
	</div>
</Tile>
