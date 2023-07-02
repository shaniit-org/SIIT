<script>
	import { Warning } from 'carbon-icons-svelte';
	import NewsCard from '$lib/components/common/NewsCard.svelte';
	import { searchByTitle, sortByDate } from '$lib/utils/search-by-title';
	import { Search, Select, SelectItem } from 'carbon-components-svelte';

	/**
	 * @type {import('../../../types').News[]} - data
	 */
	export let data = [];
	let input = '';
	let selected = 'Latest';
	$: res = sortByDate(searchByTitle(data, input), selected);
</script>

<div class="min-h-screen section-container box">
	<div class="flex items-end md:flex-row flex-col-reverse justify-between gap-6 mb-8">
		<Search placeholder="Search ..." bind:value={input} />
		<div class="flex flex-row gap-1 item-center justify-end">
			<Select bind:selected size="xl" labelText="SortBy" class="w-[200px] md:w-[300px] w-full ">
				<SelectItem value="Oldest" />
				<SelectItem value="Latest" />
			</Select>
		</div>
	</div>

	{#if res.length === 0}
		<div class="text-center flex items-center gap-4 justify-center mt-32 text-xl w-full">
			<Warning size={24} />
			Article not found
		</div>
	{/if}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
		{#each res as itm}
			<NewsCard data={itm} />
		{/each}
	</div>
</div>
