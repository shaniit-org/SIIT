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

<div class="section-container box">
	<div class="grid grid-cols-1 md:grid-cols-2 relative gap-4">
		<div class="card card-hover overflow-hidden flex items-center p-4 md:p-8">
			{#if term}
				<a
					href="/terms/{term.slug.current}"
					class=" p-4 w-full max-h-max space-y-2 mt-auto relative"
				>
					<h2 class="h2 mb-4">{term.title}</h2>
					<div class=" flex items-center mb-4 gap-4">
						<span class="font-semibold">Term Of The Day </span>
						<span class="italic">
							{moment(new Date()).format('LL')}
						</span>
					</div>
					<p class="leading-relaxed mt-2">
						{term.description}
					</p>
				</a>
			{/if}
		</div>

		<a
			href={data.authors ? `/blogs/${data.slug}` : `/events/${data.slug}`}
			class=" p-4 md:p-8 card card-hover overflow-hidden flex flex-col justify-center"
		>
			<h3 class="h3 font-sans md:leading-loose mb-4">
				{data.title}
			</h3>
			<p class="mb-6 md:text-base leading-loose text-lg">
				{data.description}
			</p>
		</a>
	</div>
</div>
