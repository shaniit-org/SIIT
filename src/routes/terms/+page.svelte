<script>
	import SubHero from '$lib/components/common/SubHero.svelte';
	const alphabets = Array.from(Array(26)).map((_, i) => String.fromCharCode(65 + i));
	const data = [1, 2, 3, 4, 5, 6];
</script>

<div class="min-h-screen">
	<SubHero title="Terms" />
	<div class="section-container box">
		<div
			class="px-6 flex gap-4 flex-row justify-between bg-theme-muted bg-opacity-50 p-4 overflow-x-auto max-w-[100%]"
		>
			{#each alphabets as alphabet}
				<a href={`#${alphabet}`} class="max-w-max hover:text-blue-500 text-xl">
					{alphabet}
				</a>
			{/each}
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
			{#each alphabets as alphabet}
				<div class="flex flex-col md:p-2 gap-2 scroll-mt-24" id={alphabet}>
					<h2 class="basis-[10%] text-3xl font-bold">{alphabet}</h2>
					<div class="w-full">
						<ul class="flex flex-col gap-4 w-full">
							{#each data as item}
								<li
									class=" py-4 hover:text-white hover:bg-theme-dark px-4 cursor-pointer transition-all duration-300 border-b-2 border-theme-muted border-solid w-full"
								>
									<a href="/"> Apple </a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
