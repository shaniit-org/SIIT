<script>
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

<div class="section-container box z-10">
	<div class="grid grid-cols-1 md:grid-cols-2 relative gap-4">
		{#if term}
			<div class="card overflow-hidden flex items-center p-4 md:p-8">
				<a href="/terms/{term.slug}" class=" p-4 w-full max-h-max space-y-2 mt-auto relative">
					<h2 class="h2">{term.title}</h2>
					<div class=" font-domine flex items-center my-4 gap-4">
						<span class="">Term Of The Day </span>
						<span class="">
							{moment(new Date()).format('LL')}
						</span>
					</div>
					<p class="leading-relaxed mt-4 text-surface-300">
						{term.description}
					</p>
				</a>
			</div>
		{/if}
      <a
        href={data.authors ? `/blogs/${data.slug}` : `/events/${data.slug}`}
        class=" p-4 md:p-8  card shadow-t overflow-hidden flex flex-col justify-center"
        >
        <h3 class="h3 font-sans md:leading-loose mb-4">
          {data.title}
        </h3>
        <p class="leading-relaxed mt-2 text-surface-300">
          {data.description}
        </p>
      </a>
	</div>
</div>
