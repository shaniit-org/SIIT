<script>
	import { Button, Tag } from 'carbon-components-svelte';
	import { Download } from 'carbon-icons-svelte';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').UserGuide} - data
	 */
	export let data;
</script>

<div class="bg-white">
	<div class="relative min-h-[380px] isolate">
		<SanityImage
			maxWidth={300}
			image={data.coverImage}
			alt={data.title}
			className="w-full h-[380px] aspect-[9/16] object-cover"
		/>
		{#if data.downloadlink}
			<div class="absolute top-0 right-0">
				<Button
					href={data.downloadlink}
					target="_blank"
					size="lg"
					icon={Download}
					aria-label="Download"
					iconDescription="Download"
					class="bg-theme-dark"
				/>
			</div>
		{/if}
	</div>
	<div class="flex flex-col p-4">
		<h2 class="text-xl mb-1">{data.title}</h2>
		<div class="mb-4 mt-2">
			{#each data.categories as cat}
				<Tag type="blue" size="sm" class="m-0">{cat.title}</Tag>
			{/each}
		</div>
		<p class=" text-sm leading-loose">
			{data.description}
		</p>
	</div>
</div>
