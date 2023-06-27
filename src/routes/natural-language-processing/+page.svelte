<script>
	import NlpArticle from '$lib/components/page/nlp/NLPArticle.svelte';
	import NlpCard from '$lib/components/page/nlp/NLPCard.svelte';
	import SubHero from '$lib/components/common/SubHero.svelte';
	/**
	 * @type {{data:import('$lib/types/nlpPage').NLPPage}} - data
	 */
	export let data = { data: {} };
</script>

<SubHero title="Natural language processing" />
<div class="section-container box min-h-screen">
	<div class="flex flex-col">
		<p class="text-xl leading-relaxed max-w-[900px]">
			{data.data.description}
		</p>
	</div>
	<div class="flex gap-12 flex-col mt-12">
		<div>
			<div class="flex flex-col gap-2">
				<h2 class="text-3xl my-4 text-theme-dark cursor-pointer">Tools</h2>
			</div>
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-[900px]">
				{#each data.data.tools as tool}
					<NlpCard data={tool} />
				{/each}
			</div>
		</div>
		<div>
			<div class="flex items-center gap-2">
				<h2 class="text-3xl my-4 text-theme-dark cursor-pointer">Articles</h2>
			</div>
			<div class="flex flex-col gap-12 mt-2">
				{#each data.data.news as tol}
					<NlpArticle data={tol} />
				{/each}
			</div>
		</div>
	</div>
</div>
