<script>
	import moment from 'moment';
	/**
	 *  @type {string} - title
	 */
	export let title = '';
	/**
	 *  @type {string} - description
	 */
	export let description = '';
	/**
	 *  @type {string} - _createdat
	 */
	export let publishedAt = '';
</script>

<div
	class="w-full bg-gradient-to-b from-black to-gray-900 relative text-white min-h-[300px] flex justify-end flex-col overflow-hidden"
>
	<div class="section-container box w-full">
		<div class="flex gap-2 flex-col mb-8">
			<h1 class="text-4xl font-bold lg:text-5xl lg:leading-[1.2] leading-[1.5]">
				{title}
			</h1>
			<p class="text-theme-muted text-sm md:w-3/4 leading-relaxed mt-4">
				{description}
			</p>
			<span class="text-sm mt-2 text-gray-500"> {moment(publishedAt).format('LL')}</span>
		</div>
	</div>
</div>
