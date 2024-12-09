<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	import EventCard from '$lib/components/common/EventCard.svelte';
	import { sortByDate } from '$lib/utils/search-by-title';
	/**
	 * @type {{data: import('../../lib/types/eventsPage').EventsPage}} - data
	 */
	export let data;
	let selected = 'Latest';
	let { title, events, seo } = data.data;
	$: res = sortByDate(events, selected);
</script>

<div class="min-h-screen">
	<Meta data={seo} />
	<SubHero {title} />
	<div class="section-container flex flex-col box mb-12">
		<select
			class="rounded-token ml-auto mb-8 select max-w-max"
			aria-label="Sort By"
			bind:value={selected}
		>
			<option value="Latest">Latest</option>
			<option value="Oldest">Oldest</option>
		</select>
		<div class="flex flex-col gap-4">
			{#each res as item}
				<EventCard data={item} />
			{/each}
		</div>
	</div>
</div>
