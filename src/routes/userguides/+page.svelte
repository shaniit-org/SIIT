<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import UserGuideCard from '$lib/components/common/UserGuideCard.svelte';
	import { Search } from 'carbon-components-svelte';
	import { searchByTitle } from '$lib/utils/search-by-title';

	/**
	 * @type {{data:import('../../lib/types').UserGuide[]}} - data
	 */
	export let data = { data: [] };
	let keyword = '';
	$: result = searchByTitle(data.data, keyword);
</script>

<SubHero title="User Guides" />
<div class="min-h-screen section-container box">
	<Search bind:value={keyword} placeholder="Search userguides..." />
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
		{#each result as item}
			<UserGuideCard data={item} />
		{/each}
	</div>
</div>
