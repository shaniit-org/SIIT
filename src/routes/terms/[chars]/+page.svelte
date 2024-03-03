<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	/**
	 * @type {{ seo:BaseMetaData }} - data
	 */
	export let data;
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
</script>

<Meta data={data.seo} />
<div class="min-h-screen">
	<SubHero title="Terms" />
	<div class="section-container box">
        <h1 class="h1">Chars</h1>
		<div class="flex flex-wrap gap-4 mt-12">
			{#each alphabets as alphabet}
				<a href="/terms/chars/{alphabet}" class=" basis-[20%] md:basis-[10%] card hover:card-hover p-4 md:p-8 grid place-items-center  scroll-mt-24" id={alphabet}>
					<h2 class="h2 font-bold ">{alphabet}</h2>
				</a>
			{/each}
		</div>
	</div>
</div>
