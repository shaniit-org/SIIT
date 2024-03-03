<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	/**
	 * @type {{ seo:BaseMetaData ,data:import('../../../lib/types/termPage').Term}} - data
	 */
	export let data;
    console.log(data)

</script>

<Meta data={data.seo} />
<div class="min-h-screen">
	<SubHero title="Terms" />
	<div class="section-container box">
        <h1 class="h1">Chars</h1>
	</div>
</div>
