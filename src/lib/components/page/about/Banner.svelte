<script>
	/**
	 * @type {
         import('../../../types/aboutPage').AboutBanner |
         import('../../../types/aboutPage').RowBanner
     } - data
	 */
	export let data;
</script>

<div class="card variant-soft-surface rounded-none">
	<div class="section-container box grid grid-cols-1 md:grid-cols-3 gap-6">
		<h2 class="h2">{data.title}</h2>
		<div class="text-lg dark:text-surface-300 leading-loose">
			{data.description}
		</div>
	</div>
</div>
