<script>
	import { Button, Tag } from 'carbon-components-svelte';
	import { Download } from 'carbon-icons-svelte';
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {{data:import('../../types').UserGuide}} - data
	 */
	export let data;
</script>

<div class="bg-white">
	<div class="relative min-h-[380px] isolate">
		<SanityImage image={data.coverImage} alt={data.title} className="h-[380px] object-cover" />
		<div class="absolute top-0 right-0">
			<Button
				size="lg"
				icon={Download}
				aria-label="Download"
				iconDescription="Download"
				class="bg-theme-dark"
			/>
		</div>
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
