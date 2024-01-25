<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	import Meta from '$lib/components/common/Meta.svelte';
	/**
	 * @type {{ data:import('../../lib/types/termPage').TermGroup,char:string[],seo:BaseMetaData }} - data
	 */
	export let data;
</script>

<Meta data={data.seo} />
<div class="min-h-screen">
	<SubHero title="Terms" />
	<div class="section-container box">
		<div class="btn-group variant-soft-surface w-full overflow-x-auto">
			{#each data.char as alphabet}
				<a href={`#${alphabet}`} class="anchor h2">
					{alphabet}
				</a>
			{/each}
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
			{#each data.char as alphabet}
				<div class="card p-4 md:p-8 flex flex-col gap-2 scroll-mt-24" id={alphabet}>
					<h2 class="h2 font-bold mb-4">{alphabet}</h2>
					<div class="w-full">
						<ul class="list flex flex-col w-full">
							{#if data.data[alphabet]}
								{#each data.data[alphabet] as item}
									<li class="list-nav w-full">
										<a href={`/terms/${item.slug.current}`} class="anchor no-underline">
											{item.title}
										</a>
									</li>
								{/each}
							{/if}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
