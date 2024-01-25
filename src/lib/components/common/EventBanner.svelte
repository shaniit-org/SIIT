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
	class="w-full relative card text-white min-h-[400px] flex justify-end flex-col overflow-hidden box"
>
	<div class="box section-container w-full">
		<div class="flex gap-2 flex-col">
			<h1 class="h1 font-bold mb-4">
				{title}
			</h1>
			<p class="md:w-3/4 block leading-relaxed text-lg mt-4">
				{description}
			</p>
			<span class="mt-2 badge variant-soft-primary pt-2 max-w-max px-4 py-1 font-bold">
				{moment(publishedAt).format('LL')}</span
			>
		</div>
	</div>
</div>
