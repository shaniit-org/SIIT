<script>
	import { Tile } from 'carbon-components-svelte';
	/**
	 * @type {
         import('../../../types/aboutPage').AboutBanner |
         import('../../../types/aboutPage').RowBanner
     } - data
	 */
	export let data;
</script>

<Tile class="bg-theme-secondary">
	<div class="section-container box grid grid-cols-1 md:grid-cols-3 gap-6">
		<h2 class="text-2xl md:text-3xl md:leading-relaxed">{data.title}</h2>
		<div class="col-span-2 text-base md:text-lg">
			{data.description}
		</div>
	</div>
</Tile>
