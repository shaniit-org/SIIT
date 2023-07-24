<script>
	import NewsCard from '$lib/components/common/NewsCard.svelte';
	/** @type {import('../../types').RelatedArticle[] | undefined} */
	export let data;
</script>

{#if data.length > 0}
	<div class="section-container p-4 md:px-12">
		<h3 class="text-xl mb-4">Related Articles</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
			{#each data as itm}
				<NewsCard data={itm} />
			{/each}
		</div>
	</div>
{/if}
