<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	/**
	 * @type {{data:import('../../lib/types/termPage').TermGroup,char:string[]}}
	 */
	export let data;
</script>

<div class="min-h-screen">
	<SubHero title="Terms" />
	<div class="section-container box">
		<div
			class="px-6 flex gap-4 flex-row bg-theme-muted bg-opacity-50 p-4 overflow-x-auto max-w-[100%]"
		>
			{#each data.char as alphabet}
				<a href={`#${alphabet}`} class="max-w-max hover:text-blue-500 text-xl">
					{alphabet}
				</a>
			{/each}
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
			{#each data.char as alphabet}
				<div class="flex flex-col md:p-2 gap-2 scroll-mt-24" id={alphabet}>
					<h2 class="basis-[10%] text-3xl font-bold">{alphabet}</h2>
					<div class="w-full">
						<ul class="flex flex-col gap-4 w-full">
							{#if data.data[alphabet]}
								{#each data.data[alphabet] as item}
									<a
										href={`/terms/${item.slug.current}`}
										class=" py-4 hover:text-white hover:bg-theme-dark px-4 cursor-pointer transition-all duration-300 border-b-2 border-theme-muted border-solid w-full"
									>
										{item.title}
									</a>
								{/each}
							{/if}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
