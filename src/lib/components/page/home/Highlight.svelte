<script>
	import { Link, Tile } from 'carbon-components-svelte';
	import { Link as LinkIcon } from 'carbon-icons-svelte';
	/**
	 * @type {import('../../../types/homePage').HighLightNews} - data
	 */
	export let data;
</script>

<Tile class="bg-theme-primary">
	<div class="section-container box grid grid-cols-1 md:grid-cols-3 gap-6">
		<h3 class="text-xl md:text-3xl md:leading-relaxed">
			{data.title}
		</h3>
		<div class="col-span-2">
			<p class="mb-4 text-sm lg:text-2xl lg:leading-[2]">
				{data.description}
			</p>
			<Link
				href={`/news/${data.slug}`}
				icon={LinkIcon}
				class="cursor-pointer text-theme-dark underline ">Donate Us</Link
			>
		</div>
	</div>
</Tile>
