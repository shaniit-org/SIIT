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
			<div class="card card-hover overflow-hidden flex items-center">
				<a href="/terms/{term.slug}" class="p-8 w-full max-h-max mt-auto relative">
					<h2 class="h3 font-semibold tracking-wider text-3xl">{term.title}</h2>
					<div class="dark:text-surface-100 flex items-center my-4 gap-2 md:mb-5">
						<span class="badge variant-ghost-surface font-san text-xs px-4 pt-2 rounded-sm"
							>Term Of The Day
						</span>
						<span class="text-xs pt-1">
							{moment(new Date()).format('LL')}
						</span>
					</div>
					<p class="dark:text-surface-300 text-lg leading-relaxed">
						{term.description}
					</p>
				</a>
			</div>
		{/if}

		<a
			href={data.authors ? `/blogs/${data.slug}` : `/events/${data.slug}`}
			class="p-8 card card-hover overflow-hidden flex flex-col justify-center"
		>
			<h3 class="leading-[1.5] h3 mb-4 font-semibold tracking-wider text-3xl md:mb-6">
				{data.title}
			</h3>
			<p class="dark:text-surface-300 text-base leading-relaxed">
				{data.description}
			</p>
		</a>
	</div>
</div>
