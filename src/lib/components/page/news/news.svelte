<script>
	import NewsCard from '$lib/components/common/NewsCard.svelte';
	import { Search, Select, SelectItem } from 'carbon-components-svelte';
	const data = [1, 2, 3, 4, 54, 8, 6, 7];
</script>

<div class="min-h-screen section-container box">
	<div class="flex items-end md:flex-row flex-col-reverse justify-between gap-6 mb-8">
		<Search placeholder="Search catalog..." />
		<div class="flex flex-row gap-1 item-center justify-end">
			<Select size="xl" labelText="Category" class="md:w-[300px] w-full md:max-w-max">
				<SelectItem value="white" />
				<SelectItem value="g10" />
				<SelectItem value="g80" />
				<SelectItem value="g90" />
				<SelectItem value="g100" />
			</Select>
			<Select size="xl" labelText="Filter By" class="md:w-[300px] w-full md:max-w-max">
				<SelectItem value="white" />
				<SelectItem value="g10" />
				<SelectItem value="g80" />
				<SelectItem value="g90" />
				<SelectItem value="g100" />
			</Select>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
		{#each data as _}
			<NewsCard />
		{/each}
	</div>
</div>
