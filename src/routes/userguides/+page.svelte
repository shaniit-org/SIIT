<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import UserGuideCard from '$lib/components/common/UserGuideCard.svelte';
	import { Search } from 'carbon-components-svelte';
	const data = [1, 2, 3, 4];
</script>

<SubHero title="User Guides" />
<div class="min-h-screen section-container box">
	<Search placeholder="Search catalog..." />
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
		{#each data as item}
			<UserGuideCard />
		{/each}
	</div>
</div>
