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
			<div class="card card-hover overflow-hidden flex items-center p-4 md:p-8">
				<a href="/terms/{term.slug}" class=" p-4 w-full max-h-max mt-auto relative">
					<h2 class="h3 mb-4 font-semibold dark:text-primary-500">{term.title}</h2>
					<div class=" flex items-center mb-4 gap-4 text-lg">
						<span class="font-san">Term Of The Day </span>
						<span>
							{moment(new Date()).format('LL')}
						</span>
					</div>
					<p class="dark:text-surface-100 text-base leading-relaxed">
						{term.description}
					</p>
				</a>
			</div>
		{/if}

		<a
			href={data.authors ? `/blogs/${data.slug}` : `/events/${data.slug}`}
			class=" p-4 md:p-8 card card-hover overflow-hidden flex flex-col justify-center"
		>
			<h3 class="h3 font-sans md:leading-loose mb-4">
				{data.title}
			</h3>
			<p class="text-surface-200 text-base leading-relaxed mt-3">
				{data.description}
			</p>
		</a>
	</div>
</div>
