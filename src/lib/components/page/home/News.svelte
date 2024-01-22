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
		<h2 class="h2 my-4 text-surface-50">{section.title}</h2>

		{#if section.description}
			<p class="text-lg">
				{section.description}
			</p>
		{/if}
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
		{#each data as item}
			<NewsCard data={item} />
		{/each}
	</div>
</div>
