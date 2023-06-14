<script>
	import NewsCard from '$lib/components/common/NewsCard.svelte';
	/**
	 * @type {import('../../../types/index').News[]}
	 */
	export let data;
</script>

<div class="section-container box">
	<div class="flex flex-col gap-2 mb-6">
		<h3 class="text-4xl my-4 text-theme-dark cursor-pointer">What's happening in Tech ?</h3>
		<p class="text-lg">
			The component libraries give developers a collection of reusable components for building
			websites and user interfaces.
		</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
		{#each data as item}
			<NewsCard data={item} />
		{/each}
	</div>
</div>
