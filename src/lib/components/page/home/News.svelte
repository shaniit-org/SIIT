<script>
	import NewsCard from '$lib/components/common/NewsCard.svelte';
	/**
	 * @type {import('../../../types/index').News[]}
	 */
	export let data;
	/**
	 * @type {{title:string,description:string}}
	 */
	export let section;
</script>

<div class="section-container box">
	<div class="flex flex-col mb-6">
		<h2 class="h2 my-4">{section.title}</h2>

		{#if section.description}
			<p class="text-surface-300 text-lg mt-2">
				{section.description}
			</p>
		{/if}
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each data as item}
			<NewsCard data={item} />
		{/each}
	</div>
</div>
