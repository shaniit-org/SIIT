<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import UserGuideCard from '$lib/components/common/UserGuideCard.svelte';
	import { searchByTitle } from '$lib/utils/search-by-title';
	import Meta from '$lib/components/common/Meta.svelte';

	/**
	 * @type {{ data:import('../../lib/types/userGuidesPage').UserGuidesPage }} - data
	 */
	export let data;
	const { userguides, seo } = data.data;
	let keyword = '';
	$: result = searchByTitle(userguides, keyword);
</script>

<Meta data={seo} />
<SubHero title="User Guides" />
<div class="min-h-screen flex flex-col section-container box">
	<input
		id="search"
		bind:value={keyword}
		placeholder="Search user guides..."
		class="ml-auto input px-3 py-2 pt-3 rounded-xl max-w-[300px]"
	/>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
		{#each result as item}
			<UserGuideCard data={item} />
		{/each}
	</div>
</div>
