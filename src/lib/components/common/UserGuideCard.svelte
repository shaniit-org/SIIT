<script>
	import SanityImage from '$lib/sanity/image/SanityImage.svelte';
	/**
	 * @type {import('../../types').UserGuide} - data
	 */
	export let data;
</script>

<div class="card overflow-hidden">
	<SanityImage
		maxWidth={800}
		image={data.coverImage}
		alt={data.title}
		className="w-full h-[380px] aspect-[9/16] object-cover"
	/>
	<div class="flex flex-col p-8">
		<h2 class="h3 mb-1">{data.title}</h2>
		<div class="mb-4 mt-2">
			{#each data.categories as cat}
				<span class="m-0 badge variant-soft-primary pt-2">{cat.title}</span>
			{/each}
		</div>
		<p class=" text-sm line-clamp-3 leading-loose">
			{data.description}
		</p>

		{#if data.downloadlink}
			<a
				href={data.downloadlink}
				target="_blank"
				aria-label="Download"
				class="button variant-filled-primary rounded-token mt-4 px-4 flex items-center gap-2 py-2 max-w-max text-sm"
			>
				<span class="pt-1"> Download </span>
				<iconify-icon icon="material-symbols:download" class="text-xl" />
			</a>
		{/if}
	</div>
</div>
