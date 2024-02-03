<script>
	/**
	 * @type {import('../../../types/homePage').HomePageDonate} - data
	 */
	export let data;
</script>

<div class="card">
	<div class="section-container box grid grid-cols-1 md:grid-cols-3 gap-6">
		<h3 class="text-xl md:text-2xl md:leading-relaxed">
			{data.title}
		</h3>
		<div class="col-span-2">
			<p class="mb-4 text-sm lg:text-xl lg:leading-[2]">
				{data.description}
			</p>
			<a href={data.link.url} class="cursor-pointer anchor no-underline">{data.link.title}</a>
		</div>
	</div>
</div>
