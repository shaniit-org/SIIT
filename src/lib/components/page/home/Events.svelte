<script>
	import HomeEventCard from '$lib/components/common/HomeEventCard.svelte';
	const items = [2, 3, 4];
</script>

<div class="section-container box">
	<div class="flex flex-col gap-2 mb-6">
		<h3 class="text-4xl my-4 text-theme-dark cursor-pointer">Our Previous Events !</h3>
		<p class="text-lg">
			Our previous events are listed here. You can also find the recordings of the events.
		</p>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
		{#each items as _}
			<HomeEventCard />
		{/each}
	</div>
</div>
