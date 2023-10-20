<script>
	import { Warning } from 'carbon-icons-svelte';
	import NewsCard from '$lib/components/common/NewsCard.svelte';
	import { searchByTitle, sortByDate, filterByCategory } from '$lib/utils/search-by-title';
	import { Search, Select, SelectItem, Tag } from 'carbon-components-svelte';

	/**
	 * @type {import('../../../types').News[]} - data
	 */
	export let data = [];
	/**
	 * @type {{_id:string,title:string}[]} - categories
	 */
	export let categories = [];
	/**
	 * @type string[] selected_category
	 */
	$: selected_category = [];
	/**
	 * @param {string} item
	 */
	let handleClick = (item) => {
		if (selected_category.includes(item)) {
			selected_category = selected_category.filter((itm) => itm !== item);
		} else {
			selected_category = [...selected_category, item];
		}
	};

	let input = '';
	let selected = 'Latest';
	$: res = sortByDate(filterByCategory(searchByTitle(data, input), selected_category), selected);
</script>

<div
	class="min-h-screen section-container my-12 p-6 md:p-12 relative w-full grid-cols-1 grid md:grid-cols-[75%_1fr] lg:grid-cols-[80%_1fr] gap-4"
>
	<div class="col-start-1 lg:col-start-1">
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
	<div class="row-start-1 md:col-start-2 lg:col-start-3 flex flex-col gap-6">
		<div class="flex items-end md:flex-row flex-col-reverse justify-between gap-6">
			<Search labelText="SortBy" placeholder="Search ..." bind:value={input} />
		</div>
		<div class="flex flex-row gap-1 item-center justify-end">
			<Select bind:selected labelText="SortBy" class="w-full ">
				<SelectItem value="Oldest" />
				<SelectItem value="Latest" />
			</Select>
		</div>
		<div>
			<span class="text-[#525252] text-[12px] mb-2 block">Category</span>
			<div class="flex flex-row md:flex-wrap gap-x-4 gap-y-1 w-full overflow-x-scroll">
				{#each categories as item}
					<Tag
						filter={selected_category.includes(item.title)}
						on:click={() => handleClick(item.title)}
						class="leading-relaxed cursor-pointer shrink-0 flex items-center"
						type={selected_category.includes(item.title) ? 'blue' : 'cool-gray'}
						size="default">{item.title}</Tag
					>
				{/each}
			</div>
		</div>
	</div>
</div>
