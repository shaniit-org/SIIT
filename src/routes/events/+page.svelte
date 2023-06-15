<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import EventCard from '$lib/components/common/EventCard.svelte';
	import { Select, SelectItem } from 'carbon-components-svelte';
	import { sortByDate } from '$lib/utils/search-by-title';
	/**
	 * @type {{data: import('../../lib/types/').Event[]}} - data
	 */
	export let data = { data: [] };
	let selected = 'Latest';
	$: res = sortByDate(data.data, selected);
</script>

<div class="min-h-screen">
	<SubHero title="Events" />
	<div class="section-container box mb-12">
		<div class="mb-8">
			<Select labelText="Sorted by" bind:selected class="max-w-max ml-auto min-w-[200px]">
				<SelectItem value="Latest" />
				<SelectItem value="Oldest" />
			</Select>
		</div>
		<div class="flex flex-col gap-12">
			{#each res as item}
				<EventCard data={item} />
			{/each}
		</div>
	</div>
</div>
