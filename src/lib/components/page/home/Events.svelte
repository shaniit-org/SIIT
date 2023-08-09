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
	<div class="flex flex-col gap-2 mb-6">
		<h3 class="text-4xl my-4 text-theme-dark cursor-pointer">
			{section.title}
		</h3>
		{#if section.description}
			<p class="text-lg">
				{section.description}
			</p>
		{/if}
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
		{#each data as item}
			<HomeEventCard data={item} />
		{/each}
	</div>
</div>
