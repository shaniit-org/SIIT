<script>
	import HomeEventCard from '$lib/components/common/HomeEventCard.svelte';
	/**
	 * @type {import('../../../types/index').Event[]}
	 */
	export let data = [];
	/**
	 * @type {{title:string,description:string}}
	 */
	export let section;
</script>

<div class="section-container box">
	<div class="flex flex-col mb-6">
		<h2 class="h2 mb-4 md:mb-6">{section.title}</h2>
		{#if section.description}
			<p class="dark:text-surface-300 text-lg">
				{section.description}
			</p>
		{/if}
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
		{#each data as item}
			<HomeEventCard data={item} />
		{/each}
	</div>
</div>
