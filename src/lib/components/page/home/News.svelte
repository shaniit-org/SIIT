<script>
	import NewsCard from '$lib/components/common/NewsCard.svelte';
	const items = [2, 3, 4];
</script>

<div class="section-container box">
	<div class="flex flex-col gap-2">
		<h2 class="text-2xl">Latest News</h2>
		<p>
			The component libraries give developers a collection of reusable components for building
			websites and user interfaces.
		</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
		{#each items as _}
			<NewsCard />
		{/each}
	</div>
</div>
