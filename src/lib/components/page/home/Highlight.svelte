<script>
	import { ClickableTile, Button } from 'carbon-components-svelte';
	import { Link as LinkIcon } from 'carbon-icons-svelte';

	import moment from 'moment';
	/**
	 * @type {import('../../../types/homePage').HighLightNews} - data
	 */
	export let data;
	/**
	 * @type {import('../../../types/termPage').Term}
	 */
	export let term;
</script>

<div class="bg-theme-primary w-full">
	<div class="grid grid-cols-1 md:grid-cols-2 relative">
		<div class="flex flex-col justify-center">
			{#if term}
				<ClickableTile
					href="/terms/{term.slug.current}"
					class=" p-4 md:p-12 lg:p-18 xl:p-24 w-full h-full space-y-2 mt-auto  relative"
				>
					<div class="p-4">
						<h2 class="text-2xl md:text-4xl mb-4">{term.title}</h2>
						<div class="text-base flex text-gray-800 items-center justify-between mb-4">
							<span class="italic">Term Of The Day</span>
							<span class="italic">
								{moment(term._createdAt).format('LL')}
							</span>
						</div>
						<p class="mb-4 text-base leading-relaxed lg:text-xl lg:leading-[2]">
							{term.description}
						</p>
					</div>
				</ClickableTile>
			{/if}
		</div>

		<div class="p-8 md:p-12 lg:p-18 xl:p-24 flex flex-col justify-center">
			<h3 class="text-xl md:text-3xl md:leading-relaxed mb-4">
				{data.title}
			</h3>
			<p class="mb-6 text-base leading-relaxed lg:text-xl lg:leading-[2]">
				{data.description}
			</p>
			<Button
				kind="secondary"
				href={`/blogs/${data.slug}`}
				icon={LinkIcon}
				class="cursor-pointer  max-w-max"
				>Read More
			</Button>
		</div>
	</div>
</div>
